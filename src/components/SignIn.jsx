import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';

import Text from './Text';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={{ alignItems: "stretch", padding: 16 }}>
      <FormikTextInput testID="username" name="username" placeholder="username" />
      <FormikTextInput testID="password" name="password" placeholder="password" secureTextEntry />
      <TouchableWithoutFeedback testID="submit" onPress={onSubmit} >
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

export const SignInFormContainer = ({ onSubmit }) => {
  const initialValues = {
    username: '',
    password: '',
  };
  const validationSchema = yup.object().shape({
    username: yup
      .string().required('username is required'),
    password: yup
      .string().required('password is required'),
  });

  return (<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
    {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
  </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      history.push("/reviews");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignInFormContainer onSubmit={onSubmit} />
  );
};

export default SignIn;