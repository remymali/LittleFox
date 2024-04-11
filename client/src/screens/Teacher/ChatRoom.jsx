import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const ChatRoom = () => {
    const { roomID } = useParams();
    const { userInfo } = useSelector((state) => state.auth);
    const email = userInfo.email || '';
    const name = userInfo.name || '';
    const meetingContainerRef = useRef(null);

    useEffect(() => {
        const myMeeting = async () => {
            const appId = 1594163332;
            const serverSecret = "9a24d30d20d9f97ecf7ffcdb537bd7d5";
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId, serverSecret, roomID, email, name);

            const zp = ZegoUIKitPrebuilt.create(kitToken);

            zp.joinRoom({
                container: meetingContainerRef.current,
                sharedLinks: [
                    {
                        name: 'Copy link',
                        url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID,
                    },
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.GroupCall,
                },
                showScreenSharingButton: true,
            });
        };

        myMeeting();
    }, [roomID, email, name]);

    return (
        <div
            className="myCallContainer"
            ref={meetingContainerRef}
            style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
            }}
        ></div>
    );
};

export default ChatRoom;
