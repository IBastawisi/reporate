import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';

import Text from './Text';
import theme from '../theme';

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={{ alignItems: "stretch", padding: 16 }}>
      <FormikTextInput name="username" placeholder="username" />
      <FormikTextInput name="password" placeholder="password" secureTextEntry />
      <TouchableWithoutFeedback onPress={onSubmit} >
        <Text fontWeight="bold" style={{
          backgroundColor: theme.colors.primary,
          textAlign: "center",
          padding: 16,
          marginTop: 8,
          borderRadius: 3,
          color: "white"
        }}>Login</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup
  .string().required('username is required'),
  password: yup
    .string().required('password is required'),
});

const SignIn = () => {
  const initialValues = {
    username: '',
    password: '',
  };
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;