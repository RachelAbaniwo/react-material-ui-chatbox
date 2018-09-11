import React, { Component } from 'react';
import socketio from 'socket.io-client'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import './App.css';

class App extends Component {

  state = {
    username: '',
    chatting: false,
    message: '',
    messages: []
  }

  componentDidMount() {
    this.io.on('NEW_MESSAGE_RECEIVED', payload => {
      this.setState({
        messages: [
          ...this.state.messages,
          payload
        ]
      })
    })
  }

  startChatting = () => {
    if (this.state.username) {
      this.setState({ chatting: true })
    }
  }

  setName = event => this.setState({ username: event.target.value })

  io = socketio('http://localhost:4200')

  sendMessage = () => {
    this.setState({
      message: ''
    })
    this.io.emit('NEW_MESSAGE', {
      username: this.state.username,
      message: this.state.message
    })
  }

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
              <ul className="messages">
                {this.state.messages.map(message => <li><b>{message.username}</b>  {message.message}</li>)}
              </ul>
              <div className="chatMessage">
                <TextField value={this.state.message} onChange={event => this.setState({ message: event.target.value })} placeholder="Send a message ...." type="text" />
                <IconButton onClick={this.sendMessage} color="secondary">Go!</IconButton>
              </div> 
            </div>
        }
      </div>
    );
  }
}

export default App;
