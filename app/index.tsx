import React from 'react';
import {
    ActivityIndicator,
    ListRenderItemInfo,
    StyleSheet,
    Text,
    View,
    Platform,
} from 'react-native';
import { router } from 'expo-router';

import { colors } from '@/modules/ui/constants';
import { Button, ListItem, PaginatedList } from '@/modules/ui/moleculas';
import { ordinalUtxoApi, ApiOrdinalUtxo } from '@/modules/api';
import { SearchForm } from '@/modules/inscription/organisms';
import { SearchFormValues } from '@/modules/inscription/model';

const FETCH_LIMIT_ITEMS = 30;

const Index = () => {
    const offsetRef = React.useRef(0);

    const [data, setData] = React.useState<ApiOrdinalUtxo[]>([]);
    const [hasMore, setHasMore] = React.useState(false);
    const [address, setAddress] = React.useState('');

    const [getOrdinalsUtxo, { isFetching }] =
        ordinalUtxoApi.endpoints.getOrdinalsUtxo.useLazyQuery();

    const loadOrdinals = async (newAddress: string) => {
        const offset = offsetRef.current;

        const { data } = await getOrdinalsUtxo({
            address: newAddress,
            offset,
        });

        if (!address) {
            setAddress(newAddress);
        }

        if (!data) {
            return;
        }

        setData((prevState) => {
            const filteredResult = data.results.filter(
                (result) => result.inscriptions.length > 0
            );

            return [...prevState, ...filteredResult];
        });

        const hasMoreFromResponse = data.total > offset + FETCH_LIMIT_ITEMS;

        if (hasMoreFromResponse) {
            offsetRef.current += FETCH_LIMIT_ITEMS;
        }

        setHasMore(hasMoreFromResponse);
    };

    const handleSubmit = async (values: SearchFormValues) => {
        try {
            await loadOrdinals(values.address);
        } catch (error) {
            console.error(error);
        }
    };

    const handleNavigateToDetails = (inscriptionId: string) => () => {
        router.push({
            pathname: '/details/[address]/[inscriptionId]',
            params: { address, inscriptionId },
        });
    };

    const renderListItem = (info: ListRenderItemInfo<ApiOrdinalUtxo>) => {
        const { item } = info;

        const [inscription] = item.inscriptions;
        const title = 'Inscription ' + inscription.id;

        return (
            <ListItem
                title={title}
                onPress={handleNavigateToDetails(inscription.id)}
            />
        );
    };

    const handleLoadMore = async () => {
        try {
            if (hasMore && !isFetching) {
                await loadOrdinals(address);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const renderListHeader = () => {
        if (hasData) {
            return <Text style={styles.resultsTitle}>Results</Text>;
        }

        return null;
    };

    const renderListFooter = () => {
        if (isFetching) {
            return <ActivityIndicator />;
        }

        if (Platform.OS === 'web' && hasMore) {
            return <Button title="Load More" onPress={handleLoadMore} />;
        }

        return null;
    };

    const hasData = data.length > 0;

    return (
        <View>
            <View style={styles.form}>
                <SearchForm onSubmit={handleSubmit} />
            </View>

            <View style={styles.results}>
                {renderListHeader()}

                <PaginatedList<ApiOrdinalUtxo>
                    data={data}
                    renderItem={renderListItem}
                    onEndReachedThreshold={0.8}
                    onEndReached={handleLoadMore}
                    ListFooterComponent={renderListFooter}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    form: {},

    results: {},

    resultsTitle: {
        marginTop: 24,

        color: colors.white[100],
        fontSize: 14,
        fontFamily: 'Montserrat-500',
    },

    noMoreText: {
        textAlign: 'center',
    },
});

export default Index;
