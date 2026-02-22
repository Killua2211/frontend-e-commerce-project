import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Row, Col, Nav, Card } from 'react-bootstrap';
import ManageProducts from './ManageProducts';
import ManageCarts from './ManageCarts';
import ManageUsers from './ManageUsers';

const DashboardSummary = () => (
  <Card body className="text-center py-5 shadow-sm">
    <h3>Welcome to the Dashboard</h3>
    <p className="text-muted">Select an option from the sidebar to manage your store's resources.</p>
  </Card>
);

const Dashboard = () => {
  const location = useLocation();

  return (
    <Row className="mt-4">
      <Col md={3} className="mb-4">
        <Card className="shadow-sm">
          <Card.Header as="h5">Dashboard Menu</Card.Header>
          <Nav variant="pills" className="flex-column p-2">
            <Nav.Item>
              <Nav.Link as={Link} to="/dashboard" active={location.pathname === '/dashboard'}>
                Overview
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/dashboard/products" active={location.pathname === '/dashboard/products'}>
                Manage Products
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/dashboard/carts" active={location.pathname === '/dashboard/carts'}>
                Manage Carts
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/dashboard/users" active={location.pathname === '/dashboard/users'}>
                Manage Users
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card>
      </Col>
      <Col md={9}>
        <Routes>
          <Route path="/" element={<DashboardSummary />} />
          <Route path="/products" element={<ManageProducts />} />
          <Route path="/carts" element={<ManageCarts />} />
          <Route path="/users" element={<ManageUsers />} />
        </Routes>
      </Col>
    </Row>
  );
};

export default Dashboard;
