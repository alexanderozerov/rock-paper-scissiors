import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {soundManager} from 'soundmanager2';
import {throttle} from 'lodash';

import './Chat.css';

const getId = () => Math.random().toString(36).substr(2, 16);

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      messages: [],
      typingNickname: ''
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.emitTyping = throttle(this.emitTyping, 1000);
  }

  emitTyping() {
    this.props.socket.emit('TYPE_MESSAGE');
  }

  handleInput(e) {
    this.setState({message: e.target.value});
    this.emitTyping();
  }

  sendMessage(e) {
    e.preventDefault();
    this.props.socket.emit('SEND_MESSAGE', this.state.message);
    this.setState({
      messages: [...this.state.messages, {message: this.state.message, author: 'Me'}],
      message: ''
    });
    const messageContainer = document.querySelector('.messages');
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }

  addMessage(message) {
    this.setState({
      messages: [...this.state.messages, message]
    });
  }

  componentDidMount() {
    this.setState({
      messageSound: soundManager.createSound({url: '/mp3/message.mp3'})
    });

    this.props.socket.on('RECEIVE_MESSAGE', message => {
      this.state.messageSound.play();
      this.addMessage(message);
      const messageContainer = document.querySelector('.messages');
      messageContainer.scrollTop = messageContainer.scrollHeight;
    });

    this.props.socket.on('TYPE_MESSAGE', nickname => {
      this.setState({typingNickname: nickname});
      setTimeout(() => this.setState({typingNickname: ''}), 1000);
    });
  }

  render() {
    const someOneTyping = this.state.typingNickname !== '';
    return (
      <div className='Chat card'>
        <div className='card-body'>
          <div>Game chat</div>
          <hr/>
          <div className='messages'>
            {this.state.messages.map(message => {
              return (
                <div key={getId()}>{message.author}: {message.message}</div>
              );
            })}
          </div>
          <span className={someOneTyping ? 'typing-nickname' : 'typing-nickname hidden'}>
            {this.state.typingNickname} typing...
          </span>
        </div>
        <div className='card-footer'>
          <form onSubmit={this.sendMessage}>
            <input type='text' value={this.state.message} 
              onChange={this.handleInput} 
              placeholder='Message' className='form-control'/>
            <button
              className='btn btn-primary form-control'>
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  socket: PropTypes.object.isRequired,
  nickname: PropTypes.string.isRequired
};

export default Chat;