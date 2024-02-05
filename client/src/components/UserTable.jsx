/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useGetUsersQuery, useDisableUserMutation,useEnableUserMutation, useEditUserMutation } from '../slices/adminApiSlice.js';
import './UsersTable.css';
import { useSelector } from 'react-redux';

const UserTable = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  console.log(users)
  useEffect(() => {
    refetch();
  }, [refetch]);

  const [editedUserId, setEditedUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  const [disableUser, { isLoading: isBlocking }] = useDisableUserMutation();
  const [enableUser, { isLoading: isNonBlocking }] = useEnableUserMutation();
  const [disableStatusChanged, setDisableStatusChanged] = useState(false);
  const [enableStatusChanged, setEnableStatusChanged] = useState(false);

  
  useEffect(()=>{

    refetch()
  },[disableStatusChanged])

  useEffect(()=>{
    refetch()
  },[enableStatusChanged])

  const handleDisableUser = (userId) => {
    if (window.confirm('Are you sure you want to disable this user?')) {
      disableUser(userId).unwrap().
      then(()=>{
        setDisableStatusChanged(prevState => !prevState)
      })
      .catch((error)=>{
        console.log("Error disabling user:", error);
      })
    }
  };

 const handleEnableUser=(userId)=>{
  if (window.confirm('Are you sure you want to enable this user?')) {
    enableUser(userId).unwrap().then(()=>{
      setEnableStatusChanged(prevState => !prevState)
    })
    .catch((error)=>{
      console.log("Error enabling user:", error);
    })
  }
 }

  const handleEditUser = async (userId, updatedUserData) => {
    const data = await editUser({ id: userId, data: updatedUserData }).unwrap();
    console.log(data);
    setEditedUserId(null);
    setEditedUserData({});
    refetch();
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
            {users.map((user) => (
              <tr key={user._id}>
                <td><pre>{user._id}</pre></td>
                <td>
                  {editedUserId === user._id ? (
                    <input
                      type="text"
                      value={editedUserData.name || user.name}                      
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
                    <input
                      type="text"
                      value={editedUserData.profileImg || user.profileImg}
                      onChange={(e) => setEditedUserData({ ...editedUserData, profileImg: e.target.value })}
                    />
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
                      <button onClick={() => setEditedUserId(user._id)} disabled={userInfo._id === user._id}>Edit</button>
                      {!user.isBlocked?(
                      <button onClick={() => handleDisableUser(user._id)} disabled={isBlocking || userInfo._id === user._id}>
                      Disable
                      </button>):(
                      <button onClick={() => handleEnableUser(user._id)} disabled={isNonBlocking || userInfo._id === user._id}>
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
  );
};

export default UserTable;