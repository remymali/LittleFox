import React, { useState, useEffect } from 'react';
import { useGetAttendanceQuery } from '../../slices/studentApiSlice.js';
import { useSelector } from 'react-redux';
import FormContainer from '../../components/formContainer.jsx';
import  Calendar  from '@fullcalendar/react';
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
  const eventContent = (arg) => {console.log("arg",arg)
  let content=''
  if(arg.event.backgroundColor==='green')
  {
    content="present"
  }
  else if(arg.event.backgroundColor==='red'){
    content="absent"
  }
    return {
      
      html: `<div style="color: ${arg.event.backgroundColor};">${content}</div>`
    };
  };

  return (
    <FormContainer>
      <h2 className='p-3'> Attendance</h2>
      <Calendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={attendance.map((record, index) => ({
          id: index,
          title: record.status,
          start: new Date(record.date),
          backgroundColor: record.status === 'Present' ? 'green' : 'red' // Change color based on status
        }))}
        eventContent={eventContent} // Apply custom event content
      />
    </FormContainer>
  );
};

export default StudentAttendance;
