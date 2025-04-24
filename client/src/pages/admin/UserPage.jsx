import React, { useEffect, useState } from 'react';
import { deleteUser, listUsers } from '../../services/AdminServices'; // Import deleteUser function
import { toast } from 'react-toastify';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for fetching users
  const [error, setError] = useState(null); // Error state for handling delete errors

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await listUsers();
        const filteredUsers = res.data
          .filter(user => user.role === "user")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setUsers(filteredUsers);
      } catch (err) {
        console.error(err);
        setError('Error fetching users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    const time = date.toTimeString().split(" ")[0];
    return `${formattedDate}, ${time}`;
  };

  const handleDelete = async (userId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this user?");
      if (!confirmDelete) return;

      await deleteUser(userId);
      setUsers(users.filter((user) => user._id !== userId));
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  return (
    <div className="text-white font-serif">
      <div className=" text-black space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-black">Users</h2>
          {loading ? (
            <div className="text-center py-4">
              <div className="inline-block w-6 h-6 border-4 border-t-transparent border-primary border-solid rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <table className="w-full text-left border border-black bg-white mt-5">
              <thead className="bg-gray-400 text-black font-bold">
                <tr>
                  <th className="p-2 border border-black">User</th>
                  <th className="p-2 border border-black">Email</th>
                  <th className="p-2 border border-black">Created At</th>
                  <th className="p-2 border border-black">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="bg-white border border-black">
                    <td className="p-2 border border-black text-black">{user?.name}</td>
                    <td className="p-2 border border-black text-black">{user?.email}</td>
                    <td className="p-2 border border-black text-black">{formatDate(user?.createdAt)}</td>
                    <td className="p-2 border border-black text-black">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminUsersPage;



