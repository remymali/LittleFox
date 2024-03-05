import React, { useState, useEffect } from 'react';
import { useStdPaymentDtlQuery } from '../../slices/paymentApiSlice';
import { useSelector } from 'react-redux';
import FormContainer from '../../components/formContainer';

const FeeHistory = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const studentId = userInfo._id;
    
    const [feeDetails, setFeeDetails] = useState([]);
    const { data: feeDetailData, isLoading, error } = useStdPaymentDtlQuery(studentId);
    console.log("feeDetailData", feeDetailData);

    useEffect(() => {
        if (feeDetailData) {
            setFeeDetails(feeDetailData);
        }
    }, [feeDetailData]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>No fee details found for the student.</p>;
    }

    return (
        <FormContainer>
            <h2 className='mb-4 text-center'>Fee Paid History</h2>
            
            {feeDetails && feeDetails.status ? (
                <div>
                    <div className='mb-4 p-3 rounded d-flex flex-column' key={feeDetails._id}>
                        <p>Amount: {feeDetails.amount} </p>
                        <p>Description: {feeDetails.description}</p>
                        <p>Payment Date: {new Date(feeDetails.date).toLocaleDateString()}</p>
                        {/* Add more fields as needed */}
                    </div>
                </div>
            ) : (
                <p>No fee details found for the student.</p>
            )}
        </FormContainer>
    );
};

export default FeeHistory;
