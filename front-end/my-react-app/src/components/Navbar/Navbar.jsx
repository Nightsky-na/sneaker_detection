import {Container, Navbar } from "reactstrap"; 
import 'bootstrap/dist/css/bootstrap.min.css'

function ContainerOutsideExample() {
    return (
        <Container>
            <Navbar expand="lg" variant="light" bg="light">
                <Container>
                    <Navbar.Brand href="#">Navbar</Navbar.Brand>
                </Container>
            </Navbar>
        </Container>
    );
}

export default ContainerOutsideExample;
