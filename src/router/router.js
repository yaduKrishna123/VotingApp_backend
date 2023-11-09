const express=require('express')

const router=express.Router()
const auth=require('../logic/auth')
const chats=require('../logic/Chat')
const Allpool=require('../logic/pool')
router.post('/register',auth.userRegister)
router.post('/login',auth.Login)
router.post('/create',Allpool.Addpooldata)
router.post('/vote/:pollId/:optionIndex',Allpool.Pools)
router.get('/results/:pollId',Allpool.poolresult)
router.get('/allpolls',Allpool.AllData)
router.post('/chat', chats.sendChatMessage); // Send a chat message
router.get('/chat', chats.getChatMessages); // Retrieve chat messages
module.exports=router
