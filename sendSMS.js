const accountSid = 'AC8d4aef33b58bfd264f4f5af4295257cd';
const authToken = 'a6ce60413be1908d5a8d8f168c473975';
const client = require('twilio')(accountSid, authToken);
client.messages
  .create({
     body: 'Hello, this is a test message!',
     from: '+14065006369',
     to: '+917000455195'
   })
  .then(message => console.log(message.sid))
  .catch(err => console.error(err));