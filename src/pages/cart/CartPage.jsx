import { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Spinner, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const CartPage = () => {
  const { user } = useAuth();
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        if (!user) return;
        // Fetch cart by user id. User id is part of the auth object from DummyJSON
        const res = await axios.get(`https://dummyjson.com/carts/user/${user.id}`);
        setCarts(res.data.carts);
      } catch (err) {
        setError('Failed to fetch carts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCarts();
  }, [user]);

  if (!user) {
    return <Container className="my-5"><Alert variant="warning">Please login to view your cart.</Alert></Container>;
  }

  if (loading) {
    return (
      <Container className="d-flex justify-content-center my-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return <Container className="my-5"><Alert variant="danger">{error}</Alert></Container>;
  }

  if (carts.length === 0) {
    return <Container className="my-5"><h4>Your cart is empty.</h4></Container>;
  }

  return (
    <Container className="my-5">
      <h2>Your Carts</h2>
      {carts.map(cart => (
        <Card key={cart.id} className="mb-4 shadow-sm">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <span>Cart #{cart.id}</span>
            <Badge bg="info">Total Items: {cart.totalQuantity}</Badge>
          </Card.Header>
          <Card.Body>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.products.map(item => (
                  <tr key={item.id}>
                    <td>
                       <div className="d-flex align-items-center gap-3">
                         <img src={item.thumbnail} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                         {item.title}
                       </div>
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>${item.total.toFixed(2)}</td>
                    <td>
                      <Button variant="outline-danger" size="sm">Remove</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Row className="mt-3">
              <Col md={{ span: 5, offset: 7 }}>
                <Card bg="light">
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal:</span>
                      <strong>${cart.discountedTotal.toFixed(2)}</strong>
                    </div>
                    <Button variant="success" className="w-100 mt-2">Proceed to Checkout</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};
  
// Need to add Badge to imports
import { Badge } from 'react-bootstrap';
export default CartPage;
