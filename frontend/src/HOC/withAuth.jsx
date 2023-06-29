import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";

export const AuthProvider = ({ component }) => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        console.log('Access token:', accessToken);
      } catch (error) {
        console.error('Error retrieving access token:', error);
      }
    };

    if (isAuthenticated) {
      fetchToken();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) {
    return <h3>Loading...</h3>; // Show a loading indicator if authentication status is still loading
  }

  const Component = withAuthenticationRequired(component);

  return isAuthenticated ? <Component /> : <h3>Please Login</h3>; // Show "Please Login" message if not authenticated
};
