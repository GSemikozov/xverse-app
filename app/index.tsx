import React from 'react';
import {
    ActivityIndicator,
    ListRenderItemInfo,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { router } from 'expo-router';

import { colors } from '@/modules/ui/constants';
import { ListItem, PaginatedList } from '@/modules/ui/moleculas';
import { SearchForm } from '@/modules/nft/organisms';
import { SearchFormValues } from '@/modules/nft/model';
import { ordinalUtxoApi, ApiOrdinalUtxo } from '@/modules/api';

const IndexTab = () => {
    const [address, setAddress] = React.useState('');
    const [data, setData] = React.useState<ApiOrdinalUtxo[]>([]);
    const [nextUrl, setNextUrl] = React.useState<string | null>(null);
    const [isFetchingMore, setIsFetchingMore] = React.useState(false);

    const [getOrdinaslUtxo, { isFetching }] =
        ordinalUtxoApi.endpoints.getOrdinalsUtxo.useLazyQuery();

    const handleSubmit = async (values: SearchFormValues) => {
        try {
            setAddress('');
            setNextUrl(null); // Reset the next URL
            setData([]); // Clear previous data

            const { data } = await getOrdinaslUtxo({ address: values.address });

            if (data) {
                setData(data.results);
                setAddress(values.address);
                setNextUrl(data.next); // Assuming `data.next` holds the next URL or cursor
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchMoreData = async () => {
        if (isFetching || !nextUrl || isFetchingMore) return; // Prevent multiple fetches

        try {
            setIsFetchingMore(true);

            const { data } = await getOrdinaslUtxo({ address });

            if (data) {
                setData((prevState) => [...prevState, ...data.results]);
                setNextUrl(data.next); // Update the next URL or cursor
            }
        } catch (error) {
            console.error('Error fetching more data:', error);
        } finally {
            setIsFetchingMore(false);
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

    const renderListEndLoader = () => {
        if (isFetching || isFetchingMore) {
            return <ActivityIndicator />;
        }

        return null;
    };

    return (
        <View>
            <View style={styles.form}>
                <SearchForm onSubmit={handleSubmit} />
            </View>

            <View style={styles.results}>
                <Text style={styles.resultsTitle}>Results</Text>

                <PaginatedList<ApiOrdinalUtxo>
                    data={data}
                    renderItem={renderListItem}
                    onEndReached={fetchMoreData} // Trigger more data fetch on scroll
                    onEndReachedThreshold={0.8}
                    ListFooterComponent={renderListEndLoader}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    form: {},

    results: {
        marginTop: 16,
    },

    resultsTitle: {
        color: colors.white[100],
        fontSize: 14,
        fontFamily: 'Montserrat-500',
    },
});

export default IndexTab;
