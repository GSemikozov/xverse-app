import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { ApiInscriptionResponse } from '@/modules/api';
import { colors } from '@/modules/ui/constants';

export type InscriptionContentProps = {
    inscription: ApiInscriptionResponse;
};

export const InscriptionContent = (props: InscriptionContentProps) => {
    const { inscription } = props;

    const renderedContent = React.useMemo(() => {
        const src =
            process.env.EXPO_PUBLIC_ORD_CONTENT_URL + '/' + inscription.id;

        switch (inscription.mime_type) {
            case 'image/jpeg':
            case 'image/png':
            case 'image/gif':
                return (
                    <Image
                        resizeMode="contain"
                        source={{ uri: src }}
                        style={{ width: '100%', height: 375 }}
                    />
                );

            case 'text/html':
            case 'text/plain':
            case 'application/json':
                return (
                    <Text style={styles.contentText}>
                        {inscription.address}
                    </Text>
                );

            default:
                return (
                    <Text style={styles.contentText}>
                        Unsupported content type: {inscription.mime_type}
                    </Text>
                );
        }
    }, [inscription]);

    return <View style={styles.root}>{renderedContent}</View>;
};

const styles = StyleSheet.create({
    root: {},

    contentText: {
        color: colors.white[100],
        fontSize: 14,
        fontFamily: 'Montserrat-500',
    },
});
