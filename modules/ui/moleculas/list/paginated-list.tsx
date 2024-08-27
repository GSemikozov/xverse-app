import { FlatList, FlatListProps, StyleSheet, View } from 'react-native';

export type PaginatedListProps<T> = FlatListProps<T>;

export const PaginatedList = <T,>(props: PaginatedListProps<T>) => {
    return (
        <View style={styles.root}>
            <FlatList
                style={styles.root}
                contentContainerStyle={styles.container}
                {...props}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        marginTop: 12,
    },

    container: {
        height: 400,
    },
});
