import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import IncomeDetails from '../components/IncomeDetails';
import ExpenseDetails from '../components/ExpenseDetails';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();
  const [showDetails, setShowDetails] = useState(false);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <Card className="mt-5">
            <Card.Header className="text-center font-weight-bold">
              User Details 
              <Button
                className="ml-2"
                variant="outline-primary"
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
                style={{ marginLeft: '1rem' }} 
              >
                {showDetails ? 'Hide' : 'Show'}
              </Button>
            </Card.Header>
            {showDetails && (
              <ListGroup variant="flush">
                <ListGroup.Item>Id: {user._id}</ListGroup.Item>
                <ListGroup.Item>Email: {user.email}</ListGroup.Item>
                <ListGroup.Item>Username: {user.username}</ListGroup.Item>
              </ListGroup>
            )}
            <Card.Body>
              <Card.Title className="text-center font-weight-bold">Income Details</Card.Title>
              <IncomeDetails/>
            </Card.Body>
            <Card.Body>
              <Card.Title className="text-center font-weight-bold">Expense Details</Card.Title>
              <ExpenseDetails/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;