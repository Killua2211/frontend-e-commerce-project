import Navbar from './Navbar';
import { Container } from 'react-bootstrap';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container className="mb-5">
        {children}
      </Container>
    </>
  );
};

export default Layout;
