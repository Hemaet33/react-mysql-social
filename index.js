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
import cloudinary from 'cloudinary';
const port = process.env.PORT || 8800;

cloudinary.config({
  cloud_name:"diiszoitk",
  api_key:"123949768584217",
  api_secret:"U8RXUrze8ixTBBZnV81Bm7VRV2g"
});

const app = express();

//middlewares
app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Credentials", true);
  next()
});
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials:true
}));
app.use(cookieParser());

app.use('/api/relationships', relationshipsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/auth', authRoutes);

const storage = multer.diskStorage({
  filename: function(req, file, cb){
    cb(null, req.body.name)
  }
})

const upload = multer({storage:storage})

app.post('/api/upload', upload.single('file'),(req,res)=>{
  cloudinary.uploader.upload(req.file.path, (error, result)=>{
    if(error) throw error;

    res.status(200).json({
      message:"Image uploaded.",
      data:result
    });
  });
})

app.listen(port,()=>{
  console.log(`Listening to the port 8800`);
});