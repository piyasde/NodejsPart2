var application_root = __dirname,
    express = require("express"),
	path = require("path");
	var databaseUrl = "sampledb"; // "username:password@example.com/mydb"
var collections = ["things"]
var db = require("mongojs").connect(databaseUrl, collections);

var app = express();


// Config

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/api', function (req, res) {
  res.send('Ecomm API is running');
});


app.get('/getallusers', function (req, res) {
	db.things.find('', function(err, users) {
	if( err || !users) console.log("No users found");
	  else 
	{
		res.writeHead(200, {'Content-Type': 'text/plain'});
		str='';
		users.forEach( function(user) {
			str = str + user.username +'\n';
		});
		res.end( str);
	}
  });
});

app.get('/user/:username', function (req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	//res.end( req.params.username);
	user = req.params.username;
	db.things.find({username:user}, function(err, users) {
		 str='';
		 if( err || !users) console.log("No users found");
		 else 
		{
			users.forEach( function(user) {
				str = str + 'User is '+ user.username +'\n';
				str = str + 'and email is '+ user.email +'\n';
				res.end( str);
			});
		 }
      }); 
});

app.post('/insertmongouser', function (req, res){
  console.log("POST: ");
  res.writeHead(200, {'Content-Type': 'text/plain'});
  user = req.body.username;
  passwd = req.body.password;
  emailid = req.body.email;
  
  db.things.save({email: emailid, password: passwd, username: user}, function(err, saved) {
  if( err || !saved ) res.end( "User not saved"); 
  else res.end( "User saved");
});
  
  
 
});



app.listen(1212);