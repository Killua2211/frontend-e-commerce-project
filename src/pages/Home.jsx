import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-dark text-white text-center text-lg-start position-relative overflow-hidden" style={{ padding: '120px 0', minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="position-absolute w-100 h-100 top-0 start-0" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.4) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 40%)'}}></div>
        <Container className="position-relative z-index-1 animate-fade-in">
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4">
                Discover the <span className="text-gradient">Best Products</span> for You
              </h1>
              <p className="lead text-light opacity-75 mb-5 fw-light" style={{ fontSize: '1.25rem' }}>
                Shop our latest collection of premium quality items. Unbeatable prices, fast shipping, and top-tier customer support.
              </p>
              <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                <Button as={Link} to="/products" variant="primary" size="lg" className="px-5 py-3 shadow">
                  Shop Now
                </Button>
                <Button as={Link} to="/register" variant="outline-light" size="lg" className="px-5 py-3">
                  Sign Up
                </Button>
              </div>
            </Col>
            <Col lg={6} className="d-none d-lg-block">
              <div className="position-relative animate-float">
                <div className="position-absolute w-100 h-100 bg-primary rounded-4 opacity-25" style={{ top: '20px', left: '20px', zIndex: 0 }}></div>
                <img 
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Shopping showcase" 
                  className="img-fluid rounded-4 shadow-lg position-relative"
                  style={{ objectFit: 'cover', height: '450px', width: '100%', zIndex: 1 }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Benefits Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="g-4 text-center">
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm bg-white p-4">
                <Card.Body>
                  <div className="mb-3 fs-1 text-primary">🚚</div>
                  <Card.Title className="fw-bold mb-3">Free Shipping</Card.Title>
                  <Card.Text className="text-muted">On all orders over $50. Fast and reliable delivery directly to your door.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm bg-white p-4">
                <Card.Body>
                  <div className="mb-3 fs-1 text-primary">🔒</div>
                  <Card.Title className="fw-bold mb-3">Secure Payment</Card.Title>
                  <Card.Text className="text-muted">We ensure your money is safe and secure with industry-leading encryption.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm bg-white p-4">
                <Card.Body>
                  <div className="mb-3 fs-1 text-primary">⭐</div>
                  <Card.Title className="fw-bold mb-3">Premium Quality</Card.Title>
                  <Card.Text className="text-muted">High-quality materials and craftsmanship guaranteed on every product.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-5 text-center position-relative">
        <Container className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="p-5 rounded-4 shadow-lg" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', border: '1px solid white' }}>
            <h2 className="mb-4 fw-bold display-6">Ready to Start Shopping?</h2>
            <p className="text-muted mb-4 fs-5">Join thousands of satisfied customers today.</p>
            <Button as={Link} to="/products" variant="primary" size="lg" className="px-5 py-3 rounded-pill shadow">
              View All Products
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
