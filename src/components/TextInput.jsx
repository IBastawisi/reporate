import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.colors.textDisabled,
    borderRadius: 3

  }
});

const TextInput = ({ style, ...props }) => {
  const textInputStyle = [styles.input, style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;