import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/modules/ui/constants';

export type DetailItemProps = {
    label: string;
    content: string | number;

    variant?: 'filled' | 'outlined';
};

export const DetailItem = (props: DetailItemProps) => {
    const { label, content, variant = 'filled' } = props;

    const contentStyle = [
        styles.content,
        variant === 'filled' ? styles.contentFilled : undefined,
    ];

    return (
        <View style={styles.root}>
            <Text style={styles.label}>{label}</Text>

            <View style={contentStyle}>
                <Text style={styles.contentText}>{content}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        marginBottom: 24,
    },

    label: {
        marginBottom: 8,

        color: colors.white[70],
        fontSize: 12,
        fontFamily: 'Montserrat-500',
    },

    content: {},

    contentFilled: {
        padding: 12,
        backgroundColor: colors.purple[100],
        borderRadius: 8,
    },

    contentText: {
        color: colors.white[100],
        fontSize: 14,
        fontFamily: 'Montserrat-500',
    },
});
