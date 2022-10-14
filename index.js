const express=require('express');
const app=express();
const port=8000;

app.listen(port,'localhost',function (err) {
    if(err){
        console.log(`Error while connecting to server on port : ${err}`);
        return;
    }
    console.log(`Server is successfully running on port : ${port}`);
});