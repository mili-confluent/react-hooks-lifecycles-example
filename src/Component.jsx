import React from "react";

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.resizeListerner = null;
    this.state = {
      time: new Date().toLocaleTimeString(),
      windowWidth: window.innerWidth
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ time: new Date().toLocaleTimeString() });
    }, 1000);
    this.resizeListerner = () => {
      this.setState({ windowWidth: window.innerWidth });
    };
    window.addEventListener("resize", this.resizeListerner);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    window.removeEventListener("resize", this.resizeListerner);
  }

  render() {
    return (
      <div>
        <div>Time {this.state.time}</div>
        <div>The window width is {this.state.windowWidth}</div>
      </div>
    );
  }
}

export default Component;
