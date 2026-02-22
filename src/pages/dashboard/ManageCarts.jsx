import { useState, useEffect } from 'react';
import { Table, Button, Spinner, Badge } from 'react-bootstrap';
import axios from 'axios';

const ManageCarts = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const res = await axios.get('https://dummyjson.com/carts?limit=10');
        setCarts(res.data.carts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCarts();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Delete this cart?')) {
      try {
         await axios.delete(`https://dummyjson.com/carts/${id}`);
         setCarts(carts.filter(c => c.id !== id));
         alert('Cart deleted (Mock)');
      } catch (error) {
         console.error(error);
      }
    }
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Manage Carts</h4>
        <Button variant="primary" onClick={() => alert('Mock Add Cart Endpoint')}>Create New Cart</Button>
      </div>

      <Table responsive striped bordered hover className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Cart ID</th>
            <th>User ID</th>
            <th>Total Items</th>
            <th>Total Quantity</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {carts.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>User #{c.userId}</td>
              <td>{c.totalProducts}</td>
              <td><Badge>{c.totalQuantity}</Badge></td>
              <td>${c.total.toFixed(2)}</td>
              <td>
                <Button variant="outline-primary" size="sm" className="me-2" onClick={() => alert(`View/Edit Cart ${c.id}`)}>Edit</Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(c.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageCarts;
