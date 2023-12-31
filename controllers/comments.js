import { db } from "../connect.js";
import jwt from 'jsonwebtoken';
import moment from 'moment'

export const getComments = (req, res)=>{
  const q = "SELECT comments.*, users.name, users.profilePic FROM comments JOIN users ON(comments.userId=users.id) WHERE comments.postId=? ORDER BY comments.createdAt DESC";

  db.query(q, [req.params.postId], (err, data)=>{
    if(err) return res.status(500).json(err);

    return res.status(200).json(data);
  })
}


export const addComment = (req, res)=>{

  const token = req.cookies.accessToken;
  if(!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, "secretKey",(err, userInfo)=>{
    if(err) return res.status(403).json("Invalid token!");


  const q = "INSERT INTO comments (`desc`, `createdAt`, `userId`, `postId`) VALUES(?)";

  const values = [
    req.body.desc,
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    userInfo.id,
    req.body.postId
  ]

db.query(q,[values], (err, data)=>{
  if(err) return res.status(500).json(err);
  return res.status(200).json("Comment has been posted.");
});
  });
}

export const deleteComment = (req, res)=>{

  const token = req.cookies.accessToken;
  if(!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, "secretKey",(err, userInfo)=>{
    if(err) return res.status(403).json("Invalid token!");


  const q = "DELETE FROM comments WHERE id=?";

  const values = [
    req.params.commentId
  ]

db.query(q,values, (err, data)=>{
  if(err) return res.status(500).json(err);
  return res.status(200).json("Comment has been deleted.");
});
  });
}