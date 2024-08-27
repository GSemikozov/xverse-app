import { Form, Formik, FormikHelpers } from 'formik';
import { StyleSheet, View } from 'react-native';

import { TextInput, Button } from '@/modules/ui/moleculas';
import { searchFormValidationSchema } from '@/modules/nft/model';

import type { SearchFormValues } from '@/modules/nft/model';

export type SearchFormProps = {
    onSubmit: (
        values: SearchFormValues,
        formikHelpers: FormikHelpers<SearchFormValues>
    ) => Promise<void>;
};

export const SearchForm = (props: SearchFormProps) => {
    const { onSubmit } = props;

    const initialValues: SearchFormValues = {
        address: '',
    };

    return (
        <View>
            <Formik
                validationSchema={searchFormValidationSchema}
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                {(formikProps) => {
                    const { values, errors, handleChange, submitForm } =
                        formikProps;

                    return (
                        <Form style={styles.form}>
                            <View style={styles.formRow}>
                                <TextInput
                                    id="address"
                                    label="Owner Bitcoin Address:"
                                    value={values.address}
                                    error={errors.address}
                                    onChange={handleChange}
                                />
                            </View>

                            <View style={styles.formRow}>
                                <Button title="Look Up" onPress={submitForm} />
                            </View>
                        </Form>
                    );
                }}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {},

    form: {},

    formRow: {
        marginBottom: 10,
    },
});
