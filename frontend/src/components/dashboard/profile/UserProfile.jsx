import React from 'react'
import { useAuth } from '../../../HOC/withAuth';
import { useNavigate } from 'react-router-dom'

const UserProfile = () => {  
  const auth = useAuth()

  const navigate = useNavigate()

  const handleLogout = () => {
    auth.logout()
    navigate('/')
  }

  return (
    <>
      <div> Welcome
      {auth.user}
      </div>
      <button
        onClick={handleLogout}
        >Logout
      </button>
    </>  
)
};

export default UserProfile;
