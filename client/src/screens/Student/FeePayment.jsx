import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/formContainer';
import { useFeePaymentMutation, useStdPaymentDtlQuery } from '../../slices/paymentApiSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

import './FeePayment.css';

const FeePayment = () => {
    const [amount, setAmount] = useState('');
    const [isPaid, setIsPaid] = useState(false); // State to track if fee is paid
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    const studentId = userInfo._id;
    const { data: student, isLoading: studentloading } = useStdPaymentDtlQuery(studentId);
    const year = new Date().getFullYear();
    const [FeePayment, { isLoading }] = useFeePaymentMutation();

    useEffect(() => {
        setAmount(5000);
    }, []);

    const [feeDetails, setFeeDetails] = useState(null);
    const { data: feeDetailData, isLoadings, error, refetch } = useStdPaymentDtlQuery(studentId);
    if (isLoadings) {
        return <p>Loading...</p>;
    }
    useEffect(() => {
        if (feeDetailData) {
            setFeeDetails(feeDetailData);
        }
    }, [feeDetailData]);

    useEffect(() => {
        if (isPaid) {
            refetch(); // Refetch fee details after payment
        }
    }, [isPaid, refetch]);

    const displayRazorpay = async () => {
        try {
            const options = {
                key: 'rzp_test_PicapxCZgTdIJB',
                amount: parseFloat(amount) * 100,
                currency: "INR",
                name: "Little Fox",
                description: "Fee Transaction",
                handler: async function (response) {
                    handlePaymentSuccess(response);
                },
                prefill: {
                    name: "Soumya Dey",
                    email: "SoumyaDey@example.com",
                    contact: "9999999999",
                },
                notes: {
                    address: "Soumya Dey Corporate Office",
                },
                theme: {
                    color: "#61dafb",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error('Error:', error);
            setErrors('Error: ' + error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        displayRazorpay();
    };

    const handlePaymentSuccess = async (response) => {
        const data = {
            paymentdtl: response,
            amount: amount,
            studentId: userInfo,
            description: "Fee Transaction",
            currency: "INR"
        };
        const res = await FeePayment(data);
        if (res.data.isPaid) {
            setIsPaid(true);
            navigate('/studFee');
            toast.success('Fee paid successfully');
        }
    };

    return (
        <FormContainer>
            {feeDetails ? (
                <div>
                    <h2 className='mb-4 text-center'>Fee Paid History</h2>
                    <div className="fee-history-box">
                        <div className='mb-4 p-3 rounded d-flex flex-column' key={feeDetails._id}>
                            <p>Amount: {feeDetails.amount} </p>
                            <p>Description: {feeDetails.description}</p>
                            <p>Payment Date: {new Date(feeDetails.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <Form onSubmit={handleSubmit}>
                    <div className="payment-details-box">
                        <h5>One time Fee</h5>
                        <Form.Group className='my-5' controlId='amount'>
                            <Form.Label className="bold-label">Payment for {year}</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter amount'
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </Form.Group>
                        <Button style={{ background: 'linear-gradient(to right, red, orange)' }} type="submit">Pay Now</Button>
                    </div>
                </Form>
            )}
        </FormContainer>
    );
};

export default FeePayment;
