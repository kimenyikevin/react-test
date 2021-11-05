import * as Yup from 'yup';

export const initialValues = {
  tax: 'four',
  percentage: '4',

};

export const validationSchema = Yup.object().shape({
  tax: Yup.string().required('No tax provided.'),
  percentage: Yup.string()
    .required('No percentage provided. ')
});
