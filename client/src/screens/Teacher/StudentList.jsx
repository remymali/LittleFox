/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useGetStudentsQuery} from '../../slices/teacherApiSlice.js';
import './StudentList.css';
import { useSelector } from 'react-redux';

const UserTable = () => {
  const { userInfo } = useSelector((state) => state.auth);
   
  const email=userInfo.email
  console.log("email",email)
  const { data: users, isLoading, error, refetch } = useGetStudentsQuery(email);
  console.log("users",users)
  useEffect(() => {
    refetch();
  }, [refetch]);

  const [editedUserId, setEditedUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  
 

  const handleview = async (userId, updatedUserData) => {
    // const data = await editUser({ id: userId, data: updatedUserData }).unwrap();
    // console.log(data);
    // setEditedUserId(null);
    // setEditedUserData({});
    // refetch();
  };

  if (isLoading || error) {
    return (
      
      <table className="Teachers-table">
        <thead>
          <tr>
           
            <th>Name</th>
            <th>Email</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>

      </table>
    )
  }

  return (
    <div> 
    <table className="Teachers-table">
      <thead>
        <tr>
          
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
            </tr>
          </tbody>
        ) : (
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
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
                  <button onClick={handleview}>view</button>
                </td>
              </tr>
            ))}
          </tbody>
        )
      }
    </table>
    </div>
  );
};

export default UserTable;