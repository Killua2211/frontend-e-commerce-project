import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(res.data);
        setActiveImage(res.data.images[0]);
      } catch (err) {
        setError('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center my-5"><Spinner animation="border" /></div>;
  if (error) return <Container className="my-5"><Alert variant="danger">{error}</Alert></Container>;
  if (!product) return null;

  const handleAddToCart = () => {
    // Basic mock logic for adding to cart
    if (!user) {
      alert("Please login to add to cart");
      return;
    }
    alert(`Added ${product.title} to cart successfully! (Mock functionality)`);
  };

  return (
    <Container className="my-5">
      <Link to="/" className="btn btn-outline-secondary mb-4">&larr; Back to Products</Link>
      <Row>
        <Col md={6} className="mb-4">
          <div className="bg-light p-3 rounded text-center mb-3">
            <Image src={activeImage} fluid style={{ maxHeight: '400px', objectFit: 'contain' }} />
          </div>
          <div className="d-flex gap-2 overflow-auto pb-2">
            {product.images.map((img, idx) => (
              <Image 
                key={idx} 
                src={img} 
                thumbnail 
                style={{ width: '80px', height: '80px', cursor: 'pointer', objectFit: 'contain', borderColor: activeImage === img ? '#0d6efd' : '#dee2e6' }}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
        </Col>
        <Col md={6}>
          <h2>{product.title}</h2>
          <div className="d-flex align-items-center mb-3 gap-3">
            <Badge bg="info" className="fs-6">{product.category}</Badge>
            <span className="text-warning fs-5">★ {product.rating}</span>
            <span className="text-muted">({product.reviews?.length || 0} reviews)</span>
          </div>
          <h3 className="text-primary mb-3">${product.price.toFixed(2)}</h3>
          
          <p className="lead">{product.description}</p>
          
          <ul className="list-unstyled">
            <li><strong>Brand:</strong> {product.brand || 'N/A'}</li>
            <li><strong>Stock:</strong> {product.stock > 0 ? `${product.stock} available` : 'Out of Stock'}</li>
            <li><strong>SKU:</strong> {product.sku}</li>
            <li><strong>Warranty:</strong> {product.warrantyInformation}</li>
            <li><strong>Shipping:</strong> {product.shippingInformation}</li>
          </ul>

          <div className="d-grid gap-2 mt-4">
            <Button variant="primary" size="lg" onClick={handleAddToCart} disabled={product.stock === 0}>
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
