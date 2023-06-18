import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import ROSLIB from "roslib";

function Connection() {
  const [connected, setConnected] = useState(false);
  const [ros, setRos] = useState(null);

  useEffect(() => {
    initConnection();
  }, []);

  function initConnection() {
    const newRos = new ROSLIB.Ros({
      url: "ws://localhost:9090",
    });
    console.log(newRos);

    newRos.on("connection", () => {
      console.log("Connection established!");
      setConnected(true);
    });

    newRos.on("close", () => {
      console.log("Connection is closed!");
      setConnected(false);
    });

    try {
      newRos.connect();
    } catch (error) {
      console.log("Connection problem");
    }

    setRos(newRos);
  }

  return (
    <div>
      <Alert
        className="text-center m-3"
        variant={connected ? "success" : "danger"}
      >
        {connected ? "Robot connected" : "Robot disconnected"}
      </Alert>
    </div>
  );
}

export default Connection;

/* import React, { Component } from "react";
import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
class Connection extends Component {
  state = { connected: false, ros: null };

  constructor() {
    super();
    this.init_connection();
  }

  init_connection() {
    this.state.ros = new window.ROSLIB.Ros();
    console.log(this.state.ros);

    this.state.ros.on("connection", () => {
      console.log("connection established!");
      this.setState({ connected: true });
    });

    this.state.ros.on("closed", () => {
      console.log("connection is closed!");
      this.setState({ connected: false });
    });
    try {
      // this.state.ros.connect("ws://172.28.2.187:9090");
    } catch (error) {
      console.log("COnnection Problem");
    }
  }

  render() {
    return (
      <div>
        <Alert
          className="text-center m-3"
          variant={this.state.connected ? "success" : "danger"}
        >
          {this.state.connected ? "Robot connected" : "Robot Disconected"}
        </Alert>
      </div>
    );
  }
}

export default Connection;
 */
