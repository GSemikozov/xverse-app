import React from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

import { useGetInscriptionQuery } from '@/modules/api';
import { DetailsScreenRouteProp } from '@/app/types';
import { colors } from '@/modules/ui/constants';
import { InscriptionContent } from '@/modules/inscription/moleculas';
import { DetailItem, DetailsGroup } from '@/modules/layout/moleculas';

const Details = () => {
    const {
        params: { address, inscriptionId },
    } = useRoute<DetailsScreenRouteProp>();

    const {
        data: inscription,
        error,
        isLoading,
    } = useGetInscriptionQuery({
        address,
        inscriptionId,
    });

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return (
            <Text style={styles.error}>Error loading inscription details</Text>
        );
    }

    if (!inscription) {
        return (
            <Text style={styles.error}>Empty data for this inscription</Text>
        );
    }

    return (
        <ScrollView>
            <InscriptionContent inscription={inscription} />

            <View style={styles.header}>
                <Text numberOfLines={1} style={styles.headerTitle}>
                    Inscription {inscriptionId}
                </Text>
            </View>

            <DetailsGroup style={styles.shortDetailsGroup}>
                <DetailItem
                    variant="outlined"
                    label="Inscription ID"
                    content={inscription.id}
                />

                <DetailItem
                    variant="outlined"
                    label="Owner Address"
                    content={address}
                />
            </DetailsGroup>

            <DetailsGroup label="Attributes">
                <DetailItem label="Output Value" content={inscription.value} />

                <DetailItem label="Mime Type" content={inscription.mime_type} />

                <DetailItem
                    label="Content Type"
                    content={inscription.content_type}
                />

                <DetailItem
                    label="Content Length"
                    content={inscription.content_length}
                />

                <DetailItem label="Location" content={inscription.location} />

                <DetailItem
                    label="Genesis Transaction"
                    content={inscription.genesis_tx_id}
                />

                <DetailItem
                    label="Genesis Address"
                    content={inscription.genesis_address}
                />
            </DetailsGroup>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {},

    error: {
        color: colors.white[100],
    },

    header: {
        paddingTop: 24,
        paddingBottom: 16,
        marginBottom: 24,

        borderBottomWidth: 2,
        borderBottomColor: colors.purple[100],
    },

    headerTitle: {
        color: colors.white[100],
        fontSize: 16,
        fontFamily: 'Montserrat-600',
    },

    shortDetailsGroup: {
        marginBottom: 48,
    },
});

export default Details;
