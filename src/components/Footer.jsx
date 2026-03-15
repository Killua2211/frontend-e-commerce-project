import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-premium text-light py-5 mt-auto">
      <Container className="position-relative z-index-1">
        <Row className="gy-4">
          <Col lg={4} md={6}>
            <h5 className="text-uppercase mb-4 font-weight-bold">E-Shop</h5>
            <p>
              Your one-stop destination for premium products. We offer the best quality items with fast shipping and excellent customer service.
            </p>
          </Col>
          <Col lg={2} md={6}>
            <h5 className="text-uppercase mb-4 font-weight-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li className="mb-2"><Link to="/products" className="text-light text-decoration-none">Products</Link></li>
              <li className="mb-2"><Link to="/cart" className="text-light text-decoration-none">Cart</Link></li>
            </ul>
          </Col>
          <Col lg={3} md={6}>
            <h5 className="text-uppercase mb-4 font-weight-bold">Customer Service</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#!" className="text-light text-decoration-none">Contact Us</a></li>
              <li className="mb-2"><a href="#!" className="text-light text-decoration-none">FAQ</a></li>
              <li className="mb-2"><a href="#!" className="text-light text-decoration-none">Returns Policy</a></li>
            </ul>
          </Col>
          <Col lg={3} md={6}>
            <h5 className="text-uppercase mb-4 font-weight-bold">Newsletter</h5>
            <p>Subscribe to our newsletter for the latest updates and offers.</p>
            <div className="input-group mb-3">
              <input type="email" className="form-control" placeholder="Email Address" aria-label="Email Address" />
              <button className="btn btn-primary" type="button">Subscribe</button>
            </div>
          </Col>
        </Row>
        <hr className="my-4 border-secondary" />
        <Row className="align-items-center">
          <Col md={7} lg={8}>
            <p className="text-center text-md-start mb-0 text-muted">
              &copy; {new Date().getFullYear()} E-Shop Amit Learning. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
