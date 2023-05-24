import React from 'react';
import GoalForm from '../components/GoalForm';
import BillReminderForm from '../components/BillReminder';
import MyPieChart from '../components/MyPieChart';
import Auth from '../utils/auth';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  const loggedIn = Auth.loggedIn();

  return (
    <main>
      {loggedIn ? (
        <>
          <h1>Welcome, {Auth.getProfile().data.username}!</h1>
          <Container>
            <Row className="mb-4">
              <Col>
                <MyPieChart />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <GoalForm />
              </Col>
              <Col xs={12} md={6}>
                <BillReminderForm />
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <h1>Please log in to see your chart.</h1>
      )}
    </main>
  );
};

export default Home;