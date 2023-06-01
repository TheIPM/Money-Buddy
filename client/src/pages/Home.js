import React from 'react';
import GoalForm from '../components/GoalForm';
import BillReminderForm from '../components/BillReminder';
import FinancialData from '../components/FinancialData';
import UserGoals from '../components/UserGoals';
import UserBills from '../components/UserBills'; 
import AddExpenseForm from '../components/AddExpenseForm';
import AddIncomeForm from '../components/AddIncomeForm';
import Auth from '../utils/auth';
import { Container, Row, Col } from 'react-bootstrap';
import 'animate.css/animate.min.css';


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
                <FinancialData />
                <AddIncomeForm />
                <AddExpenseForm />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <GoalForm />
                <UserGoals userId={Auth.getProfile().data._id} />
              </Col>
              <Col xs={12} md={6}>
                <BillReminderForm />
                <UserBills userId={Auth.getProfile().data._id} /> 
              </Col>
            </Row>
          </Container>
        </>
      ) : (

        <>
        <div className="animate__animated animate__fadeInRight">
          <h1 style={{ marginBottom: '50px', textAlign: 'center', color: '#000' }}>Money buddy</h1>
        </div>
        <div className="animate__animated animate__fadeInLeft">
          <h2 style={{ textAlign: 'center', color: '#444' }}>Welcome to the buddy for your money, lets keep track of all that money. Please signup or log in</h2>
        </div>
      </>

      )}
    </main>
  );
};

export default Home;