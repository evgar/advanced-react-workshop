import "./index.css";
import React, { Component } from "react";
import subscribeToMessages from "./messages";
import FadeIn from "./FadeIn";

class PinScrollToBottom extends Component {

  render() {
    const {scrollHeight, clientHeight, scrollTop} = document.documentElement;
    const {pinToTop} = this.props;

    console.log('scrollHeight' ,scrollHeight);
    console.log('clientHeight' ,clientHeight);
    console.log('scrollTop' ,scrollTop);

    if (pinToTop) {
      window.scrollTo(0, document.documentElement.scrollHeight)
    }
    return this.props.children;
  }
}

class App extends Component {
  state = {
    messages: [],
    scrolled: false,
    pinToTop: true
  };

  componentDidMount() {
    subscribeToMessages(message => {
      this.setState({
        messages: [...this.state.messages, message],
        pinToTop: true
      });
    });
  }

  // componentDidUpdate() {
  //   this.setState()
  // }

  handleScroll = () => {
    console.log(document.documentElement.scrollTop);
    this.setState({scrolled: true});
  };

  render() {
    const { messages, pinToTop } = this.state;
    return (
      <div className="app" onWheel={this.handleScroll}>
        <div className="link">
          <a href="https://www.youtube.com/watch?v=VKHFZBUTA4k&list=RDVKHFZBUTA4k">
            Sketch on YouTube
          </a>
        </div>
        <PinScrollToBottom pinToTop={pinToTop}>
          <ol className="messages">
            {messages.map((message, index) => (
              <FadeIn key={index}>
                <li className="message">
                  <div
                    className="avatar"
                    style={{ backgroundImage: `url(${message.avatar})` }}
                  />
                  <div className="text">{message.text}</div>
                </li>
              </FadeIn>
            ))}
          </ol>
        </PinScrollToBottom>
      </div>
    );
  }
}

export default App;
