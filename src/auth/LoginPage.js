import React, { useState } from 'react';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                `http://localhost:5000/users?username=${username}&password=${password}`
            );

            const user = response.data[0];

            if (user) {
                setMessage(`Welcome, ${username}! Login successful.`);
                localStorage.setItem('user', JSON.stringify(user));
                setTimeout(() => navigate('/home'), 1000);
            } else {
                alert('Invalid username or password!');
            }
        } catch (error) {
            alert('Login failed! Please check your username and password.');
        }
    };

    const handleGoogleLogin = () => {
        alert('Google login feature coming soon!');
    };

    return (
        <Container className='mt-5' style={{  }}>
            <Card className='p-4' style={{ maxWidth: '500px', margin: '0 auto' }}>
                <h2 className='text-center' style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', color: '#333' }}>🎵 Music Store 🎹</h2>
                {message && <Alert variant="success">{message}</Alert>}
                <Form onSubmit={handleSubmit} className="mt-4">
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
                    <Button variant="primary" type="submit" className="mt-3 w-100">
                        Login
                    </Button>
                </Form>
                <Button
                    variant="light"
                    className="mt-3 w-100 d-flex align-items-center justify-content-center"
                    onClick={handleGoogleLogin}
                >
                    Login with Google
                </Button>
                <div className="mt-3 text-center">
                    <span>Don't have an account? </span>
                    <Button variant="link" onClick={() => navigate('/register')}>Register here</Button>
                    
                </div>
            </Card>
        </Container>
    );
};

export default Login;
