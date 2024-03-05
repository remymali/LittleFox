import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/formContainer';
import { useFeePaymentMutation, useStdPaymentDtlQuery } from '../../slices/paymentApiSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

const FeePayment = () => {
    const [amount, setAmount] = useState('');
    const navigate = useNavigate();
    const [isPaid, setIsPaid] = useState(false);
    const [errors, setErrors] = useState('');
    const [FeePayment, { isLoading }] = useFeePaymentMutation();

    const { userInfo } = useSelector((state) => state.auth);
    const studentId = userInfo._id
    const { data: student, isLoading: studentloading } = useStdPaymentDtlQuery(studentId)
    console.log("student",student)
    

    useEffect(() => {
        setAmount(5000)
    }, [])

    const displayRazorpay = async () => {
        try {
            const options = {
                key: 'rzp_test_PicapxCZgTdIJB',
                amount: parseFloat(amount) * 100,
                currency: "INR",
                name: "Little Fox",
                description: "Fee Transaction",
                handler: async function (response) {
                    const data = {
                        paymentdtl: response,
                        amount: amount,
                        studentId: userInfo,
                        description: "Fee Transaction",
                        currency: "INR"
                    }
                    // alert('Payment successful: ' + response.razorpay_payment_id);
                    const res = await FeePayment(data)
                    console.log("res",res.data.isPaid)
                    if (res.data.isPaid) {                        
                        navigate('/studFee')
                        toast.success('Fee paid successfully');
                    }
                   
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

    return (
    <FormContainer>
        <h2>Make Payment</h2>
        {student ? (
            <p>Student already paid fee.</p>
        ) : (
            <Form onSubmit={handleSubmit}>
                <Form.Group className='my-2' controlId='amount'>
                    <Form.Label className="bold-label">Fee</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter amount'
                        value={amount}
                    />
                </Form.Group>
                <Button style={{ background: 'linear-gradient(to right, red, orange)' }} type="submit">Pay Now</Button>
            </Form>
        )}
        {errors && <p className="text-danger">{errors}</p>}
    </FormContainer>
);
};

export default FeePayment;
