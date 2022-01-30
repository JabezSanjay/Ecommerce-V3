import React from 'react';
import Navbar from '../../components/Layout/Navbar';
import Sidebar from '../../components/Sidebar';

const Profile = () => {
  return (
    <>
      <Navbar />
      <Sidebar page='profile' />
    </>
  );
};

export default Profile;
