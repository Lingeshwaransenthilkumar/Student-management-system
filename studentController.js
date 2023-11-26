const express=require("express");
const mysql=require("mysql"); 

const con=mysql.createPool({
    connectionLimit:10,
    host:process.env.database_host,
    user:process.env.database_user,
    password:process.env.database_password,
    database:process.env.database
})
//*get
exports.view=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        connection.query("select * from users",(err,rows)=>{
            connection.release();
            if(!err){
                res.render("home",{rows});
            }
            else{
                console.log("error in viewing function is "+err);
            }

        });

    })
    
}

//! render adduser page while clicking
//*get
exports.adduser=(req,res)=>{
    res.render("adduser");
}


//*post
exports.save=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err

        const{name,age,city}=req.body
        console.log(req.body);
        

        connection.query("insert into users (NAME,AGE,CITY) values(?,?,?)",[name,age,city],(err,rows)=>{
            connection.release();
            if(!err){
                res.render("adduser",{msg:"User details added successfully"});
            }
            else{
                console.log("error in inserting function is "+err);
            }

        });

    })


}

//! getting the values that should updated
//*get
exports.edituser=(req,res)=>{

    con.getConnection((err,connection)=>{
        let id=req.params.id;// getting id from arguments or request
        if(err) throw err
        connection.query("select * from users where id=?",[id],(err,rows)=>{
            connection.release();
            if(!err){
                res.render("rename",{rows});
            }
            else{
                console.log("error in viewing function is "+err);
            }

        });

    })
}

//*post
exports.edit=(req,res)=>{
        con.getConnection((err,connection)=>{
            if(err) throw err
    
            const{name,age,city}=req.body
            let id=req.params.id;
            console.log(req.body);
     
            connection.query("update users NAME set NAME=?,AGE=?,CITY=? where ID=?",[name,age,city,id],(err,rows)=>{
                connection.release();
                if(!err){
                    con.getConnection((err,connection)=>{
                        let id=req.params.id;// getting id from arguments or request
                        if(err) throw err
                        connection.query("select * from users where id=?",[id],(err,rows)=>{
                            connection.release();
                            if(!err){
                                res.render("rename",{rows,msg:"user details updated successfully"});
                            }
                            else{
                                console.log("error in viewing function is "+err);
                            }
                
                        });
                
                    })
            
                    };
                });
        });
}

//*post
exports.delete=(req,res)=>{
    con.getConnection((err,connection)=>{
        if (err) throw err
        let id=req.params.id;
        connection.query("delete from users where ID=?",[id],(err,rows)=>{
            connection.release();
            if(!err){
                res.redirect("/");

            }
            else{
                console.log(err)
            }

        })
    })

};

        
            
        
