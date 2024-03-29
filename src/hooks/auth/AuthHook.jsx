import { useMutation, useQueryClient } from "react-query";
import { postSignUp, postConfirmSignUp, 
	postResendConfirmationCode, postSignIn,
	postForgotPassword
} from "../../api/ParadiseCakesApi";
import * as paradiseCakesApi from "../../api/ParadiseCakesApi";

export const usePostSignUp = () => {
  const queryClient = useQueryClient();
  return useMutation(({ signUp }) => {
  	console.log("Hello")
  	console.log(signUp)
  	return paradiseCakesApi.postSignUp(signUp),
    {
      onSuccess: () => {
        console.log("SUCCESS")
      }
    }
  });
}

export const usePostConfirmSignUp = () => {
	const queryClient = useQueryClient();
	return useMutation(({userCreds}) =>
		paradiseCakesApi.postConfirmSignUp(userCreds),
		{
			onSuccess: () => {
				console.log("SUCCESS")
			}
		}
	)
}

export const usePostResendConfirmationCode = () => {
	const queryClient = useQueryClient();
	return useMutation(({userCreds}) =>
		paradiseCakesApi.postResendConfrimationCode(userCreds),
		{
			onSuccess: () => {
				console.log("SUCCESS")
			}
		}
	)
}

export const usePostSignIn = () => {
	const queryClient = useQueryClient();
	return useMutation(({userCreds}) =>
		paradiseCakesApi.postSignIn(userCreds),
		{
			onSuccess: () => {
				console.log("SUCCESS")
			}
		}
	)
}

export const usePostForgotPassword = () => {
	const queryClient = useQueryClient();
	return useMutation(({userCreds}) => 
		paradiseCakesApi.postForgotPassword(userCreds),
		{
			onSuccess: () => {
				console.log("SUCCESS")
			}
		}
	)
}