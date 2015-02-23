var express = require('express');
var router = express.Router();

// Load the twilio module
var twilio = require('twilio');

// Create a new REST API client to make authenticated requests against the
// twilio back end
var client = new twilio.RestClient('ACfb7b4de6de01b6b7af8e317fcbefe060', 'afc8a5425ab2844dce905e8ddc68f060');

var serverIP = "104.131.31.123:3000";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/twiml', function(req, res, next) {
	var options = {
		root:'public/',
	    dotfiles: 'allow'
  	};
	res.sendFile('twiml/LetSmoke.xml', options, function (err) {
	    if (err) {
	      console.log(err);
	      res.status(err.status).end();
	    }
	    else {
	      console.log('Sent Twiml');
	    }
	  });
});


router.post('/call', function(req, res, next) {
	//This REST call using the master/default account for the client...
	client.makeCall({
	    to:'+16178494627',
	    from:'+1 781-917-3133',
	    url:'http://104.131.31.123:3000/twiml',
	    record: "false",
	    Method: "POST"
	}, function(err, call) {
		if (!err) {
	    	console.log('This call\'s unique ID is: ' + call.sid);
	    	console.log('This call was created at: ' + call.dateCreated);
	    	res.send('200 OK');
		}
		else {
			console.log(error);
			res.send('500 Internal Server Error');
		}
	});
});


router.post('/text', function(req, res, next) {
	// Pass in parameters to the REST API using an object literal notation. The
	// REST client will handle authentication and response serialzation for you.
	client.sms.messages.create({
	    to:'+16178494627',
	    from:'+1 781-917-3133',
	    body:'yoooooo'
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
	        res.send('200 OK');
	    } else {
	        console.log(error);
	        res.send('500 Internal Server Error');
	    }
	});
});


router.get('/music', function(req, res, next) {
	var options = {
		root:'public/',
	    dotfiles: 'allow'
  	};
	res.sendFile('music/Sanctified.mp3', options, function (err) {
	    if (err) {
	      console.log(err);
	      res.status(err.status).end();
	    }
	    else {
	      console.log('Sent Music');
	    }
	  });
});


module.exports = router;
