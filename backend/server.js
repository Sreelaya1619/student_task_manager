const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json());


const taskRoutes = require("./routes/taskRoutes");


app.use("/api/tasks", taskRoutes);


app.get("/", (req,res)=>{
    res.send("Backend Running Successfully");
});


app.get("/health",(req,res)=>{
    res.json({
        status:"UP"
    });
});


const PORT = 3001;


app.listen(PORT,()=>{

    console.log(
        `Server running on port ${PORT}`
    );

});