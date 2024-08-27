import React from 'react';
import { View, Text, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useGetInscriptionDetailsQuery } from '../../../modules/api/ordinal-utxo';
import { DetailsScreenRouteProp } from '@/app/types';

const Details = () => {
    const route = useRoute<DetailsScreenRouteProp>();
    const { address, inscriptionId } = route.params;

    const { data, error, isLoading } = useGetInscriptionDetailsQuery({
        address,
        inscriptionId,
    });

    if (isLoading) return <Text>Loading...</Text>;
    if (error) return <Text>Error loading inscription details</Text>;

    const renderContent = () => {
        if (!data) return null;

        const contentUrl = `https://ord.xverse.app/content/${inscriptionId}`;

        switch (data.mime_type) {
            case 'image/jpeg':
            case 'image/png':
            case 'image/gif':
                return (
                    <Image
                        source={{ uri: contentUrl }}
                        style={{ width: '100%', height: 300 }}
                        resizeMode="contain"
                    />
                );
            case 'text/html':
            case 'text/plain':
            case 'application/json':
                return <Text style={{ color: 'white' }}>{data?.address}</Text>; // we can display all fields here
            default:
                return <Text>Unsupported content type: {data.mime_type}</Text>;
        }
    };

    return <View style={{ padding: 16 }}>{renderContent()}</View>;
};

export default Details;
