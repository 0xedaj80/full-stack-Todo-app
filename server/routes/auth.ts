import jwt from "jsonwebtoken";
import express from 'express';
import { authenticateJwt, SECRET } from "../middleware/";
import { User } from "../db";
import {signupInput} from "@ajeet80/common"
// import {z} from 'zod'
const router =  express.Router();

 
// const signupInput = z.object({  //  
//     username:z.string().min(3).max(20),
//     password:z.string().min(3).max(10)
// })

  router.post('/signup', async (req, res) => {
    
    const parsedInput = signupInput.safeParse(req.body);
    if(!parsedInput.success){
       parsedInput.error
       res.status(411).json({
        error:"there was an error parsing input"
       })
       return;
    } 
  
     const username = parsedInput.data.username;
     const password = parsedInput.data.password;
     console.log("you reached here")    
     const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new User({ username, password });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
  });
  
  router.post('/login', async (req, res) => {
    console.log("reaah")
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });

    router.get('/me', authenticateJwt, async (req, res) => {
      const userId = req.headers["userId"]
      const user = await User.findOne({ _id:userId });
      if (user) {
        res.json({ username: user.username });
      } else {
        res.status(403).json({ message: 'User not logged in' });
      }
    });


export default router 