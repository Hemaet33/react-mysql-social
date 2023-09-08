import { db } from "../connect.js";
import jwt from 'jsonwebtoken';

export const getUser = (req, res)=>{
  const token = req.cookies.accessToken;
  if(!token) return res.status(401).json("You did not log in.");

  jwt.verify(token, "secretKey",(err, userInfo)=>{
    if(err) return res.status(403).json("Invalid token!");

  const q = "SELECT users.id,users.name,users.coverPic,users.profilePic,users.city,users.website, posts.desc, posts.img FROM users JOIN posts ON (users.id=posts.userId) WHERE users.id=?";

    db.query(q,[req.params.userId], (err, data)=>{
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
