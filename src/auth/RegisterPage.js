import React, { useState } from 'react';
import { Form, Button, Alert, Container, Card, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Confirm password does not match!');
            setTimeout(() => setError(''), 2000);
            return;
        }
        try {
            const checkUserUsername = await axios.get(`http://localhost:5000/users?username=${username}`);
            if (checkUserUsername.data.length > 0) {
                setError('Username already exists!');
                setTimeout(() => setError(''), 2000);
                return;
            }
            const checkUserEmail = await axios.get(`http://localhost:5000/users?email=${email}`);
            if (checkUserEmail.data.length > 0) {
                setError('Email already exists!');
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
        <Container className='container-s' style={{
            backgroundImage: 'url("/images/backgroundImageRegister.jpg")', backgroundSize: 'cover',
            backgroundPosition: 'center', minHeight: '100vh',
            minWidth: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Card className='p-4 mt-5' style={{ width: '500px', margin: '0 auto' }}>
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
                    <Form.Group controlId="email" className="mt-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="password" className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="confirmPassword" className="mt-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </InputGroup>
                        {confirmPassword && confirmPassword !== password && <Alert variant="danger" className="mt-2">Confirm password does not match!</Alert>}
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
