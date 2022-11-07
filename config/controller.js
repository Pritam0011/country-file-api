const {v4:uuid4}=require('uuid');
const path=require('path');



exports.index=function(req, res){
    message = '';
   if(req.method == "POST"){
      const post  = req.body;
      const name= post.name;
      const dob= post.dob;
      const country= post.country;
 
	  if (!req.files)
				return res.status(400).send('No files were uploaded.');
      

      var file = req.files.fileinp;
      const uniqeName=`${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.name)}`;
      const id=uuid4();
		
 
	  	 if(file.mimetype == "image/jpeg" || file.mimetype == "application/pdf" ||file.mimetype == "image/png" ){
              file.mv('uploads/'+uniqeName, function(err) {
                             
	              if (err)  return res.status(500).send(err);
                
      					var sql = "INSERT INTO `files`(`id`,`name`,`dob`,`country`,`file`) VALUES ('" + id + "','" + name + "','" + dob + "','" + country + "','" + uniqeName + "')";

                     var query = db.query(sql, function() {
                        res.json({success: "Send Successfully"})
                    });
					   });
          } else {
            message = "This format is not allowed , please upload file with '.png','.pdf','.jpg'";
            res.json({error: message});
          }
   } else {
      res.render('index');
   }
 
};




exports.allData = function(req, res){
	var message = '';
    const sql="SELECT * FROM `files`";

    db.query(sql, function(err, result){
	  if(result.length <= 0){
	  message = "No Files!";
     res.json({error:message})
     }else{
      res.json({data:result});
     }
     
   });
};



exports.download = function(req, res){
	var message = '';
   var id = req.params.id;
    const sql="SELECT * FROM `files` WHERE `id`='"+id+"'";

    db.query(sql, function(err, result){
      
	  if(result.length <= 0){
	  message = "Not found!";
     res.json({error:message})
     }else{
      res.json({data:result,downl:`https://assignment-intern.herokuapp.com/api/add/download/file/${id}`});
     }
     
   });
};

 
exports.download_file = function(req, res){
	var message = '';
   var id = req.params.id;
    const sql="SELECT `file` FROM `files` WHERE `id`='"+id+"'";

    db.query(sql, function(err, result){
      
	  if(result.length <= 0){
	  message = "Not found any files for download!";
     res.json({error:message})
     }else{

      const filePath=`${__dirname}/../uploads/${result}`;
      res.download(filePath);
     }
     
   });
};