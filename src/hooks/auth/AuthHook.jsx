import { useMutation, useQueryClient } from "react-query";
import * as usersApi from "../../api/UsersApi";

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
  return useMutation(({ userCreds }) => usersApi.postConfirmSignUp(userCreds), {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });
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
  return useMutation(() => usersApi.postLogout(), {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });
};

export const usePostResendConfirmationCode = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ userCreds }) => usersApi.postResendConfirmationCode(userCreds),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user");
      },
    }
  );
};

export const usePostSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation(({ userCreds }) => usersApi.postSignIn(userCreds), {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });
};

export const usePostSignUp = () => {
  const queryClient = useQueryClient();
  return useMutation(({ userCreds }) => usersApi.postSignUp(userCreds), {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });
};
