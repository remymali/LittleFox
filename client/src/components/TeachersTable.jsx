/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useGetTeachersQuery, useEditTeacherMutation } from '../slices/adminApiSlice.js';
import './Table.css';
import { useSelector } from 'react-redux';

const TeachersTable = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: teachers, isLoading, error, refetch } = useGetTeachersQuery();
  console.log(teachers)
  const stars=[]
  useEffect(() => {
    refetch();
  }, [refetch]);

  const [editedTeacherId, setEditedTeacherId] = useState(null);
  const [editedTeacherData, setEditedTeacherData] = useState({});
  const [editTeacher, { isLoading: isEditing }] = useEditTeacherMutation();

  // const handleDeleteTeacher = (teacherId) => {
  //   if (window.confirm('Are you sure you want to delete this user?')) {
  //       deleteTeacher(teacherId).unwrap();
  //   }
  // };

  const handleEditTeacher = async (teacherId, updatedTeacherData) => {
    const data = await editTeacher({ id: teacherId, data: updatedTeacherData }).unwrap();
    console.log(data);
    setEditedTeacherId(null);
    setEditedTeacherData({});
    refetch();
  };
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);

  // Filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page when search query changes
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;


  useEffect(() => {
    if (!isLoading && !error) {
      const filteredResults = teachers.filter((teacher) =>
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTeachers(filteredResults);
    }
  }, [searchQuery, teachers, isLoading, error]);
  const currentTeachers = filteredTeachers?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  if (isLoading || error) {
    return (
      <table className="Teachers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>

      </table>
    )
  }

  return (
    <div>
      <div className='Search-Container'>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name or email..."
          className='search-input'
        />
      </div>
      <table className="Teachers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Rating</th>
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
              </tr>
            </tbody>
          ) : (
            <tbody>
              {currentTeachers && currentTeachers?.map((user) => (
                <tr key={user._id}>

                  <td>
                    {editedTeacherId === user._id ? (
                      <input
                        type="text"
                        value={editedTeacherData.name || user.name}
                        onChange={(e) => setEditedTeacherData({ ...editedTeacherData, name: e.target.value })}
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td>
                    {editedTeacherId === user._id ? (
                      <input
                        type="text"
                        value={editedTeacherData.email || user.email}
                        onChange={(e) => setEditedTeacherData({ ...editedTeacherData, email: e.target.value })}
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td>
                      {Array.from({ length: user.averageRating }, (_, i) => (
                        <span key={i} style={{color:'#FFED6F'}}>&#9733;</span>
                      ))}
                      
                  </td>

                  <td>
                    {editedTeacherId === user._id ? (
                      <button
                        onClick={() => handleEditTeacher(user._id, editedTeacherData)}
                        disabled={isEditing}
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <button onClick={() => setEditedTeacherId(user._id)} disabled={userInfo._id === user._id}>Edit</button>
                        {/* <button onClick={() => handleDeleteTeacher(user._id)} disabled={isDeleting || userInfo._id === user._id}>
                        Delete
                      </button> */}
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
        {Array.from({ length: Math.ceil(filteredTeachers?.length / itemsPerPage) }, (_, i) => (
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

export default TeachersTable;