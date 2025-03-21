import { useMutation, useQueryClient } from "react-query";
import {
  signIn,
  signUp,
  confirmResetPassword,
  confirmSignUp,
  resetPassword,
  signOut,
  resendSignUpCode,
} from "aws-amplify/auth";

export const usePostResetPassword = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ confirmationCode, username, newPassword }) =>
      confirmResetPassword({ confirmationCode, username, newPassword }),
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
  return useMutation(({ username }) => resetPassword({ username }), {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });
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
  const mutation = useMutation(
    async ({ username, password }) => {
      try {
        const response = await signIn({ username, password });
        if (!response?.isSignedIn) {
          throw new Error("UserNotConfirmedException");
        }
        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      onSuccess: async (data) => {
        queryClient.invalidateQueries("user");
      },
    }
  );
  return mutation;
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
