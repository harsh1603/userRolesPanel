import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

interface Role {
  id: number;
  name: string;
}

const UserForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [roles, setRoles] = useState<string[]>([]);
  const [availableRoles] = useState(['Administrator', 'Subscriber', 'Editor', 'Author']);
  const navigate = useNavigate();

   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      api.post('/users', { full_name: fullName, email, roles });
      navigate('/users');
    } catch (err: any) {
      console.error(err.response?.data);
    }
  };

  const handleRoleChange = (role: string) => {
    setRoles(prev =>
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

  return (
    <div className="container mt-5">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter full name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Select Roles</label>
          <div className="form-check">
            {availableRoles.map(role => (
              <div key={role} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={role}
                  checked={roles.includes(role)}
                  onChange={() => handleRoleChange(role)}
                />
                <label htmlFor={role} className="form-check-label">
                  {role}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
