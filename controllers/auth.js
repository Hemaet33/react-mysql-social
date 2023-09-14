import { db } from "../connect.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";

export const register = (req, res)=>{
//CHECK IF THE USER EXISTS
const q = "SELECT * FROM users WHERE username=?";

db.query(q, [req.body.username],(err, data)=>{
  if(err) return res.status(500).json(err);
  if(data.length) return res.status(409).json("User already exists.")

//CREATE NEW USER
if(req.body.username !== "" && req.body.email !== "" && req.body.password && req.body.name !== ""){
//hash the password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const q = "INSERT INTO users (username, email, password,name) VALUES(?)";

  const values = [req.body.username, req.body.email, hashedPassword, req.body.name];
  db.query(q, [values],(err, data)=>{
    if(err) return res.status(500).json(err);
    return res.status(200).json("User has been created.");
  });

}else{
  res.status(400).json("No input should be empty.")
}
}
);
}



export const login = (req, res)=>{
  if(req.body.username !== "" && req.body.password !== ""){
    const q = "SELECT * FROM users WHERE username=?";
    db.query(q, [req.body.username], (err, data)=>{
      if(err) return res.status(500).json(err);
      if(data.length === 0) return res.status(404).json("User not found!");
  
      const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
  
      if(!checkPassword) return res.status(400).json("Wrong password or username!")
  
      const token = jwt.sign({id:data[0].id}, "secretKey");
  
      const {password, ...others} = data[0];
  
      res.cookie("accessToken", token, {
        expires: new Date(Date.now()+1000*60*60*24*3),
        httpOnly:true,
        sameSite:"none",
        secure:true
      }).status(200).json(others);
  
    });
  }else{
    res.status(400).json("No input should be empty.")
  }
}

export const logout = (req, res)=>{
  return res.clearCookie("accessToken",{
    secure:true,
    sameSite:"none"
  }).status(200).json("User has been logged out.");
}