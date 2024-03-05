class ChatManager {
    constructor() {
      this.messages = [];
    }
  
    addMessage(message) {
      this.messages.push(message);
    }
  
    getMessages() {
      return this.messages;
    }
  }
  
  module.exports = ChatManager;