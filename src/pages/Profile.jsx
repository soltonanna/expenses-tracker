import React, { useState, useEffect, useContext } from 'react';
import Container from '../components/Container';
import UsersService from '../services/users.service';
import AuthContext from '../context/AuthContext';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await UsersService.me();
        setProfileData(data);
      } catch (error) {
        console.log('Error fetching profile data', error.message);
      }
    };
    fetchProfileData();
  }, []);

  return (
    <Container>
      { profileData && user ? (
        <>
          <h2>Hello </h2>
          <p>Email: { profileData.email }</p>
        </>
      ) : (
        <p>Loading profile data...</p>
      ) }
    </Container>
  )
}

export default Profile;