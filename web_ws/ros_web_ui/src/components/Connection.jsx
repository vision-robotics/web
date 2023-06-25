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

      // Reconnect after 3 seconds
      setTimeout(initConnection, 3000);
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
