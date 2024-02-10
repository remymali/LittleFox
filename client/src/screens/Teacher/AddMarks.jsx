import React, { useEffect, useState } from 'react';
import { useGetSubjectQuery } from '../../slices/subjectApiSlice.js';
import { useAddMarksMutation } from '../../slices/teacherApiSlice.js';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Button, FormGroup, FormControl } from 'react-bootstrap';
import FormContainer from '../../components/formContainer.jsx'; // Import your custom FormContainer component

const AddMarksScreen = () => {
    const { userId } = useParams()
    const navigate = useNavigate()
    console.log("userrrId", userId)
    const { data: subject, isLoading: subjectLoading } = useGetSubjectQuery();
    console.log("subject", subject)
    const [userid, setUserid] = useState('')
    const [examName, setExamName] = useState('');
    const [examDate, setExamDate] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [subjectId, setSubjectId] = useState('');
    const [marks, setMarks] = useState('');
    const [addMarks, { isLoading }] = useAddMarksMutation();

    useEffect(() => {
        if (!subjectLoading && subject) {
            // Check if subject is loaded and not in loading state
            const defaultSubject = subject[0]; // Assuming the first subject is the default one
            setSubjectName(defaultSubject.subName); // Set default subject name
            setSubjectId(defaultSubject._id); // Set default subject ID
        }
    }, [subjectLoading, subject]);
    const submitHandler = async (e) => {
        e.preventDefault();
        if (!examName || !examDate || !subjectName || !marks) {
            toast.error("All fields are required.")
            return
        }
        // Handle form submission, e.g., send marks data to the backend
        const marksData = {
            userId,
            examName,
            examDate,
            subjects: [
                {
                    subjectId,
                    subjectName,
                    marks
                }
            ]
        };
        const res = await addMarks(marksData).unwrap()
        // Send marksData to the backend API for storage
        console.log('Marks data submitted:', marksData);
        navigate('/MarkStudentList')
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

                <Form.Group className="mb-3">
                    <Form.Label>Subject Name:</Form.Label>
                    <Form.Select value={subjectId} onChange={(e) => {
                        const selectedSubject = subject.find(sub => sub._id === e.target.value);
                        setSubjectName(selectedSubject?.subName || ''); // Set subject name
                        setSubjectId(selectedSubject?._id || ''); // Set subject ID
                    }}>

                        <option value=" ">Select Subject</option>
                        {
                            subjectLoading ? (<option disabled>Class loading...</option>) :

                                (subject.map((element) => <option key={subject._id} value={element._id}>{element.subName}</option>))
                        }
                    </Form.Select >
                </Form.Group>
                <FormGroup className='my-2' controlId='marks'>
                    <Form.Label>Marks:</Form.Label>
                    <FormControl type='number' value={marks} onChange={(e) => setMarks(e.target.value)} />
                </FormGroup>
                <Button type='submit' variant='primary' className='mt-3'>Add Marks</Button>
            </Form>
        </FormContainer>
    );
};

export default AddMarksScreen;
