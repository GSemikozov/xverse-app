import React from 'react';
import {
    View,
    TextInput as BaseTextInput,
    Text,
    StyleSheet,
} from 'react-native';
import type { TextInputProps as BaseTextInputProps } from 'react-native';

import { colors } from '@/modules/ui/constants';

export type TextInputProps = BaseTextInputProps & {
    label?: string;
    error?: string;
};

export const TextInput = (props: TextInputProps) => {
    const { label, error, ...otherProps } = props;

    const textInputStyle = React.useMemo(() => {
        if (error) {
            return [styles.input, styles.inputError];
        }

        return [styles.input];
    }, [error]);

    return (
        <View style={styles.root}>
            {label ? <Text style={styles.label}>{label}</Text> : null}

            <BaseTextInput style={textInputStyle} {...otherProps} />

            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        width: '100%',
    },

    label: {
        marginBottom: 10,
        color: colors.white[100],
        fontSize: 14,
        fontFamily: 'Montserrat-500',
    },

    input: {
        height: 32,
        color: colors.white[100],
        paddingHorizontal: 8,
        backgroundColor: colors.purple[100],
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 0,
    },

    inputError: {
        borderColor: colors.red[100],
    },

    error: {
        marginTop: 6,
        color: colors.red[100],
        fontSize: 12,
        fontFamily: 'Montserrat-500',
    },
});
