import React from 'react';
import MyPieChart from '../components/MyPieChart';
import Auth from '../utils/auth';

const Home = () => {
  const loggedIn = Auth.loggedIn();

  return (
    <main>
      {loggedIn ? (
        <>
          <h1>Welcome, {Auth.getProfile().data.username}!</h1>
          <MyPieChart />
        </>
      ) : (
        <h1>Please log in to see your chart.</h1>
      )}
    </main>
  );
};

export default Home;