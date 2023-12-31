import jwt from 'jsonwebtoken';
import { db } from '../connect.js';
import moment from 'moment';

export const addStory = (req,res)=>{
  const token = req.cookies.accessToken;
  if(!token) return res.status(401).json("You are not logged in.");

  jwt.verify(token, "secretKey", (err, userInfo)=>{
    if(err) return res.status(403).json("Invalid token!");

    const q = "INSERT INTO stories (`img`,`userId`,`createdAt`) VALUES(?)";

    const values = [
      req.body.img,
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    ]

    db.query(q, [values], (err, data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json("You added a story.")
    });
  });
}

export const getStory = (req,res)=>{
  const token = req.cookies.accessToken;
  if(!token) return res.status(401).json("You are not logged in.");

  jwt.verify(token, "secretKey", (err, userInfo)=>{
    if(err) return res.status(403).json("Invalid token!");

    const q = "SELECT stories.*,users.name FROM stories JOIN users ON(stories.userId=users.id) LEFT JOIN relationships ON(stories.userId=relationships.followedUserId) WHERE relationships.followerUserId=?";

    const values = [
      userInfo.id
    ]

    db.query(q, values, (err, data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data)
    });
  });
}

export const deleteStory = (req, res)=>{
  const q = "DELETE FROM stories WHERE stories.userId=?"

  db.query(q, [req.params.userId],(err, data)=>{
    if(err) return res.status(500).json(err);
    return res.status(200).json("Stories have been deleted.");
  });
  
}