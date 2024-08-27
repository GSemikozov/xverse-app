import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { colors } from '@/modules/ui/constants';

export type DetailsGroupProps = React.PropsWithChildren<{
    label?: string;
    style?: StyleProp<ViewStyle>;
}>;

export const DetailsGroup = (props: DetailsGroupProps) => {
    const { label, style, children } = props;

    return (
        <View style={[styles.root, style]}>
            {label ? <Text style={styles.label}>{label}</Text> : null}

            <View style={styles.content}>{children}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {},

    label: {
        marginBottom: 32,

        color: colors.white[100],
        fontSize: 16,
        fontFamily: 'Montserrat-600',
    },

    content: {},
});
