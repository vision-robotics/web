import React, { Component } from "react";
import Connection from "./Connection";
import Teleopration from "./Teleopration";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav_Map from "./Nav_Map";
import Map from "./Map";
import RobotState from "./RobotState";
//import { Row, Col, Container, Button } from "react-bootstrapt";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <Connection />
        <Map />
        <RobotState />
      </div>
    );
  }
}

export default Home;
