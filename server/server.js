const express = require("express");
const app = express();
const mongoose=require("mongoose");

const dotenv=require('dotenv');
dotenv.config({ path: './config.env' });

app.use(express.json());
mongoose.set("strictQuery", false);

const usersRoute = require("./routes/usersRoute");
const inventoryRoute = require("./routes/inventoryRoute");
const dashboardRoute = require("./routes/dashboardRoute");

app.use("/api/users", usersRoute);
app.use("/api/inventory", inventoryRoute);
app.use("/api/dashboard", dashboardRoute);

console.log( process.env.MONGO_URL);
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
// deployment config
const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
    await connectToDB();
    console.log(`app is running at http://localhost:${PORT}`);
});
