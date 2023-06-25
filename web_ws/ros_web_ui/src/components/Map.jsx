import React, { Component } from "react";
import ROSLIB from "roslib";
import { Viewer, Axes } from "ros3d";
import { OccupancyGridClient } from "ros3d";

class Map extends Component {
  state = {
    ros: null,
    viewer: null,
  };

  componentDidMount() {
    this.initConnection();
  }

  initConnection() {
    const ros = new ROSLIB.Ros({
      url: "ws://localhost:9090",
    });

    ros.on("connection", () => {
      console.log("Connection established!");
      this.setState({ connected: true });
      this.initViewer();
    });

    ros.on("close", () => {
      console.log("Connection is closed!");
      this.setState({ connected: false });

      // Reconnect after 3 seconds
      setTimeout(this.initConnection.bind(this), 3000);
    });

    try {
      ros.connect();
    } catch (error) {
      console.log("Connection problem");
    }

    this.setState({ ros });
  }

  initViewer() {
    const { ros } = this.state;

    const viewer = new Viewer({
      divID: "nav_div",
      width: 640,
      height: 480,
    });

    const gridClient = new OccupancyGridClient({
      ros,
      rootObject: viewer.scene,
    });
    gridClient.subscribe("/map");

    const axes = new Axes({
      ros,
      tfClient: viewer.tfClient,
      topic: "/map",
      length: 1,
    });
    viewer.scene.add(axes);

    this.setState({ viewer });
  }

  render() {
    return <div id="nav_div" />;
  }
}

export default Map;

/* import React, { Component } from "react";
import ROSLIB from "roslib";
import { Viewer, Axes, Grid } from "ros3d";

class Map extends Component {
  state = {
    ros: null,
    viewer: null,
  };

  componentDidMount() {
    this.initConnection();
  }

  initConnection() {
    const ros = new ROSLIB.Ros({
      url: "ws://localhost:9090",
    });

    ros.on("connection", () => {
      console.log("Connection established!");
      this.setState({ connected: true });
      this.initViewer();
    });

    ros.on("close", () => {
      console.log("Connection is closed!");
      this.setState({ connected: false });

      // Reconnect after 3 seconds
      setTimeout(this.initConnection.bind(this), 3000);
    });

    try {
      ros.connect();
    } catch (error) {
      console.log("Connection problem");
    }

    this.setState({ ros });
  }

  initViewer() {
    const { ros } = this.state;

    const viewer = new Viewer({
      divID: "nav_div",
      width: 640,
      height: 480,
    });

    const grid = new Grid({
      color: "#888888",
      cellSize: 1.0,
      num_cells: 100,
    });
    viewer.scene.add(grid);

    const axes = new Axes({
      ros,
      tfClient: viewer.tfClient,
      topic: "/tf",
      length: 1,
    });
    viewer.scene.add(axes);

    this.setState({ viewer });
  }

  render() {
    return <div id="nav_div" />;
  }
}

export default Map; */

/*
 */
