import { Formik, FormikHelpers } from 'formik';
import { StyleSheet, View } from 'react-native';

import { TextInput, Button } from '@/modules/ui/moleculas';
import { searchFormValidationSchema } from '@/modules/inscription/model';

import type { SearchFormValues } from '@/modules/inscription/model';

export type SearchFormProps = {
    onSubmit: (
        values: SearchFormValues,
        formikHelpers: FormikHelpers<SearchFormValues>
    ) => Promise<void>;
};

export const SearchForm = (props: SearchFormProps) => {
    const { onSubmit } = props;

    const initialValues: SearchFormValues = {
        address:
            'bc1pe6y27ey6gzh6p0j250kz23zra7xn89703pvmtzx239zzstg47j3s3vdvvs',
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
                        <View style={styles.form}>
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
                        </View>
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
