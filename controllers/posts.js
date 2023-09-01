import moment from 'moment/moment.js';
import {db} from '../connect.js';
import jwt from 'jsonwebtoken';

export const getPosts = (req, res)=>{

  const userId = req.query.userId;

  const token = req.cookies.accessToken;
  if(!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, "secretKey",(err, userInfo)=>{
    if(err) return res.status(403).json("Invalid token!");


  const q = userId ? "SELECT posts.*, users.name, users.profilePic FROM posts JOIN users ON(posts.userId=users.id) WHERE posts.userId=? ORDER BY posts.createdAt DESC" : "SELECT posts.*, users.name, users.profilePic FROM posts JOIN users ON(posts.userId=users.id) LEFT JOIN relationships ON(posts.userId=relationships.followedUserId) WHERE relationships.followerUserId=? OR posts.userId=? ORDER BY posts.createdAt DESC";

  const values = userId ? [userId] : [userInfo.id, userInfo.id];
  

db.query(q, values, (err, data)=>{
  if(err) return res.status(500).json(err);
  return res.status(200).json(data);
});
  });
}

export const deletePost = (req, res)=>{

  const token = req.cookies.accessToken;
  if(!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, "secretKey",(err, userInfo)=>{
    if(err) return res.status(403).json("Invalid token!");


  const q = "DELETE FROM posts WHERE posts.userId = ? AND id = ?";

  const values = [
    userInfo.id,
    req.params.postId
  ]

db.query(q,values, (err, data)=>{
  if(err) return res.status(500).json(err);
  return res.status(200).json("Post has been deleted.");
});
  });
}

export const addPost = (req, res)=>{

  const token = req.cookies.accessToken;
  if(!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, "secretKey",(err, userInfo)=>{
    if(err) return res.status(403).json("Invalid token!");


  const q = "INSERT INTO posts (`desc`, `img`, `userId`, `createdAt`) VALUES(?)";

  const values = [
    req.body.desc,
    req.body.img,
    userInfo.id,
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
  ]

db.query(q,[values], (err, data)=>{
  if(err) return res.status(500).json(err);
  return res.status(200).json("Post has been created.");
});
  });
}
