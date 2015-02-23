var express = require('express');
var router = express.Router();

// Load the twilio module
var twilio = require('twilio');

// Create a new REST API client to make authenticated requests against the
// twilio back end
var client = new twilio.RestClient('ACfb7b4de6de01b6b7af8e317fcbefe060', 'afc8a5425ab2844dce905e8ddc68f060');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/text', function(req, res, next) {
	// Pass in parameters to the REST API using an object literal notation. The
	// REST client will handle authentication and response serialzation for you.
	client.sms.messages.create({
	    to:'+16178494627',
	    from:'+1 781-917-3133',
	    body:'ahoy hoy! Testing Twilio and node.js'
	}, function(error, message) {
	    // The HTTP request to Twilio will run asynchronously. This callback
	    // function will be called when a response is received from Twilio
	    // The "error" variable will contain error information, if any.
	    // If the request was successful, this value will be "falsy"
	    if (!error) {
	        // The second argument to the callback will contain the information
	        // sent back by Twilio for the request. In this case, it is the
	        // information about the text messsage you just sent:
	        console.log('Success! The SID for this SMS message is:');
	        console.log(message.sid);

	        console.log('Message sent on:');
	        console.log(message.dateCreated);
	    } else {
	        console.log('Oops! There was an error.');
	    }
	});
});

router.get('/twiml', function(req, res, next) {
	// Pass in parameters to the REST API using an object literal notation. The
	// REST client will handle authentication and response serialzation for you.
	client.sms.messages.create({
	    to:'+16178494627',
	    from:'TWILIO_NUMBER',
	    body:'ahoy hoy! Testing Twilio and node.js'
	}, function(error, message) {
	    // The HTTP request to Twilio will run asynchronously. This callback
	    // function will be called when a response is received from Twilio
	    // The "error" variable will contain error information, if any.
	    // If the request was successful, this value will be "falsy"
	    if (!error) {
	        // The second argument to the callback will contain the information
	        // sent back by Twilio for the request. In this case, it is the
	        // information about the text messsage you just sent:
	        console.log('Success! The SID for this SMS message is:');
	        console.log(message.sid);

	        console.log('Message sent on:');
	        console.log(message.dateCreated);
	    } else {
	        console.log('Oops! There was an error.');
	    }
	});
});


module.exports = router;
