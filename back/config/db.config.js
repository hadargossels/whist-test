let mongoose=require("mongoose");
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@products.svzgm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{  useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true})

mongoose.connection.on("connected",()=>{
    console.log("mongo db connected");
})


