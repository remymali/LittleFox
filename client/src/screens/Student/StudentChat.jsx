import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/formContainer.jsx';
import '../Teacher/Chat.css';
import io from 'socket.io-client';
const StudentChat = () => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    const socket = io('http://localhost:8007');

    const handleMessage = (e) => {
        e.preventDefault();
        console.log('Message:', message);
        setMessage('');
        socket.emit('chat-message', { message });
    };

    useEffect(() => {
        socket.on('chat-message', (payload) => {
            setChat([...chat, payload]);
        });
    });

    return (
        <FormContainer>
            <ul id="messages">
                {chat.map((payload, index) => (
                    <p
                        key={index}
                        className={`message-container ${payload.sender === 'currentUser' ? 'sent-message' : 'received-message'}`}
                    >
                        {payload.message}
                    </p>
                ))}
            </ul>
            <Form id="form" onSubmit={handleMessage}>
                <Form.Control
                    id="input"
                    type="text"
                    name="chat"
                    placeholder="Enter the message"
                    autoComplete="off"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button id="sendBtn" type="submit">
                    Send
                </Button>
            </Form>
        </FormContainer>
    );
};

export default StudentChat