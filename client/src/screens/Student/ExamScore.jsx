import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetExamsQuery } from '../../slices/studentApiSlice'; // Adjust the path as necessary
import FormContainer from '../../components/FormContainer'; // Import FormContainer from Bootstrap

const ExamsScreen = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const [userEmail, setUserEmail] = useState(userInfo.email);
    const { data: exams, isLoading, error } = useGetExamsQuery(userEmail);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <FormContainer>
             {exams.map((exam, index) => (
                <>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
            <h2 className='mt-5 text-center'>Exam Name : {exam.examName}</h2>
            </ul>
            <h5>Exam Date : {formatDate(exam.examDate)}</h5>
            </>
             ))}
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            
                            <th>Subjects</th>
                            <th>Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exams.map((exam, index) => (
                            <tr key={index}>
                                 {/* Format date here */}
                                <td>
                                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                                        {exam.subjects.map((subject, subIndex) => (
                                            <li key={subIndex}>
                                                {subject.subjectName}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                                        {exam.subjects.map((subject, subIndex) => (
                                            <li key={subIndex}>
                                                {subject.marks}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>


                </table>
            </div>
        </FormContainer>
    );
};

export default ExamsScreen;
