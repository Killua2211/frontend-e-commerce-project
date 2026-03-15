import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { Navbar as BsNavbar, Nav, Container, Button, Badge } from 'react-bootstrap';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <BsNavbar bg="transparent" variant="light" expand="lg" className="mb-4 sticky-top navbar-glass py-3">
      <Container>
        <BsNavbar.Brand as={Link} to="/" className="text-gradient fs-3">E-Shop</BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            {user && <Nav.Link as={Link} to="/cart">Cart {cartCount > 0 && <Badge bg="primary">{cartCount}</Badge>}</Nav.Link>}
            {user && <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>}
          </Nav>
          <Nav className="align-items-center">
            {user ? (
              <>
                <BsNavbar.Text className="me-3 fw-bold text-dark">
                  Hi, {user.username}
                </BsNavbar.Text>
                <Button variant="outline-primary" size="sm" onClick={handleLogout} className="rounded-pill px-3">Logout</Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;
