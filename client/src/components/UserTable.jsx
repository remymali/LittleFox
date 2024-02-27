/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import { useGetUsersQuery, useDisableUserMutation, useEnableUserMutation, useEditUserMutation } from '../slices/adminApiSlice.js';
import './UsersTable.css';
import { useSelector } from 'react-redux';

const UserTable = ({ selectedClass, page, limit }) => {
  console.log("selectedClass", selectedClass);
  const { userInfo } = useSelector((state) => state.auth);
  const { data: users, isLoading, error, refetch } = useGetUsersQuery({ selectedClass, page, limit });
  //Search
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([])
  useEffect(() => {
    if (!isLoading || !error) {
      setFilteredUsers(users)
    }
  }, [isLoading, users, error])
  useEffect(() => {
    if (!isLoading && !error) {
      const filteredResults = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
        || user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredUsers(filteredResults)
    }

  }, [searchQuery, users, isLoading, error])




  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Number of users per page

  // Calculate index of the last user on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  // Calculate index of the first user on the current page
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // Get the current users to display
  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // useEffect(() => {
  //   refetch({ selectedClass, page, limit }); // Update refetch with pagination parameters
  // }, [selectedClass, page, limit]);
  useEffect(() => {
    refetch({ selectedClass, page: currentPage, limit }); // Update refetch with pagination parameters
  }, [selectedClass, currentPage, limit]);


  const [editedUserId, setEditedUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  const [disableUser, { isLoading: isBlocking }] = useDisableUserMutation();
  const [enableUser, { isLoading: isNonBlocking }] = useEnableUserMutation();
  const [disableStatusChanged, setDisableStatusChanged] = useState(false);
  const [enableStatusChanged, setEnableStatusChanged] = useState(false);

  useEffect(() => {
    refetch({ selectedClass, page, limit }); // Update refetch with pagination parameters
  }, [disableStatusChanged, enableStatusChanged, selectedClass, page, limit]);

  const handleDisableUser = (userId) => {
    if (window.confirm('Are you sure you want to disable this user?')) {
      disableUser(userId).unwrap().then(() => {
        setDisableStatusChanged((prevState) => !prevState);
      }).catch((error) => {
        console.log("Error disabling user:", error);
      });
    }
  };

  const handleEnableUser = (userId) => {
    if (window.confirm('Are you sure you want to enable this user?')) {
      enableUser(userId).unwrap().then(() => {
        setEnableStatusChanged((prevState) => !prevState);
      }).catch((error) => {
        console.log("Error enabling user:", error);
      });
    }
  };

  // Handle editing user (assuming editUser is defined elsewhere)
  const [editUser, { isLoading: isEditing }] = useEditUserMutation();

  const handleEditUser = async (userId, updatedUserData) => {
    console.log("userId", userId)
    console.log("updatedUserData", updatedUserData)
    const {name,email,profileImg}=updatedUserData
    console.log("name",name)
    console.log("email",email)
    console.log("file",profileImg)
    const formData=new FormData()
      formData.append('name',name);
      formData.append('email',email);
      formData.append('file',profileImg);
      console.log("formData",formData)
    const data = await editUser({ id: userId, data: formData }).unwrap();
    console.log(data);
    setEditedUserId(null);
    setEditedUserData({});
    refetch({ selectedClass, page, limit }); // Update refetch with pagination parameters
  };

  if (isLoading || error) {
    return (
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

      </table>
    )
  }

  return (
    <div>
      <div className='Search-Container'>
        <input type='text' value={searchQuery} onChange={handleSearchChange} placeholder='Search' className='search-input' />
      </div>
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Photo</th>
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
              {/* {Array.isArray(users) && users.map((user) => ( */}
              {Array.isArray(currentUsers) && currentUsers.map((user) => (
                <tr key={user._id}>
                  <td><pre>{user._id}</pre></td>
                  <td>
                    {editedUserId === user._id ? (
                      <input
                        type="text"
                        value={editedUserData.name || user.name}
                        onChange={(e) => setEditedUserData({ ...editedUserData, name: e.target.value })}
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td>
                    {editedUserId === user._id ? (
                      <input
                        type="text"
                        value={editedUserData.email || user.email}
                        onChange={(e) => setEditedUserData({ ...editedUserData, email: e.target.value })}
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td>
  {editedUserId === user._id ? (
    <>
      {/* Show existing image */}
      <img src={`/profileImg/${user.profileImg}`} alt="Profile" style={{ width: '100px', height: '100px' }} />
      <input
        type="file"
        onChange={(e) => {
          const selectedFile = e.target.files[0];
          if (selectedFile) {
            setEditedUserData({ ...editedUserData, profileImg: selectedFile });
          }
        }}
        style={{ marginTop: '5px' }}
      />
    </>
  ) : (
    <img src={`/profileImg/${user.profileImg}`} alt="Profile" style={{ width: '100px', height: '100px' }} />
  )}
</td>




                  <td>
                    {editedUserId === user._id ? (
                      <button
                        onClick={() => handleEditUser(user._id, editedUserData)}
                        disabled={isEditing}
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <button className="edit" onClick={() => setEditedUserId(user._id)} disabled={userInfo._id === user._id}>Edit</button>
                        {!user.isBlocked ? (
                          <button className="disabled" onClick={() => handleDisableUser(user._id)} disabled={isBlocking || userInfo._id === user._id}>
                            Disable
                          </button>) : (
                          <button className="enabled" onClick={() => handleEnableUser(user._id)} disabled={isNonBlocking || userInfo._id === user._id}>
                            Enable
                          </button>)
                        }
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
      <div className="pagination-container">
        <ul className="pagination">
          {Array.from({ length: Math.ceil(users?.length / usersPerPage) }, (_, i) => (
            <li key={i} className="page-item">
              <button onClick={() => paginate(i + 1)} className="page-link">
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
};

export default UserTable;