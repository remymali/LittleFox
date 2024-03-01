import React, { useEffect, useState } from 'react';
import { useGetSubjectQuery } from '../../slices/subjectApiSlice.js';
import { useAddMarksMutation } from '../../slices/teacherApiSlice.js';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Button, FormGroup, FormControl } from 'react-bootstrap';
import FormContainer from '../../components/formContainer.jsx';

const AddMarksScreen = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { data: subjects, isLoading: subjectsLoading } = useGetSubjectQuery();
    const [marksData, setMarksData] = useState([]);
    const [examName, setExamName] = useState('');
    const [examDate, setExamDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [addMarks] = useAddMarksMutation();

    useEffect(() => {
        if (!subjectsLoading && subjects) {
            // Initialize marks data with empty values for each subject
            const initialMarksData = subjects.map(sub => ({
                subjectId: sub._id,
                subjectName: sub.subName,
                marks: ''
            }));
            setMarksData(initialMarksData);
        }
    }, [subjectsLoading, subjects]);

    const handleMarksChange = (index, value) => {
        setMarksData(prevMarksData => {
            const updatedMarksData = [...prevMarksData];
            updatedMarksData[index].marks = value;
            return updatedMarksData;
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!examName || !examDate || marksData.some(subject => !subject.marks)) {
            toast.error("All fields are required.");
            return;
        }
        setIsLoading(true);
        try {
            const marksPayload = {
                userId,
                examName,
                examDate,
                subjects: marksData
            };
            const response = await addMarks(marksPayload).unwrap();
            console.log('Marks data submitted:', response);
            navigate('/MarkStudentList');
        } catch (error) {
            console.error('Error submitting marks data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormContainer>
            <h2>Add Marks</h2>
            <Form onSubmit={submitHandler}>
                <FormGroup className='my-2' controlId='examName'>
                    <Form.Label>Exam Name:</Form.Label>
                    <FormControl type='text' value={examName} onChange={(e) => setExamName(e.target.value)} />
                </FormGroup>
                <FormGroup className='my-2' controlId='examDate'>
                    <Form.Label>Exam Date:</Form.Label>
                    <FormControl type='date' value={examDate} onChange={(e) => setExamDate(e.target.value)} />
                </FormGroup>
                {subjectsLoading ? (
                    <div>Loading subjects...</div>
                ) : (
                    marksData.map((subject, index) => (
                        <FormGroup key={subject.subjectId} className='my-2'>
                            <Form.Label>{subject.subjectName}:</Form.Label>
                            <FormControl
                                type='number'
                                value={subject.marks}
                                onChange={(e) => handleMarksChange(index, e.target.value)}
                            />
                        </FormGroup>
                    ))
                )}
                <Button type='submit' variant='primary' className='mt-3' disabled={isLoading}>Add Marks</Button>
            </Form>
        </FormContainer>
    );
};

export default AddMarksScreen;
