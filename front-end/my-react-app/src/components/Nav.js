import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Nav() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            แ T ะ Detection
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Nav;