import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Card className="h-100 border-0">
      <div className="position-relative" style={{ height: '240px', overflow: 'hidden', backgroundColor: '#ffffff', padding: '1.5rem' }}>
        <Card.Img
          variant="top"
          src={product.thumbnail}
          alt={product.title}
          style={{ height: '100%', width: '100%', objectFit: 'contain', transition: 'transform 0.5s ease' }}
          className="product-img-hover"
        />
        <Badge bg="primary" className="position-absolute top-0 start-0 m-3 shadow-sm rounded-pill px-3 py-2">
          {product.category}
        </Badge>
      </div>
      <Card.Body className="d-flex flex-column p-4 bg-white">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-warning fw-bold fs-5">★ {product.rating.toFixed(1)}</span>
          <span className="text-muted small px-2 py-1 bg-light rounded-pill border">{product.stock} in stock</span>
        </div>
        <Card.Title className="text-truncate fw-bold text-dark fs-5 mb-2" title={product.title}>{product.title}</Card.Title>
        <Card.Text className="text-muted text-truncate mb-4" style={{ WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', whiteSpace: 'normal' }}>
          {product.description}
        </Card.Text>
        <div className="mt-auto d-flex justify-content-between align-items-center border-top pt-3">
          <h4 className="mb-0 text-dark fw-bold">${product.price.toFixed(2)}</h4>
          <Button as={Link} to={`/products/${product.id}`} variant="primary" className="rounded-pill px-4 shadow-sm">
            Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
