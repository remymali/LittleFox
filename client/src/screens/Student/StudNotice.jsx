import React, { useState, useEffect } from 'react';
import { useGetNoticeQuery } from '../../slices/studentApiSlice';
import FormContainer from '../../components/formContainer';
import { useSelector } from 'react-redux';

const StudNotice = () => {
    const {userInfo}=useSelector((state)=>state.auth)
    console.log("email",userInfo.email)
    const [notices, setNotices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 2; // Number of notices per page
    const { data: allNotices, isLoading } = useGetNoticeQuery(userInfo.email);
    console.log("allNotices",allNotices)
    useEffect(() => {
        if (!isLoading && allNotices) {
            setNotices(allNotices);
        }
    }, [isLoading, allNotices]);

    const totalPages = Math.ceil(notices.length / pageSize);

    const paginatedNotices = notices.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <FormContainer>
            <div className="container mt-0">
                <h1 className="mb-4 text-center">Messages</h1>
                {isLoading && <p className="text-center">Loading messages...</p>}
                {!isLoading && notices.length === 0 && <p className="text-center">No messages found.</p>}
                {paginatedNotices.map((notice, index) => (
                    <div key={index} className="mb-4 p-3 border rounded d-flex flex-column">
                        <h4 className="mb-2">{notice.title}</h4>
                        <br />
                        <div className="mb-1">{notice.details}</div>
                        <br />
                        <div className="text-muted mt-auto text-end">Date: {new Date(notice.date).toLocaleDateString()}</div>
                    </div>
                ))}

                {notices.length > 0 && (
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
            </div>
        </FormContainer>
    );
};

export default StudNotice;
