import React, { Component } from "react";
import Connection from "./Connection";
import Teleopration from "./Teleopration";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav_Map from "./Nav_Map";
//import { Row, Col, Container, Button } from "react-bootstrapt";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <h1 className="text-center mt-3">Robot Control Page</h1>
            </Col>
          </Row>

          <Row>
            <Col>
              <Connection />
            </Col>
          </Row>

          <Row>
            <Col></Col>
            <Col>
              <Nav_Map />
            </Col>
          </Row>

          <Row>
            <Col>
              <Teleopration />
            </Col>
            <Col>
              <h1>Map</h1>
              <p>This region will be used later for displaying the map</p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
