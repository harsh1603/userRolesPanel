import React, { useEffect, useState } from 'react';
import  api  from '../api';

interface User {
  id: number;
  full_name: string;
  email: string;
  roles: { name: string }[];
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roleFilter, setRoleFilter] = useState<string>('Administrator');

  useEffect(() => {
    const fetchUsers = () => {
      api.get('/users', {
        params: { role: roleFilter || undefined },
      }).then(res => setUsers(res.data));
    };
    fetchUsers();
  }, [roleFilter]);

  return (
    <div className="container mt-5">
      <h2>User List</h2>

      <div className="mb-3 mt-3">
        <label className="form-label">Filter by Role</label>
        <select
          className="form-select"
          onChange={e => setRoleFilter(e.target.value)}
          value={roleFilter}
        >
          <option value="">All Roles</option>
          <option value="Administrator">Administrator</option>
          <option value="Subscriber">Subscriber</option>
          <option value="Editor">Editor</option>
          <option value="Author">Author</option>
        </select>
      </div>

      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Roles</th>
          </tr>
        </thead>
        <tbody>
          {users.length ? users.map(user => (
            <tr key={user.id}>
              <td>{user.full_name}</td>
              <td>{user.email}</td>
              <td>{user.roles.map(r => r.name).join(', ')}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan={3} className="text-center">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
