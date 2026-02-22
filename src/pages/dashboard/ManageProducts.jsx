import { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert, Modal, Form, Badge } from 'react-bootstrap';
import axios from 'axios';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://dummyjson.com/products?limit=10');
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`https://dummyjson.com/products/${id}`);
        setProducts(products.filter(p => p.id !== id));
        alert('Product deleted successfully (Mock)');
      } catch (error) {
         console.error(error);
      }
    }
  };

  const handleShow = (product = null) => {
    if (product) {
      setCurrentProduct(product);
      setIsEditing(true);
    } else {
      setCurrentProduct({ title: '', price: '', category: '' });
      setIsEditing(false);
    }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const res = await axios.put(`https://dummyjson.com/products/${currentProduct.id}`, currentProduct);
        setProducts(products.map(p => p.id === currentProduct.id ? { ...p, ...currentProduct } : p));
        alert('Product updated!');
      } else {
        const res = await axios.post('https://dummyjson.com/products/add', currentProduct);
        setProducts([{...res.data, id: Date.now()}, ...products]);
        alert('Product added!');
      }
      setShowModal(false);
    } catch (error) {
       console.error(error);
    }
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Manage Products</h4>
        <Button variant="primary" onClick={() => handleShow()}>Add New Product</Button>
      </div>

      <Table responsive striped bordered hover className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td className="text-truncate" style={{ maxWidth: '200px' }}>{p.title}</td>
              <td><Badge bg="secondary">{p.category}</Badge></td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td>
                <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShow(p)}>Edit</Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(p.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleSave}>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? 'Edit Product' : 'Add Product'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" required value={currentProduct.title || ''} onChange={(e) => setCurrentProduct({...currentProduct, title: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" step="0.01" required value={currentProduct.price || ''} onChange={(e) => setCurrentProduct({...currentProduct, price: parseFloat(e.target.value)})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" required value={currentProduct.category || ''} onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value})} />
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

export default ManageProducts;
