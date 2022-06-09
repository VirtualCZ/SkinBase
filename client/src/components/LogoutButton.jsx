import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const LogoutButton = () => {
  const { logout } = useAuth0();
  const { user } = useAuth0();
  return (
    <>
      <Link
        to={"Cases"}
        className="btn btn-danger btn-block hover:bg-background p-3 rounded-cool-sm truncate"
      >
        {user.name}
      </Link>
      <button
        className="btn btn-danger btn-block hover:bg-background p-3 rounded-cool-sm" 
        onClick={() =>
          logout({
            returnTo: window.location.origin,
          })
        }
      >
        Log Out
      </button>
    </>
  );
};

export default LogoutButton;