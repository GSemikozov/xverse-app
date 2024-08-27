import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/modules/ui/constants';
import { AntDesign } from '@expo/vector-icons';

export type ListItemProps = {
    title: string;

    onPress?: () => void;
};

export const ListItem = (props: ListItemProps) => {
    const { title, onPress } = props;

    const isInteractive = typeof onPress !== 'undefined';

    if (isInteractive) {
        return (
            <Pressable style={styles.root} onPress={onPress}>
                <Text numberOfLines={1} style={styles.text}>
                    {title}
                </Text>

                <AntDesign name="right" color={colors.white[100]} size={16} />
            </Pressable>
        );
    }

    return (
        <View style={styles.root}>
            <Text numberOfLines={1} style={styles.text}>
                {title}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        height: 50,
        marginBottom: 8,
    },

    text: {
        maxWidth: '85%',
        color: colors.white[100],
        fontSize: 14,
        fontFamily: 'Montserrat-500',
    },
});
