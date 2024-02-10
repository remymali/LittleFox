import React, { useState, useEffect } from 'react';
import { useGetAttendanceQuery } from '../../slices/studentApiSlice.js';
import { useSelector } from 'react-redux';
import FormContainer from '../../components/formContainer.jsx';

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

  return (
    <FormContainer >
      <h2>Student Attendance</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record, index) => (
            <tr key={index}>
              <td>{formatDate(record.date)}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </FormContainer>
  );
};

export default StudentAttendance;
