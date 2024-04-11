import { useState, useEffect } from 'react';
import { useGetStudentsQuery } from '../../slices/teacherApiSlice.js';
import './StudentList.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserTable = () => {
  const { userInfo } = useSelector((state) => state.auth);
   
    const email=userInfo.email
    console.log("email",email)
  const navigate = useNavigate();
  const { data: users, isLoading, error, refetch } = useGetStudentsQuery(email);
  console.log("users", users);
  useEffect(() => {
    refetch();
  }, [refetch]);

  const [editedUserId, setEditedUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});

  const handleview = async (userId) => {
    console.log("userId", userId);
    navigate(`/exam/${userId}`);
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
    );
  }

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
              <button onClick={() => handleview(user._id)}>Add Marks</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
