import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Card className="h-100 shadow-sm">
      <div style={{ height: '200px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
        <Card.Img 
          variant="top" 
          src={product.thumbnail} 
          alt={product.title}
          style={{ maxHeight: '100%', objectFit: 'contain' }}
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between mb-2">
          <Badge bg="info">{product.category}</Badge>
          <span className="text-warning">★ {product.rating}</span>
        </div>
        <Card.Title className="text-truncate" title={product.title}>{product.title}</Card.Title>
        <Card.Text className="text-truncate text-muted" title={product.description}>
          {product.description}
        </Card.Text>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <h5 className="mb-0 text-primary">${product.price.toFixed(2)}</h5>
          <Button as={Link} to={`/products/${product.id}`} variant="outline-primary" size="sm">
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
