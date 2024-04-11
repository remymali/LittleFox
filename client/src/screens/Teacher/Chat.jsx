// Chat.jsx
import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/formContainer.jsx';
import '../Teacher/Chat.css';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
const Chat = () => {
    const { userInfo } = useSelector((state) => state.auth);
    console.log("userInfo", userInfo)
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const navigate = useNavigate();
    const socket = io('http://localhost:8007');

    const handleVideoChat = () => {

        navigate('/videoChat')
    }

    const handleMessage = (e) => {
        e.preventDefault();
        console.log('Message:', message);
        setMessage('');
        socket.emit('chat-message', { msg: message, userInfo: userInfo });
    };

    useEffect(() => {
        socket.on('chat-message', (payload) => {
            console.log("payload", payload)
            setChat([...chat, payload]);
        });
    });


    return (
        <div>
            <div className="d-flex justify-content-end p-2 bg bg-black video-icon" style={{ width: '40px', borderRadius: 5 }}>
                <FontAwesomeIcon icon={faVideoCamera} className="ml-auto" size="lg" aria-hidden="true" onClick={handleVideoChat} />
            </div>
            <FormContainer style={{ height: 'calc(80vh - 60vh)' }}>
                <ul id="messages">
                    {chat.map((payload, index) => {
                        const isSentByCurrentUser = payload.sender.name === userInfo.name;
                        const messageClass = isSentByCurrentUser ? 'sent-message' : 'received-message';

                        return (
                            <p
                                key={index}
                                className={`message-container ${messageClass}`}
                            >
                                {payload.msg}
                            </p>
                        );
                    })}


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
        </div>
    );
};

export default Chat;
