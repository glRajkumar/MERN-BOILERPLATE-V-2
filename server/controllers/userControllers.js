const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/auth')
const upload = require("../middlewares/upload")
require('dotenv').config()

router.post('/register', async (req,res) => {
    let {name, email, password} = req.body

    try {
        const userExist = await User.findOne({email})
        if(userExist) return res.status(400).json({ msg: "Email is already exists" })
        
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        let user = new User({email , name, password: hash})
        await user.save()
        res.json({ msg: "User Saved successfully" })
        
    } catch (error) {
        res.status(400).json({ error, msg:"User Creation failed" })
    }
    // let user = new User({email , name, password})
    // user.password = hash
})

router.post('/login', async (req, res)=>{
    let {email, password} = req.body
    try {
        let user = await User.findOne({email})
        if(!user) return res.status(401).json({ msg: "cannot find user in db" })
        
        let result = await bcrypt.compare(password, user.password)
        if(!result) return res.status(400).json({ msg: "password not matched" })
        
        let payload = {userId : user._id}
        let token = jwt.sign(payload, process.env.jwtSecretKey , { expiresIn: '18h' })
        user.token = user.token.concat(token)
        await user.save()            
        res.json({token, user})        

    } catch (error) {
        res.status(400).json({ error, msg:"User LogIn failed" })
    }
})

router.get('/me', auth, (req,res)=> res.send(req.user))

router.post('/upload', auth, upload.single("img"), async (req, res)=>{
    try {
        const user = await User.findOne({"_id": req.user._id})
        user.img = req.file.filename
        await user.save()
        res.json({img : req.file.filename})
    } catch (error) {
        res.status(400).json({ error, msg: "User image upload failed" })
    }
})

router.put('/', auth, async (req,res) => {
    let { oldPass, newPass } = req.body

    try {
        const user = await User.findOne({"_id": req.user._id})
        if(!user) return res.status(401).json({ msg: "cannot find user in db" })

        let result = await bcrypt.compare(oldPass, user.password)
        if(!result) return res.status(400).json({msg: "password not matched"})
        
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newPass, salt)
        user.password = hash
        await user.save()
        res.json({ msg: "User password Saved successfully" })    
        
    } catch (error) {
        res.status(400).json({ error, msg: "User Password update failed" })
    }
})

router.post("/logout", auth, async (req, res)=>{
    let {user, token} = req
    
    try {
        user.token =  user.token.filter(t => t!=token)
        await user.save()
        res.json({ msg: "User Logged Out successfully" })
    } catch (error) {
        res.status(400).json({ error, msg:"User LogOut failed" })
    }
    //it worked without finding the user so try it for timing in future
})

router.delete("/", auth, async (req, res)=>{
    let user = req.user
    
    try {
        await User.findByIdAndRemove(user._id)
        res.send("User delete successfully")
    } catch (error) {
        res.status(400).json({ error, msg:"User deletion failed" })
    }
})

module.exports = router