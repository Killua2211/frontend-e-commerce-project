import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Row, Col, Nav, Card } from 'react-bootstrap';
import ManageProducts from './ManageProducts';
import ManageCarts from './ManageCarts';
import ManageUsers from './ManageUsers';

const DashboardSummary = () => (
  <Card body className="text-center py-5 shadow-sm border-0" style={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)' }}>
    <h3 className="fw-bold mb-3">Welcome to the Dashboard</h3>
    <p className="text-muted fs-5">Select an option from the sidebar to manage your store's resources.</p>
  </Card>
);

const Dashboard = () => {
  const location = useLocation();

  return (
    <Row className="mt-4">
      <Col md={3} className="mb-4">
        <div className="p-4 rounded-4 shadow-sm h-100" style={{ background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.4)' }}>
          <h5 className="fw-bold mb-4 px-3 text-dark letter-spacing-tight">Dashboard Menu</h5>
          <Nav variant="pills" className="flex-column gap-2">
            <Nav.Item>
              <Nav.Link as={Link} to="/dashboard" active={location.pathname === '/dashboard'} className="dashboard-link">
                <span className="me-2">📊</span> Overview
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/dashboard/products" active={location.pathname === '/dashboard/products'} className="dashboard-link">
                <span className="me-2">🛍️</span> Manage Products
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/dashboard/carts" active={location.pathname === '/dashboard/carts'} className="dashboard-link">
                <span className="me-2">🛒</span> Manage Carts
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/dashboard/users" active={location.pathname === '/dashboard/users'} className="dashboard-link">
                <span className="me-2">👥</span> Manage Users
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
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
