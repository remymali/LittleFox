import { useState, useEffect } from 'react';
import {   useEditSubjectMutation,useGetSubjectQuery} from '../slices/subjectApiSlice.js';
import { useGetTeachersQuery } from '../slices/adminApiSlice.js';
import './Table.css';
import { useSelector } from 'react-redux';

const CommonTable = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: subject, isLoading, error, refetch } = useGetSubjectQuery();
  const { data: teachers, isLoading: teachersLoading } = useGetTeachersQuery();
  console.log("subject", subject)
  useEffect(() => {
    refetch();
  }, [refetch]);

  const [editedClassId, setEditedClassId] = useState(null);
  const [editedClassData, setEditedClassData] = useState({});
  const [editClass, { isLoading: isEditing }] = useEditSubjectMutation();

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
            <th>SubCode</th>
            <th>Teacher</th>
            <th>Action</th>
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
          <th>Subcode</th>
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
            {subject.map((user) => (
              <tr key={user._id}>
                <td><pre>{user._id}</pre></td>
                <td>
                  {editedClassId === user._id ? (
                    <input
                      type="text"
                      value={editedClassData.subName || user.subName}
                      onChange={(e) => setEditedClassData({ ...editedClassData, subName: e.target.value })}
                    />
                  ) : (
                    user.subName
                  )}
                </td>
                <td>
                  {editedClassId === user._id ? (
                    <input
                      type="text"
                      value={editedClassData.subCode || user.subCode}
                      onChange={(e) => setEditedClassData({ ...editedClassData, subCode: e.target.value })}
                    />
                  ) : (
                    user.subCode
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
  );
};


export default CommonTable;
