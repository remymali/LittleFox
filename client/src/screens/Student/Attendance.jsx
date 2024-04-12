import React, { useState, useEffect } from 'react';
import { useGetAttendanceQuery } from '../../slices/studentApiSlice.js';
import { useSelector } from 'react-redux';
import FormContainer from '../../components/formContainer.jsx';
import Calendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';
import './StudAttendance.css'
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
        if (arg.event.backgroundColor === 'green') {
            circleColor = '#28a745'; // Green color for 'Present'
        } else if (arg.event.backgroundColor === 'red') {
            circleColor = '#dc3545'; // Red color for 'Absent'
        }
        return {
            html: `<div style="background-color: ${circleColor};">${arg.event.backgroundColor === 'green' ? 'P' : 'A'}</div>`,
        };
    };

    // Function to apply custom styling to individual days
    const dayRender = (arg) => {
        // Customize the style of individual days
        arg.el.style.color = 'white'; // Set the color of the day
        const dayElement=arg.el.querySelector('.fc-daygrid-day-number')
        if (dayElement) {
            document.getElementsByClassName.dayElement.style.color = 'white'; // Set the color of the day
        }
    };

    return (
        <FormContainer>
            <h2>Attendance</h2>
            <div className='cal-content'>
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
                    dayRender={dayRender} // Apply custom styling to individual days
                />
            </div>
        </FormContainer>
    );
};

export default StudentAttendance;
