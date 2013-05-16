// app.js
var databaseUrl = "sampledb"; // "username:password@example.com/mydb"
var collections = ["things"]
var db = require("mongojs").connect(databaseUrl, collections);

// app.js
db.things.find({username: '/user/'}, function(err, users) {
  if( err || !users) console.log("No users found");
  else users.forEach( function(user) {
    console.log(user);
  } );
});

db.things.find('', function(err, users) {
  if( err || !users) console.log("No users found");
  else users.forEach( function(user) {
    console.log(user);
  } );
});

/*
// app.js
db.things.save({email: "srirangan@gmail.com", password: "iLoveMongo", username: "srirangan"}, function(err, saved) {
  if( err || !saved ) console.log("User not saved");
  else console.log("User saved");
});

// app.js
db.things.update({email: "srirangan@gmail.com"}, {$set: {address: "iLoveMongo1address"}}, function(err, updated) {
  if( err || !updated ) console.log("User not updated");
  else console.log("User updated");
});
*/
