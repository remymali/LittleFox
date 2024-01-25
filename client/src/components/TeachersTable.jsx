/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useGetTeachersQuery, useDeleteTeacherMutation, useEditTeacherMutation } from '../slices/adminApiSlice.js';
import './TeachersTable.css';
import { useSelector } from 'react-redux';

const TeachersTable = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: teachers, isLoading, error, refetch } = useGetTeachersQuery();
console.log(teachers)
  useEffect(() => {
    refetch();
  }, [refetch]);

  const [editedTeacherId, setEditedTeacherId] = useState(null);
  const [editedTeacherData, setEditedTeacherData] = useState({});
  const [deleteTeacher, { isLoading: isDeleting }] = useDeleteTeacherMutation();
  const [editTeacher, { isLoading: isEditing }] = useEditTeacherMutation();

  const handleDeleteTeacher = (teacherId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
        deleteTeacher(teacherId).unwrap();
    }
  };

  const handleEditTeacher = async (teacherId, updatedTeacherData) => {
    const data = await editTeacher({ id: teacherId, data: updatedTeacherData }).unwrap();
    console.log(data);
    setEditedTeacherId(null);
    setEditedTeacherData({});
    refetch();
  };

  if (isLoading || error) {
    return (
      <table className="Teachers-table">
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
    <table className="Teachers-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
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
            {teachers.map((user) => (
              <tr key={user._id}>
                <td><pre>{user._id}</pre></td>
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
                      <button onClick={() => handleDeleteTeacher(user._id)} disabled={isDeleting || userInfo._id === user._id}>
                        Delete
                      </button>
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

export default TeachersTable;