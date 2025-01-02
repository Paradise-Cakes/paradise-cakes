import { Amplify } from "aws-amplify";

console.log("HELLO")
console.log(import.meta.env.VITE_DEPLOY_ENV);
console.log(import.meta.env.VITE_COGNITO_USER_POOL_ID);
console.log(import.meta.env.VITE_COGNITO_APP_CLIENT_ID);

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_COGNITO_APP_CLIENT_ID,
    },
  },
});
