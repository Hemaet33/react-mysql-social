import express from "express";
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import likeRoutes from './routes/likes.js';
import commentRoutes from './routes/comments.js';
import relationshipsRoutes from './routes/relationships.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';
const port = process.env.PORT || 8800;

const app = express();

//middlewares
app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Credentials", true);
  next()
})
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/relationships', relationshipsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/auth', authRoutes);

const storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null, "../fb-client/public/images")
  },
  filename: function(req, file, cb){
    cb(null, req.body.name)
  }
})

const upload = multer({storage:storage})

app.post('/api/upload', upload.single('file'),(req,res)=>{
  res.status(200).json("Image uploaded.");
})

app.listen(port,()=>{
  console.log(`Listening to the port 8800`);
});