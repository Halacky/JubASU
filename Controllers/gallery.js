const galery = require("../Models/Gallery");
const eventHandler = require("../utils/eventHandler");
const fs = require('fs');
const path = require('path');
const upload = require("../middleware/upload");
const key = require("../config/keys");
const mongoose = require("mongoose");
const GrindFsStorage = require("multer-gridfs-storage");
const Grid = require('gridfs-stream');
const MongoClient = require('mongodb');

// const conn = mongoose.createConnection(key.MongoURI);
// let gfs; 

// conn.once("open", ()=>{
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection("photos");
// });


module.exports.getAllGallery = (req, res) => {
  // gfs.files.find().toArray((err,files)=>{
  //   if(!files || files.length===0){
  //     res.render('imagesPage', {file: false});
  //   }else{
  //      //console.log(files);
  //     //   const arr$ = []
  //     //   const readstream = gfs.createReadStream(files);
  //     //   for await (const chunk of readStream) {
  //     //     console.log('>>> '+chunk);
  //     //   }
         
  //     //     readstream.on('data', (chunk) => {  
  //     //       console.log(chunk.toString('base64'));
  //     //     });
        
  //     // console.log(arr$);
  //     // res.json(arr$);
  //     console.log(files)
  //     res.json(files);
  //   }
    
  // })
  MongoClient.connect(key.MongoURI, function(err, client){

    if(err){
      return res.render('index', {title: 'Uploaded Error', message: 'MongoClient Connection error', error: err.errMsg});
    }
    const db = client.db("SweetDb");
    
    const collection = db.collection('photos.files');
    const collectionChunks = db.collection('photos.chunks');
    collection.find().toArray(function(err, docs){
      if(err){
        return res.render('index', {title: 'File error', message: 'Error finding file', error: err.errMsg});
      }
      if(!docs || docs.length === 0){
        return res.render('index', {title: 'Download Error', message: 'No file found'});
      }else{
        //Retrieving the chunks from the db
        collectionChunks.find().sort({n: 1}).toArray(function(err, chunks){
          if(err){
            return res.render('index', {title: 'Download Error', message: 'Error retrieving chunks', error: err.errmsg});
          }
          if(!chunks || chunks.length === 0){
            //No data found
            return res.render('index', {title: 'Download Error', message: 'No data found'});
          }
          //Append Chunks
          let fileData = [];
          for(let i=0; i<chunks.length;i++){
            //This is in Binary JSON or BSON format, which is stored
            //in fileData array in base64 endocoded string format
            fileData.push(chunks[i].data.toString('base64'));
             
          }
          //let finalFile = 'data:' + docs[0].contentType + ';base64,' + fileData[0];
          console.log(fileData);

          res.json(fileData);
          //Display the chunks using the data URI format
          // let finalFile = 'data:' + docs[0].contentType + ';base64,' + fileData.join(''); 
          // res.json(finalFile);
          // console.log(finalFile);
          // res.render('./imageView', {title: 'Image File', message: 'Image loaded from MongoDB GridFS', imgurl: finalFile});
        });
      }
      
    });
  });
  
}

module.exports.upload = async (req, res)=> {
  
    try {
    await upload(req, res);
    console.log(req.files);
    if (req.files.length <= 0) {
      return res.send(`You must select at least 1 file.`);
    }
  
    return res.send(`Files have been uploaded.`);
  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }
  
};

module.exports.getViewUpload = function(req,res){
    return res.sendFile(path.join(`${__dirname}/../views/uploadPage.html`));

}