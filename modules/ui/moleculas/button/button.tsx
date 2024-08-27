import { darken } from 'polished';
import { Pressable, StyleSheet, Text, TouchableHighlight } from 'react-native';
import type {
    ButtonProps as BaseButtonProps,
    PressableStateCallbackType,
} from 'react-native';

import { colors } from '@/modules/ui/constants';

export type ButtonProps = Pick<BaseButtonProps, 'onPress'> & {
    title: string;
};

export const Button = (props: ButtonProps) => {
    const { title, ...otherProps } = props;

    const createPressableStyle = (state: PressableStateCallbackType) =>
        state.pressed ? [styles.button, styles.buttonPressed] : styles.button;

    return (
        <Pressable style={createPressableStyle} {...otherProps}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        justifyContent: 'center',

        height: 46,
        backgroundColor: colors.purple[90],
        borderRadius: 10,
    },

    buttonPressed: {
        backgroundColor: darken(0.1)(colors.purple[90]),
    },

    text: {
        color: colors.white[100],
        fontSize: 14,
        fontFamily: 'Montserrat-500',
        textAlign: 'center',
    },
});
