import jwt from 'jsonwebtoken';
import { db } from '../connect';

export const addStory = (req,res)=>{
  const token = req.cookies.accessToken;
  if(!token) return res.status(401).json("You are not logged in.");

  jwt.verify(token, "secretKey", (err, userInfo)=>{
    if(err) return res.status(403).json("Invalid token!");

    const q = "INSERT INTO stories (`img`,`userId`) VALUES(?)";

    const values = [
      req.body.img,
      userInfo.id
    ]

    db.query(q, [values], (err, data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json("You added a story.")
    });
  });
}