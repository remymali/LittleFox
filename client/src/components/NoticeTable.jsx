import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// Assuming you have these API hooks defined elsewhere
import { useListNoticeQuery, useEditNoticeMutation } from '../slices/noticeApiSlice';
import './Table.css';
const NoticeTable = () => {
    const { data: notices, isLoading, error, refetch } = useListNoticeQuery();
    console.log('notice',notices)

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNotices, setFilteredNotices] = useState([]);

    const [editedNoticeId, setEditedNoticeId] = useState(null);
    const [editedNoticeData, setEditedNoticeData] = useState({});
    const [editNotice, { isLoading: isEditing }] = useEditNoticeMutation();
    useEffect(() => {
        refetch();
    }, [refetch]);
    
    useEffect(() => {
        if (!isLoading && !error) {
            const filteredResults = notices.filter((item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.details.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredNotices(filteredResults);
        }
    }, [searchQuery, notices, isLoading, error]);
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentNotices = filteredNotices?.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handleEditNotice = async (noticeId) => {
        try {
            console.log("noticeId",noticeId)
            console.log("editedNoticeData",editedNoticeData)
            const response = await editNotice({
                id: noticeId,
                data: editedNoticeData
            }).unwrap(); // Ensure the promise is resolved and errors are caught
            console.log("Notice edited:", response); // Log the response for debugging
            setEditedNoticeId(null); // Exit edit mode
            setEditedNoticeData({}); // Reset edited notice data
            refetch(); // Refresh data
        } catch (error) {
            console.error("Failed to edit notice:", error); // Log any errors for debugging
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>An error occurred.</p>;

    return (
        <div>
             <div className='Search-Container'>
             <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by title or details..."
            />
    </div>
            <table className="users-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Details</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {
                    (isLoading || error) ? (
                        <tbody>
                            <tr>
                                <td>{isLoading ? 'Loading...' : 'Error...'}</td>
                                <td>{isLoading ? 'Loading...' : 'Error...'}</td>
                                <td>{isLoading ? 'Loading...' : 'Error...'}</td>
                                <td>{isLoading ? 'Loading...' : 'Error...'}</td>
                                <td>{isLoading ? 'Loading...' : 'Error...'}</td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody>
                            {currentNotices && currentNotices?.map((notice) => (
                                <tr key={notice._id}>
                                    
                                    <td>
                                        {editedNoticeId === notice._id ? (
                                            <input
                                                type="text"
                                                value={editedNoticeData.title || notice.title}
                                                onChange={(e) => setEditedNoticeData({ ...editedNoticeData, title: e.target.value })}
                                            />
                                        ) : (
                                            notice.title
                                        )}
                                    </td>
                                    <td>
                                        {editedNoticeId === notice._id ? (
                                            <input
                                                type="text"
                                                value={editedNoticeData.details || notice.details}
                                                onChange={(e) => setEditedNoticeData({ ...editedNoticeData, details: e.target.value })}
                                            />
                                        ) : (
                                            notice.details
                                        )}
                                    </td>
                                    <td>
                                        {editedNoticeId === notice._id ? (
                                            <button onClick={() => handleEditNotice(notice._id)}>Save</button>
                                        ) : (
                                            <>
                                                <button onClick={() => { setEditedNoticeId(notice._id); setEditedNoticeData({ title: notice.title, details: notice.details }); }}>Edit</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )
                }
            </table>
            {/* Pagination */}
     <ul className="pagination">
        {Array.from({ length: Math.ceil(filteredNotices?.length / itemsPerPage) }, (_, i) => (
          <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
            <button onClick={() => paginate(i + 1)} className="page-link">
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
        </div>
    );
};

export default NoticeTable;
