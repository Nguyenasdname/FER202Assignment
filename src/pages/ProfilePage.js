import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Card, Alert, Modal } from 'react-bootstrap';
import axios from 'axios';
import Navbar from '../components/Navbar';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [tempAvatar, setTempAvatar] = useState('');

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
            setFormData({
                firstname: storedUser.firstname || '',
                lastname: storedUser.lastname || '',
                phone: storedUser.phone || '',
                address: storedUser.address || '',
            });
            setAvatarUrl(storedUser.avatar || 'https://via.placeholder.com/150');
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (!user) return;

        try {
            const updatedUser = { ...user, ...formData, avatar: avatarUrl };
            await axios.put(`http://localhost:5000/users/${user.id}`, updatedUser);

            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            setIsEditing(false);
            setMessage('Profile updated successfully!');
            setTimeout(() => setMessage(''), 2000);
        } catch (error) {
            console.error('Failed to update profile:', error);
            setMessage('Failed to update profile. Try again.');
        }
    };

    const handleAvatarChange = () => {
        if (tempAvatar.trim() !== '') {
            setAvatarUrl(tempAvatar);
            setIsEditing(true);
        }
        setShowModal(false);
    };

    return (
        <>
            <Navbar />
            <Container className="mt-5">
                <Card className="p-4 text-center">
                    <h2>👤 Profile</h2>
                    {message && <Alert variant="success">{message}</Alert>}

                    {/* Avatar */}
                    <div className="d-flex justify-content-center my-3">
                        <img
                            src={avatarUrl}
                            alt="Avatar"
                            width="220px"
                            height="220px"
                            style={{ cursor: 'pointer', border: '2px solid #ddd', borderRadius: '50%' }}
                            onClick={() => {
                                setTempAvatar(avatarUrl);
                                setShowModal(true);
                            }}
                        />
                    </div>

                    <Form>
                        <Form.Group className="mt-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={user?.username} disabled />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={user?.email} disabled />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} />
                        </Form.Group>
                        {isEditing && (
                            <Button variant="primary" className="mt-3 w-100" onClick={handleSave}>
                                Save
                            </Button>
                        )}
                    </Form>
                </Card>
            </Container>

            {/* Modal chỉnh avatar */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Change Avatar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Enter Avatar URL</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Paste image URL here"
                            value={tempAvatar}
                            onChange={(e) => setTempAvatar(e.target.value)}
                        />
                    </Form.Group>
                    {/* Hiển thị ảnh xem trước ngay khi nhập URL */}
                    {tempAvatar && (
                        <div className="d-flex justify-content-center my-3">
                            <img
                                src={tempAvatar}
                                alt="Avatar Preview"
                                width="150px"
                                height="150px"
                                style={{ borderRadius: '50%', border: '2px solid #ddd' }}
                            />
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleAvatarChange}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ProfilePage;
