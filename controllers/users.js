import { db } from "../connect.js";
import jwt from 'jsonwebtoken';

export const getUser = (req, res)=>{
  const token = req.cookies.accessToken;
  if(!token) return res.status(401).json("You did not log in.");

  jwt.verify(token, "secretKey",(err, userInfo)=>{
    if(err) return res.status(403).json("Invalid token!");

  const q = req.params.qu;
  
  const qp =q ? "SELECT users.id,users.name,users.coverPic,users.profilePic,users.city,users.website FROM users WHERE users.id=?" : "SELECT users.id,users.name,users.coverPic,users.profilePic,users.city,users.website, posts.desc, posts.img FROM users JOIN posts ON (users.id=posts.userId) WHERE users.id=?";

  const values=q?[req.params.userId]:[req.params.userId];
    db.query(qp,values, (err, data)=>{
      if(err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
}

export const updateUser = (req, res)=>{
  const token = req.cookies.accessToken;
  if(!token) return res.status(401).json("You did not log in.");

  jwt.verify(token, "secretKey",(err, userInfo)=>{
    if(err) return res.status(403).json("Invalid token!");

  const q = "UPDATE users SET `name`=?, `city`=?, `website`=?, `profilePic`=?, `coverPic`=? WHERE `id`=?";

  const values = [
    req.body.name,
    req.body.city,
    req.body.website,
    req.body.profilePic,
    req.body.coverPic,
    userInfo.id
  ]

    db.query(q, values, (err, data)=>{
      if(err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
}

export const getUsers = (req, res)=>{
  const token = req.cookies.accessToken;
  if(!token) return res.status(401).json("You did not log in.");

  jwt.verify(token, "secretKey",(err, userInfo)=>{
    if(err) return res.status(403).json("Invalid token!");

  const q = "SELECT users.id,users.profilePic,users.name FROM users JOIN relationships ON(users.id <> relationships.followerUserId) WHERE users.id NOT IN (SELECT users.id FROM users WHERE users.id=?)";

  const values = [
    userInfo.id
  ]

    db.query(q, values, (err, data)=>{
      if(err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
}

export const getPosts = (req, res)=>{
  const token = req.cookies.accessToken;
  if(!token) return res.status(401).json("You did not log in.");

  jwt.verify(token, "secretKey",(err, userInfo)=>{
    if(err) return res.status(403).json("Invalid token!");

  const q = "SELECT posts.id FROM posts WHERE posts.userId=?";

  const values = [
    req.params.userId
  ]

    db.query(q, values, (err, data)=>{
      if(err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
}

