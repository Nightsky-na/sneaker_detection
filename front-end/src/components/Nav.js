import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Nav() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/nor.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            แ T ะ Detection
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Nav;