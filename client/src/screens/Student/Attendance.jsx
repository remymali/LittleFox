import React, { useState, useEffect } from 'react';
import { useGetAttendanceQuery } from '../../slices/studentApiSlice.js';
import { useSelector } from 'react-redux';
import FormContainer from '../../components/formContainer.jsx';
import Calendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';

const StudentAttendance = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState(userInfo.email);

    useEffect(() => {
        navigate('/studAttendance');
    }, [navigate]);

    const { data: attendance, isLoading } = useGetAttendanceQuery(userEmail);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    // Function to customize event content and color based on status
    const eventContent = (arg) => {
        let circleColor = '';
        let textcolor='#ffffff';
        if (arg.event.backgroundColor === 'green') {
            circleColor = '#28a745'; // Green color for 'Present'
        } else if (arg.event.backgroundColor === 'red') {
            circleColor = '#dc3545'; // Red color for 'Absent'
        }
        return {
            html: `<div style="color: ${textcolor}; background-color: ${circleColor}; border-radius: 50%; width: 24px; height: 24px; display: flex; justify-content: center; align-items: center;">${arg.event.backgroundColor === 'green' ? 'P' : 'A'}</div>`,
        };
    };

    return (
        <FormContainer>
            <h2 className="p-3">Attendance</h2>
            <div style={{ maxWidth: '100vw', height: '80vh', margin: '0 auto',color:'white' }}>
                <Calendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={attendance.map((record, index) => ({
                        id: index,
                        title: record.status,
                        start: new Date(record.date),
                        backgroundColor: record.status === 'Present' ? 'green' : 'red', // Change color based on status
                    }))}
                    eventContent={eventContent} // Apply custom event content
                />
            </div>
        </FormContainer>
    );
};

export default StudentAttendance;
