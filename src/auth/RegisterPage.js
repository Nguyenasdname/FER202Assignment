import React, { useState } from 'react';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const checkUser = await axios.get(`http://localhost:5000/users?username=${username}`);
            if (checkUser.data.length > 0) {
                setError('Username already exists!');
                setTimeout(() => setError(''), 2000);
                return;
            }

            const newUser = { username, password, email };
            await axios.post('http://localhost:5000/users', newUser);
            const user = await axios.get(`http://localhost:5000/users?username=${username}`);
            setMessage('Registration successful! Welcome, ' + username + '!');
            localStorage.setItem('user', JSON.stringify(user));
            setTimeout(() => navigate('/home'), 2000);
        } catch (error) {
            setError('Registration failed! Please try again.');
        }
    };

    return (
        <Container>
            <Card className='p-4 mt-5' style={{ maxWidth: '500px', margin: '0 auto' }}>
                <h2 className='text-center'>🎷 Register 🎸</h2>
                {message && <Alert variant="success">{message}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="password" className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="email" className="mt-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3" style={{ width: '100%' }}>
                        Register
                    </Button>
                    <div className="mt-3 text-center">
                        <span>Already have an account? </span>
                        <Button variant="link" onClick={() => navigate('/login')}>Login here</Button>

                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default Register;
