import React, { Component } from 'react';
import socketio from 'socket.io-client'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import './App.css';

class App extends Component {

  state = {
    username: '',
    chatting: false
  }

  startChatting = () => {
    if (this.state.username) {
      this.setState({ chatting: true })
    }
  }

  setName = event => this.setState({ username: event.target.value })

  io = socketio('http://localhost:4200')

  render() {
    return (
      <div className="chatApp">
        {
          !this.state.chatting ?
            <div className="userName">
              <TextField value={this.state.username} onChange={this.setName} placeholder="Enter your username" type="text" />
              <IconButton onClick={this.startChatting} color="secondary">Go!</IconButton>
            </div> :

            <div className="chatBox">
              
            </div>
        }
      </div>
    );
  }
}

export default App;
