import { useMsal } from '@azure/msal-react';
import Button from '@mui/joy/Button';

import { loginRequest } from '@/configs/authConfig';

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 * Note the [useMsal] package
 */

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch((e) => {
      console.log(e);
    });
  };

  return <Button onClick={handleLogin}>Signin</Button>;
};
