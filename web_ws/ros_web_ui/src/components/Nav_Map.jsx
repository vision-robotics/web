import React, { Component } from "react";

class Nav_Map extends Component {
  state = {
    selectedState: "Map", // Initial selected state
  };

  handleStateChange = (event) => {
    this.setState({ selectedState: event.target.value });
  };

  render() {
    return (
      <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
        <h2 style={{ marginRight: "auto" }}></h2>
        <select
          value={this.state.selectedState}
          onChange={this.handleStateChange}
        >
          <option value="state1">Map</option>
          <option value="state2">Nav</option>
        </select>
      </div>
    );
  }
}

export default Nav_Map;
