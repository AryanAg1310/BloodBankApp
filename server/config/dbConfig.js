const mongoose = require('mongoose');

/* mongoose.connect("mongodb://127.0.0.1:27017/bloodBank")

const connection = mongoose.connection;

// verify connection
connection.on('connected' , ()=>{
    console.log('Mongo DB Connection Successfull')
}) 

// verify connection error
connection.on('error' , (err)=>{
    console.log('Mongo DB Connection Error', err)
})

 */


mongoose.set("strictQuery",false);

const connectToDB =async ()=>{
    try{
        const{connection}= await mongoose.connect(
            process.env.MONGO_URL
        );
    
        if(connection){
            console.log(`connected to MongoDB: ${connection.host}`)
        }

    }catch(e){
        console.log(e);
        process.exit(1);
    }
};

export default connectToDB;