var spark = require('spark');

spark.on('login', function(err, body) {
  console.log('API call completed on Login event:', body);
});

spark.login({accessToken: 'd1f902debd706ffcfe30a6b59e4c6247b0012d6d'});

var devicesPr = spark.listDevices();

devicesPr.then(
  function(devices){
    console.log('Devices: ', devices);
  },
  function(err) {
    console.log('List devices call failed: ', err);
  }
);