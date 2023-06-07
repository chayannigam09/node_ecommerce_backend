const accountSid = 'AC8d4aef33b58bfd264f4f5af4295257cd';
const authToken = 'e2d34036794b1fb12fa93802e4fef322';
const client = require('twilio')(accountSid, authToken);
client.messages
  .create({
     body: 'Hello, this is a test message!',
     from: '+919752610597', // Your verified Twilio phone number
     to: '+917583869015' // The recipient's phone number
   })
  .then(message => console.log(message.sid))
  .catch(err => console.error(err));