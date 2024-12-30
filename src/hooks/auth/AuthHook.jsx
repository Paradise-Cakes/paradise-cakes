import { useMutation, useQueryClient } from "react-query";
import * as usersApi from "../../api/UsersApi";
import {
  signIn,
  signUp,
  confirmResetPassword,
  confirmSignUp,
  resetPassword,
  signOut,
  resendSignUpCode,
} from "aws-amplify/auth";

export const usePostConfirmForgotPassword = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ userCreds }) => usersApi.postConfirmForgotPassword(userCreds),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user");
      },
    }
  );
};

export const usePostConfirmSignUp = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ confirmationCode, username, password }) =>
      confirmSignUp({ confirmationCode, username, password }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user");
      },
    }
  );
};

export const usePostForgotPassword = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ userCreds }) => usersApi.postForgotPassword(userCreds),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user");
      },
    }
  );
};

export const usePostLogout = () => {
  const queryClient = useQueryClient();
  return useMutation(() => signOut(), {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });
};

export const usePostResendConfirmationCode = () => {
  const queryClient = useQueryClient();
  return useMutation(({ username }) => resendSignUpCode({ username }), {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });
};

export const usePostSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ username, password }) => signIn({ username, password }),
    {
      onSuccess: async (data) => {
        queryClient.invalidateQueries("user");
      },
    }
  );
};

export const usePostSignUp = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ username, password, attributes }) =>
      signUp({
        username,
        password,
        options: {
          userAttributes: {
            ...attributes,
          },
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user");
      },
    }
  );
};
