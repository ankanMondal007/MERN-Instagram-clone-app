const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGOURI } = require('./config/keys');
const PORT =process.env.PORT || 5000;


  app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'URLs to trust of allow');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if ('OPTIONS' == req.method) {
    res.sendStatus(200);
    } else {
      next();
    }
  });

require('./models/user.js');
require('./models/post.js');

app.use(express.json());
app.use(require('./routes/auth.js'));
app.use(require('./routes/post.js'));
app.use(require('./routes/user.js'));
// mongoose.model("User");

mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{
    console.log('connected');
});

mongoose.connection.on('error',(err)=>{
    console.log('err connecting',err);
});


if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'));
    const path = require('path');
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

app.listen(PORT, () => {
    console.log();
});

