import React, { useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import Axios from "axios"

import { AppContext } from '../App';

const LogoutButton = () => {
  const { logout } = useAuth0();
  const { user } = useAuth0();
  const { setAuthID_admin } = useContext(AppContext)
  const { setAuthSub } = useContext(AppContext)

  useEffect(() => {
    Axios.get(`http://localhost:3030/api/getOneUser/${user.sub}`, {
    }).then((response)=> { 
        setAuthID_admin(response.data[0]);
        setAuthSub(user.sub)
    })
  }, [user, logout]) 
  
  return (
    <>
      <Link
        to={"Cases"}
        className="hover:bg-background rounded-cool-sm truncate flex items-center"
      >
        <img className='h-[4rem] rounded-cool' src={user.picture}/>
        <p className='p-3'>
          {user.nickname}
        </p>
      </Link>
      <button
        className="hover:bg-background p-3 rounded-cool-sm" 
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