import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';

import Text from './Text';
import theme from '../theme';
import { useHistory } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={{ alignItems: "stretch", padding: 16 }}>
      <FormikTextInput name="repositoryName" placeholder="repository name" />
      <FormikTextInput name="ownerName" placeholder="owner name" />
      <FormikTextInput name="rating" placeholder="rating" keyboardType='number-pad' />
      <FormikTextInput name="text" placeholder="text" />
      <TouchableWithoutFeedback onPress={onSubmit} >
        <Text fontWeight="bold" style={{
          backgroundColor: theme.colors.primary,
          textAlign: "center",
          padding: 16,
          marginTop: 8,
          borderRadius: 3,
          color: "white"
        }}>Submit</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export const CreateReviewFormContainer = ({ onSubmit }) => {
  const initialValues = {
    repositoryName: '',
    ownerName: '',
    rating: 100,
    text: '',
  };
  const validationSchema = yup.object().shape({
    repositoryName: yup
      .string().required('repository name is required'),
    ownerName: yup
      .string().required('owner name is required'),
    rating: yup
      .number().required('rating is required'),
  });

  return (<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
    {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
  </Formik>
  );
};

const CreateReview = () => {
  const [create] = useMutation(CREATE_REVIEW);

  const history = useHistory();

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;

    try {
      await create({ variables: { review: { repositoryName, ownerName, rating: +rating, text } } });
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <CreateReviewFormContainer onSubmit={onSubmit} />
  );
};

export default CreateReview;