import {db} from '../connect.js';
import jwt from 'jsonwebtoken';

export const getRelationships = (req, res)=>{

  const token = req.cookies.accessToken;
  if(!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, "secretKey",(err, userInfo)=>{
    if(err) return res.status(403).json("Invalid token!");


  const q = "SELECT followerUserId FROM relationships WHERE followedUserId=?";

db.query(q,[req.params.followedUserId], (err, data)=>{
  if(err) return res.status(500).json(err);
  return res.status(200).json(data.map(relation=>relation.followerUserId));
});
  });
}

export const addRelationships = (req, res)=>{

  const token = req.cookies.accessToken;
  if(!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, "secretKey",(err, userInfo)=>{
    if(err) return res.status(403).json("Invalid token!");


  const q = "INSERT INTO relationships (`followerUserId`,`followedUserId`) VALUES(?)";

  const values = [
    userInfo.id,
    req.body.followedUserId
  ]

db.query(q,[values], (err, data)=>{
  if(err) return res.status(500).json(err);
  return res.status(200).json("You followed");
});
  });
}

export const removeRelationships = (req, res)=>{

  const token = req.cookies.accessToken;
  if(!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, "secretKey",(err, userInfo)=>{
    if(err) return res.status(403).json("Invalid token!");


  const q = "DELETE FROM relationships WHERE followerUserId=? AND followedUserId=?";


db.query(q,[userInfo.id,req.params.followedUserId], (err, data)=>{
  if(err) return res.status(500).json(err);
  return res.status(200).json("You unfollowed");
});
  });
}
