import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import { SignInFormContainer } from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {

      const onSubmit = jest.fn();
      const { getByTestId } = render(<SignInFormContainer onSubmit={onSubmit} />);

      await act(async () => {
        await fireEvent.changeText(getByTestId('username'), 'ibastawisi');
        await fireEvent.changeText(getByTestId('password'), 'password');
        await fireEvent.press(getByTestId('submit'));
      });

      await waitFor(() => {
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'ibastawisi',
          password: 'password',
        });

        expect(onSubmit).toHaveBeenCalledTimes(1);
      });
    });
  });
});