import React, { useEffect, useState } from 'react';
import { useRateTeachersQuery } from '../../slices/studentApiSlice';    
import FormContainer from '../../components/formContainer';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../Student/TeacherRating.css';

const TeacherRating = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const { data: teachers, isLoading, error } = useRateTeachersQuery();
    const [teachersData, setTeachersData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            console.error('Error fetching teachers:', error);
            // Handle error (e.g., display an error message)
        }
    }, [error]);

    const handleRating = (id) => {
        console.log("id", id)
        // Handle rating logic here
        navigate('/starRating',{state:{id}});
    };

    return (
        <FormContainer>
            <h1 className='text-center'>Teachers</h1>
            <table className='users-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers?.map(teacher => (
                        <tr key={teacher._id}>
                            <td>{teacher.name}</td>
                            <td>
                                <FontAwesomeIcon
                                    icon={faStar}
                                    onClick={() => handleRating(teacher._id)}
                                    className="star-icon icon-button"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </FormContainer>
    );
};

export default TeacherRating;
