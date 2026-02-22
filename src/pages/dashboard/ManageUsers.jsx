import { useState, useEffect } from 'react';
import { Table, Button, Spinner, Modal, Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      let url = 'https://dummyjson.com/users?limit=10';
      if (search) {
        url = `https://dummyjson.com/users/search?q=${search}&limit=10`;
      }
      const res = await axios.get(url);
      setUsers(res.data.users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this user?')) {
      try {
        await axios.delete(`https://dummyjson.com/users/${id}`);
        setUsers(users.filter(u => u.id !== id));
        alert('User deleted');
      } catch (error) {
         console.error(error);
      }
    }
  };

  const handleShow = (user = null) => {
    if (user) {
      setCurrentUser(user);
      setIsEditing(true);
    } else {
      setCurrentUser({ firstName: '', lastName: '', email: '', username: '' });
      setIsEditing(false);
    }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`https://dummyjson.com/users/${currentUser.id}`, currentUser);
        setUsers(users.map(u => u.id === currentUser.id ? { ...u, ...currentUser } : u));
        alert('User updated');
      } else {
        const res = await axios.post('https://dummyjson.com/users/add', currentUser);
        setUsers([{...res.data, id: Date.now()}, ...users]);
        alert('User added');
      }
      setShowModal(false);
    } catch (error) {
       console.error(error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Manage Users</h4>
        <Button variant="primary" onClick={() => handleShow()}>Add New User</Button>
      </div>

      <InputGroup className="mb-3 w-50">
        <Form.Control
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>

      {loading ? <Spinner animation="border" className="d-block mx-auto mt-5" /> : (
        <Table responsive striped bordered hover className="shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>
                  <img src={u.image} alt={u.username} style={{width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px'}} />
                  {u.firstName} {u.lastName}
                </td>
                <td>{u.email}</td>
                <td>{u.username}</td>
                <td>
                  <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShow(u)}>Edit</Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(u.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleSave}>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? 'Edit User' : 'Add User'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
               <Form.Label>First Name</Form.Label>
               <Form.Control required value={currentUser.firstName || ''} onChange={e => setCurrentUser({...currentUser, firstName: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
               <Form.Label>Last Name</Form.Label>
               <Form.Control required value={currentUser.lastName || ''} onChange={e => setCurrentUser({...currentUser, lastName: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
               <Form.Label>Email</Form.Label>
               <Form.Control type="email" required value={currentUser.email || ''} onChange={e => setCurrentUser({...currentUser, email: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
               <Form.Label>Username</Form.Label>
               <Form.Control required value={currentUser.username || ''} onChange={e => setCurrentUser({...currentUser, username: e.target.value})} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Save Changes</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageUsers;
