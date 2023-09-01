import jwt from 'jsonwebtoken';
import {db} from '../connect.js';

export const like = (req, res)=>{
  const token = req.cookies.accessToken;
  if(!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, "secretKey",(err, userInfo)=>{
    if(err) return res.status(403).json("Invalid token!");

  const q = "INSERT INTO likes (`userId`, `postId`) VALUES(?)";

  const values = [
    userInfo.id,
    req.body.postId
  ]

    db.query(q,[values], (err, data)=>{
      if(err) return res.status(500).json(err);
      return res.status(200).json("You liked it.");
    });
  });
}

export const dislike = (req, res)=>{
  
  const token = req.cookies.accessToken;
  if(!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, "secretKey",(err, userInfo)=>{
    if(err) return res.status(403).json("Invalid token!");


  const q = "DELETE FROM likes WHERE `userId`=? AND `postId`=? ";


db.query(q,[userInfo.id,req.params.postId], (err, data)=>{
  if(err) return res.status(500).json(err);
  return res.status(200).json("You disliked it.");
});
  });
}

export const getLikes = (req, res)=>{

  const token = req.cookies.accessToken;
  if(!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, "secretKey",(err, userInfo)=>{
    if(err) return res.status(403).json("Invalid token!");


  const q = "SELECT * FROM likes WHERE postId=?";

db.query(q,[req.query.postId], (err, data)=>{
  if(err) return res.status(500).json(err);
  return res.status(200).json(data.map(like=>like.userId));
});
  });
}