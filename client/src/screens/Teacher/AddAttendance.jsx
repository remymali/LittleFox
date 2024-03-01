import React, { useEffect, useState } from 'react';
import { useGetStudentsQuery, useAddAttendanceMutation } from '../../slices/teacherApiSlice.js';
import { Form, Button, FormGroup, FormControl } from 'react-bootstrap';
import FormContainer from '../../components/formContainer.jsx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddAttendance = () => {
    const { userInfo } = useSelector((state) => state.auth);
   
    const email=userInfo.email
    console.log("email",email)
    const [students, setStudents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().substr(0, 10));
    const [attendanceDtl, setAttendanceDtl] = useState([]);
    const { data: users, isLoading, error, refetch } = useGetStudentsQuery(email);
    const [addAttendance, { isLoading: isAddingAttendance }] = useAddAttendanceMutation();
    const navigate = useNavigate();

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        if (users) {
            setStudents(users);
            // Initialize attendance details based on user data
            setAttendanceDtl(users.map(user => ({ studentId: user._id, status: 'Present' })));
        }
    }, [users]);

    const handleAttendanceChange = (studentId, status) => {
        const updatedAttendanceDtl = attendanceDtl.map(item => {
            if (item.studentId === studentId) {
                return { ...item, status };
            }
            return item;
        });
        setAttendanceDtl(updatedAttendanceDtl);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const attendanceData = {
                date: selectedDate,
                attendance: attendanceDtl
            };
            console.log("attendanceData",attendanceData)
            const response = await addAttendance(attendanceData).unwrap();
            console.log('Attendance added successfully:', response);
            toast.success('Attendance added successfully');
            navigate('/attendance');
        } catch (error) {
            console.error('Error adding attendance:', error);
            toast.error(error.message || 'Error adding attendance');
        }
    };

    return (
        <FormContainer>
            <h2>Add Attendance</h2>
            <Form onSubmit={submitHandler}>
                <FormGroup className='my-2' controlId='date'>
                    <Form.Label>Date:</Form.Label>
                    <FormControl type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
                </FormGroup>
                <table className='users-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Attendance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student._id}>
                                <td>{student.name}</td>
                                <td>
                                    <select value={attendanceDtl.find(item => item.studentId === student._id)?.status || 'Present'} onChange={e => handleAttendanceChange(student._id, e.target.value)}>
                                        <option value="Present">Present</option>
                                        <option value="Absent">Absent</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Button type='submit' variant='primary' className='mt-3' disabled={isAddingAttendance}>Save Attendance</Button>
            </Form>
        </FormContainer>
    );
};

export default AddAttendance;
