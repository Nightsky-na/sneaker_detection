import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
// useCallback, useEffect, useRef, useState
import WebcamImage from "../../components/WebcamImage/WebcamImage";
import "./Homepage.css";

class Homepage extends Component {
    render() {
        return (
            <Container className="justify-content-md-center">
                <Row className="md-center">
                    <div className="Homepage-header">
                        <h1>Formal Footwear Detection</h1>
                    </div>
                </Row>
                <Row>
                    <WebcamImage />
                </Row>
            </Container>
        );
    }
}
export default Homepage;