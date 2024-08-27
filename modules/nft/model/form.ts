import * as yup from 'yup';

export type SearchFormValues = {
    address: string;
};

export const searchFormValidationSchema = yup.object({
    address: yup.string().required(),
});
