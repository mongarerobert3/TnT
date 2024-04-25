import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
import {formatDate} from '../..//dashboardFunc'


const UserProfilePage = () => {
  const id = localStorage.getItem('userId');
  const token = localStorage.getItem('token')
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
        const response = await axios.get(`http://localhost:5000/api/user/${id}`, config);
        const userData = response.data;
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  return (
    <>
      <div className="user-container">
        <div className="user-avatar-circle">
          {userData && <img 
            src={userData.avatar}
            alt="avatar" 
            />           
          }
        </div>
        <div className="user-image-container">
          {userData && <img src={userData.coverImage} alt="Cover_Image" />}
          <button className="user-edit-button">
            <i className="fas fa-pencil-alt"></i>
          </button>
        </div>
      </div>
      <div className='user-profile-info-container'>
        <div className='user-profile-info'>
        <div>
          <h2>{userData && userData.name}</h2>
        </div>
        <div className="user-countries">
          ###Countries you have been to. Dont worry we'll populate that for you
        </div>
        <div className='created-At'>
          <h3>Member since {userData && formatDate(userData.createdAt)}</h3>
        </div>
        <div>
          <h3><b>Email:</b> {userData && userData.email}</h3>
        </div>
        <div>
          <h3><b>Phone:</b> {userData && userData.phone}</h3>
        </div>
        <div className="user-bio">
          <h3><b>Bio:</b> {userData && userData.bio}</h3>
        </div>
        <div>
          <button
            className='btn-explore'>
            Update Password
          </button>
        </div>
        </div>
        <div className='user-profile-info-side-b'>
          <div className='deactivate-btn'>
          <button
            className='btn-explore'
          >
            Deactivate Account
          </button>
          </div>
          <div className='ac-d'>
            <h2>Payment Methods</h2>
            <div className='add-icon'>
            <i className="fas fa-plus-circle"></i>
              <h1>Add your debit or credit card</h1>
            </div>
            <div className="p-methods">
              <div className="p-methods-container">
                <h3>payments mapped here</h3>
              </div>
            </div>
            <div className='b-part'>
              <h2>Tours And Travels Bonus Points</h2> 
              <h3>Balance</h3>
              <h1>$ 0</h1>
            </div>
          </div>
        </div>
      </div>     
    </>
  );
};

export default UserProfilePage;
