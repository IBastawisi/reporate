import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';

import Text from './Text';
import theme from '../theme';
import { useHistory } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { SIGNUP } from '../graphql/mutations';

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={{ alignItems: "stretch", padding: 16 }}>
      <FormikTextInput name="username" placeholder="username" />
      <FormikTextInput name="password" placeholder="password" secureTextEntry />
      <FormikTextInput name="passwordConfirm" placeholder="confirm password" secureTextEntry />
      <TouchableWithoutFeedback testID="submit" onPress={onSubmit} >
        <Text fontWeight="bold" style={{
          backgroundColor: theme.colors.primary,
          textAlign: "center",
          padding: 16,
          marginTop: 8,
          borderRadius: 3,
          color: "white"
        }}>Sign Up</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export const SignUpFormContainer = ({ onSubmit }) => {
  const initialValues = {
    username: '',
    password: '',
    condirmPassword: '',
  };
  const validationSchema = yup.object().shape({
    username: yup
      .string().required('username is required'),
    password: yup.string().required('Password is required'),
    passwordConfirm: yup.string()
      .oneOf([yup.ref('password'), null])
      .required('Password confirm is required')
  });

  return (<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
    {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
  </Formik>
  );
};

const SignUp = () => {
  const [signUp] = useMutation(SIGNUP);
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ variables: { user: { username, password } } });
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignUpFormContainer onSubmit={onSubmit} />
  );
};

export default SignUp;