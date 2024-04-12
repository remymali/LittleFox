import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetExamsQuery } from '../../slices/studentApiSlice';
import FormContainer from '../../components/formContainer';

const ExamsScreen = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(1); // Number of exams per page
    const { data: exams, isLoading, error } = useGetExamsQuery(userInfo.email);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const totalPages = Math.ceil(exams.length / pageSize);

    const paginatedExams = exams.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const calculateTotalMarks = (exam) => {
        let totalMarks = 0;
        exam.subjects.forEach((subject) => {
            totalMarks += parseInt(subject.marks) || 0;
        });
        return totalMarks;
    };

    return (
        <FormContainer>
            {paginatedExams.map((exam, index) => (
                <div key={index}>
                    <h2 className='mt-5 text-center'>Exam Name : {exam.examName}</h2>
                    <h5>Exam Date : {formatDate(exam.examDate)}</h5>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Subjects</th>
                                    <th>Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {exam.subjects.map((subject, subIndex) => (
                                    <tr key={subIndex}>
                                        <td>{subject.subjectName}</td>
                                        <td>{subject.marks}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td  style={{fontWeight: 'bold'}}>Total Mark:</td>
                                    <td>{calculateTotalMarks(exam)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}

            {exams.length > 0 && (
                <div className="d-flex justify-content-center">
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                        <button
                            key={page}
                            className={`btn btn-outline-info me-2 ${currentPage === page ? 'active' : ''}`}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}
        </FormContainer>
    );
};

export default ExamsScreen;
