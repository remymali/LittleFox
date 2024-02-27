/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useGetClassQuery,useEditClassMutation } from '../slices/classApiSlice.js';
import { useGetTeachersQuery } from '../slices/adminApiSlice.js';
import './Table.css';
import { useSelector } from 'react-redux';

const ClassTable = () => {
  const { userInfo } = useSelector((state) => state.auth);
  
  const { data: sclass, isLoading, error,refetch } = useGetClassQuery();
  const { data: teachers, isLoading: teachersLoading } = useGetTeachersQuery();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2); // Number of items per page

  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  // Calculate index of the last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate index of the first item on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get the current items to display
  const currentItems = filteredItems?.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };
  useEffect(() => {
    if (!isLoading && !error) {
      const filteredResults = sclass.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.division.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filteredResults);
    }
  }, [searchQuery, sclass, isLoading, error]);
  
  

  // Get items to display after applying search filter
  const searchedItems = filteredItems?.slice(indexOfFirstItem, indexOfLastItem);
  console.log("teachers", teachers)
  useEffect(() => {
    refetch();
  }, [refetch]);

  const [editedClassId, setEditedClassId] = useState(null);
  const [editedClassData, setEditedClassData] = useState({});
  // const [deleteClass, { isLoading: isDeleting }] = useDeleteClassMutation();
  const [editClass, { isLoading: isEditing }] = useEditClassMutation();

  const handleDeleteClass = (classId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteClass(classId).unwrap();
    }
  };

  const handleEditClass = async (classId, updatedClassData) => {
    const data = await editClass({ id: classId, data: updatedClassData }).unwrap();
    console.log(data);
    setEditedClassId(null);
    setEditedClassData({});
    refetch();
  };

  if (isLoading || error) {
    return (
      <table className="Teachers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Division</th>
            <th>Teacher</th>
            <th>Action</th>
          </tr>
        </thead>

      </table>
    )
  }

  return (
    <div>
      {/* Search input field */}
      <div className='Search-Container'>
    <input
      type="text"
      value={searchQuery}
      onChange={handleSearchChange}
      placeholder="Search by name or division..."
      className='search-input'
    />
    </div>
    <table className="Teachers-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Division</th>
          <th>Teacher</th>
          <th>Action</th>
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
            {currentItems && currentItems.map((user) => (
              <tr key={user._id}>
                <td><pre>{user._id}</pre></td>
                <td>
                  {editedClassId === user._id ? (
                    <input
                      type="text"
                      value={editedClassData.name || user.name}
                      onChange={(e) => setEditedClassData({ ...editedClassData, name: e.target.value })}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editedClassId === user._id ? (
                    <input
                      type="text"
                      value={editedClassData.division || user.division}
                      onChange={(e) => setEditedClassData({ ...editedClassData, division: e.target.value })}
                    />
                  ) : (
                    user.division
                  )}
                </td>
                <td>
                  {editedClassId === user._id ? (
                    <select
                      value={editedClassData.teacher || user.teacher}
                      onChange={(e) => setEditedClassData({ ...editedClassData, teacher: e.target.value })}
                    >
                      <option value="">Select Teacher</option>
                      {teachers.map((teacher) => (
                        <option key={teacher._id} value={teacher._id}>
                          {teacher.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    // Display the teacher's name
                    teachersLoading ? 'Loading...' : (
                      teachers.find((teacher) => teacher._id === user.teacher)?.name || 'Unknown'
                    )
                  )}
                </td>

                <td>
                  {editedClassId === user._id ? (
                    <button
                      onClick={() => handleEditClass(user._id, editedClassData)}
                      disabled={isEditing}
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button onClick={() => setEditedClassId(user._id)} disabled={userInfo._id === user._id}>Edit</button>
                      {/* <button onClick={() => handleDelete(user._id)} disabled={isDeleting || userInfo._id === user._id}>
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
        {Array.from({ length: Math.ceil(filteredItems?.length / itemsPerPage) }, (_, i) => (
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

export default ClassTable;