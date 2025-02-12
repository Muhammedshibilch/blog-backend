const mongoose = require('mongoose')

const connection_string = process.env.CONNECTIONSTRING

mongoose.connect(connection_string).then((res)=>{
    console.log("MONGODB CONNECTED SUCCESS FULLY WITH BLSERVER");
    
}).catch(err=>{
    console.log("Connection Failed!!");
    console.log(err);
    
})