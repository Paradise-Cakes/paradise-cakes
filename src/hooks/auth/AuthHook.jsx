import { useMutation, useQueryClient } from "react-query";
import * as paradiseCakesApi from "../../api/ParadiseCakesApi";

export const usePostSignUp = () => {
  const queryClient = useQueryClient();
  return useMutation(({ signUp }) => paradiseCakesApi.postSignUp(signUp), {
    onSuccess: () => {
      console.log("SUCCESS");
    },
  });
};

export const usePostConfirmationCode = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ userCreds }) => paradiseCakesApi.postConfirmSignUp(userCreds),
    {
      onSuccess: () => {
        console.log("SUCCESS");
      },
    }
  );
};

export const usePostResendConfirmationCode = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ email }) => paradiseCakesApi.postResendConfirmationCode(email),
    {
      onSuccess: () => {
        console.log("SUCCESS");
      },
    }
  );
};

export const usePostSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ userCreds }) => paradiseCakesApi.postSignIn(userCreds),
    {
      onSuccess: () => {
        console.log("SUCCESS");
      },
    }
  );
};

export const usePostForgotPassword = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ userCreds }) => paradiseCakesApi.postForgotPassword(userCreds),
    {
      onSuccess: () => {
        console.log("SUCCESS");
      },
    }
  );
};

export const usePostLogout = () => {
  const queryClient = useQueryClient();
  return useMutation(() => paradiseCakesApi.postLogout, {
    onSuccess: () => {
      console.log("LOGGED OUT");
    },
  });
};
