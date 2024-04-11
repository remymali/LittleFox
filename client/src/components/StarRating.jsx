import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import FormContainer from './formContainer';
import { toast } from 'react-toastify';
import { useRateTeacherDtlQuery, useAddRatingMutation } from '../slices/studentApiSlice';

const StarRating = () => {
    const location = useLocation();
    const { id } = location.state || {}; // Retrieve the teacher ID from location state
    console.log("id", id);

    const { data: teacher, isLoading, error, refetch } = useRateTeacherDtlQuery(id);
    useEffect(() => {
        refetch(); // Call the fetch function to fetch teacher's details
    }, [id, refetch]);

    const [rating, setRating] = useState(0);
    const [addRating, isLoadingAddRating] = useAddRatingMutation();


    const [comment, setComment] = useState('');

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleStarClick = (value) => {
        setRating(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addRating({ teacherId: id, rating,comment }).unwrap();
            console.log("res.message", res.message);
            toast.success('Rating added successfully.');
            setComment('');
            setRating(0);
        } catch (error) {
            toast.error('Internal Server Error.');
        }
    };

    if (!id) {
        return (
            <FormContainer>
                <div>
                    <h1>Error</h1>
                    <p>Teacher ID not found in location state.</p>
                </div>
            </FormContainer>
        );
    }

    return (
        <FormContainer>
          
            <h2 className='text-center p-5'>Rate Teacher</h2>
            <hr/>
            <div style={{display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '30vh'}}>
            {teacher && (
                <div className="card-body text center">
                    <Form onSubmit={handleSubmit}>
                        <div className="d-flex align-items-center mb-3">
                            {teacher.profileImg && (
                                <img
                                    src={teacher.profileImg} // Assuming teacher.profileImg contains the URL of the avatar image
                                    alt="Teacher Avatar"
                                    className="avatar me-3"
                                />
                            )}
                            <div>
                                <h4 className="card-title">{teacher.name}</h4>
                                <h6 className="card-subtitle mb-2 text-muted">{teacher.email}</h6>
                            </div>
                        </div>
                        <div>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <span
                                    key={value}
                                    onClick={() => handleStarClick(value)}
                                    style={{ fontSize: '30px', cursor: 'pointer', color: value <= rating ? 'gold' : 'gray' }}
                                >
                                    &#9733; {/* Unicode star character */}
                                </span>
                            ))}
                        </div>
                        <Form.Group controlId="comment">
                                <Form.Label>Add a comment:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={comment}
                                    onChange={handleCommentChange}
                                />
                            </Form.Group>
                        <hr/>
                        <button type="submit" className="btn btn-primary">Add Rating</button>
                    </Form>
                </div>
            )}
            </div>
        </FormContainer>
    );
};

export default StarRating;
