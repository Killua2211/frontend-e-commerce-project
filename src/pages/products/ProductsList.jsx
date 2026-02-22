import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Pagination, Spinner, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import ProductCard from '../../components/ProductCard';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  
  // Filters & Pagination state
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState(''); // e.g., 'price-asc', 'price-desc', 'title-asc'
  const [page, setPage] = useState(1);
  const limit = 12;

  useEffect(() => {
    // Fetch categories on mount
    axios.get('https://dummyjson.com/products/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error fetching categories", err));
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = 'https://dummyjson.com/products';
        const skip = (page - 1) * limit;

        if (search) {
          url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`;
        } else if (category && category !== 'all') {
          // Note: DummyJSON category endpoint doesn't support sortBy directly in the same way, we might need client-side sort or just standard fetch
          url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
        } else {
          url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
          if (sortBy) {
            const [sortParam, orderParam] = sortBy.split('-');
            url += `&sortBy=${sortParam}&order=${orderParam}`;
          }
        }

        // Apply sort manually if searching or filtering by category as DummyJSON might not support combined filters well
        // Actually DummyJSON supports sorting for all endpoints now, let's append it if present
        if ((search || category) && sortBy) {
           const [sortParam, orderParam] = sortBy.split('-');
           url += `&sortBy=${sortParam}&order=${orderParam}`;
        }

        const res = await axios.get(url);
        setProducts(res.data.products);
        setTotal(res.data.total);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchProducts();
    }, 300); // debounce search slightly

    return () => clearTimeout(delayDebounceFn);
  }, [search, category, sortBy, page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2>Products</h2>
        <div>Total: {total} items</div>
      </div>

      <Row className="mb-4 bg-light p-3 rounded shadow-sm">
        <Col md={4} className="mb-3 mb-md-0">
          <InputGroup>
            <Form.Control
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCategory(''); // clear category on search
                setPage(1);
              }}
            />
          </InputGroup>
        </Col>
        <Col md={4} className="mb-3 mb-md-0">
          <Form.Select 
            value={category} 
            onChange={(e) => {
              setCategory(e.target.value);
              setSearch(''); // clear search on category change
              setPage(1);
            }}
          >
            <option value="all">All Categories</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat.slug || cat}>
                {cat.name || cat}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setPage(1); }}>
            <option value="">Sort By (Default)</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="title-asc">Title: A-Z</option>
            <option value="title-desc">Title: Z-A</option>
            <option value="rating-desc">Highest Rated</option>
          </Form.Select>
        </Col>
      </Row>

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <Row xs={1} md={2} lg={3} xl={4} className="g-4 mb-4">
            {products.map(product => (
              <Col key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>

          {products.length === 0 && (
             <div className="text-center my-5">
                <h4>No products found.</h4>
             </div>
          )}

          {totalPages > 1 && (
            <div className="d-flex justify-content-center">
              <Pagination>
                <Pagination.First onClick={() => setPage(1)} disabled={page === 1} />
                <Pagination.Prev onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1} />
                
                {/* Simple pagination display, showing current page */}
                <Pagination.Item active>{page}</Pagination.Item>
                
                <Pagination.Next onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages} />
                <Pagination.Last onClick={() => setPage(totalPages)} disabled={page === totalPages} />
              </Pagination>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default ProductsList;
