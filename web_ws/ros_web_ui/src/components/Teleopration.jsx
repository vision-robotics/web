import React, { Component } from "react";
import { Joystick } from "react-joystick-component";
import ROSLIB from "roslib";

class Teleoperation extends Component {
  state = {
    ros: null,
    connected: false,
  };

  componentDidMount() {
    this.init_connection();
    this.handleMove = this.handleMove.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  init_connection() {
    const ros = new ROSLIB.Ros();

    ros.on("connection", () => {
      console.log("Connection established in Teleoperation Component!");
      this.setState({ connected: true });
    });

    ros.on("close", () => {
      console.log("Connection is closed!");
      this.setState({ connected: false });
      // Try to reconnect every 3 seconds
      setTimeout(() => {
        try {
          ros.connect("ws://localhost:9090");
        } catch (error) {
          console.log("Connection problem");
        }
      }, 3000);
    });

    try {
      ros.connect("ws://localhost:9090");
      this.setState({ ros });
    } catch (error) {
      console.log("ws://localhost:9090");
      console.log("Connection problem");
    }
  }

  handleMove(event) {
    console.log("handle move");
    const { ros } = this.state;

    // Create a ROS publisher on the topic cmd_vel
    const cmd_vel = new ROSLIB.Topic({
      ros,
      name: "/cmd_vel",
      messageType: "geometry_msgs/Twist",
    });

    // Create a twist message to be published to rosbridge
    const twist = new ROSLIB.Message({
      linear: {
        x: event.y / 10,
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: -event.x / 10,
      },
    });

    // Publish the message on the cmd_vel topic
    cmd_vel.publish(twist);
  }

  handleStop(event) {
    console.log("handle stop");
    const { ros } = this.state;

    // Create a ROS publisher on the topic cmd_vel
    const cmd_vel = new ROSLIB.Topic({
      ros,
      name: "/cmd_vel",
      messageType: "geometry_msgs/Twist",
    });

    // Create a twist message to be published to rosbridge
    const twist = new ROSLIB.Message({
      linear: {
        x: 0,
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: 0,
      },
    });

    // Publish the message on the cmd_vel topic
    cmd_vel.publish(twist);
  }

  render() {
    const { connected } = this.state;

    return (
      <div>
        {connected ? (
          <Joystick
            size={100}
            baseColor="#EEEEEE"
            stickColor="#BBBBBB"
            move={this.handleMove}
            stop={this.handleStop}
          />
        ) : (
          <p>Connecting to ROS...</p>
        )}
      </div>
    );
  }
}

export default Teleoperation;
