import { Container, Table, Button, Alert, Row, Col, Card, Badge } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const CartPage = () => {
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();

  if (!user) {
    return <Container className="my-5"><Alert variant="warning">Please login to view your cart.</Alert></Container>;
  }

  if (cartItems.length === 0) {
    return <Container className="my-5"><h4>Your cart is empty.</h4></Container>;
  }

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Your Cart</h2>
        <Button variant="outline-danger" onClick={clearCart}>Clear Cart</Button>
      </div>
      
      <Card className="mb-4 shadow-sm border-0">
        <Card.Header className="d-flex justify-content-between align-items-center bg-white border-bottom-0 pt-3 px-4">
          <span className="fs-5 fw-bold">Local Cart</span>
          <Badge bg="primary" className="fs-6 py-2 px-3">Total Items: {totalQuantity}</Badge>
        </Card.Header>
        <Card.Body className="px-4">
          <Table responsive hover className="align-middle">
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <img src={item.thumbnail} alt={item.title} style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '8px', border: '1px solid #eee' }} />
                      <span className="fw-medium">{item.title}</span>
                    </div>
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <span className="px-3 py-1 bg-light rounded">{item.quantity}</span>
                  </td>
                  <td className="fw-semibold">${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    {/* Simplified for demo. Can add remove specific item if needed. */}
                    <span className="text-muted">In Cart</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Row className="mt-4">
            <Col md={{ span: 5, offset: 7 }}>
              <Card className="border-0 bg-light rounded-3">
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between mb-3 fs-5">
                    <span className="text-muted">Subtotal:</span>
                    <strong className="text-dark">${subtotal.toFixed(2)}</strong>
                  </div>
                  <Button variant="primary" size="lg" className="w-100 fw-bold shadow-sm" onClick={() => alert('Proceeding to checkout (Mock)')}>
                    Proceed to Checkout
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CartPage;
