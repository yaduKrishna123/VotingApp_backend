const user=require('../schema/userschema')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
exports.userRegister=async(req,res)=>{


    const {username,email,password} =req.body;
    const chat=[]
    if (!username || !email || !password) {
        return res.status(400).json("Missing required fields");
      }
    
      const data = await user.findOne({ email });
    
      if (data) {
        return res.status(400).json("User already exists");
      }
    const hashedpassword=await bcrypt.hash(password,10)
      const newdata = new user({ username, email, password:hashedpassword,chat});
    
      await newdata.save();
    
      return res.status(200).json(newdata);
    }

exports.Login=async(req,res)=>{
    const {email,password}=req.body

    if(email==="" ||password===""){
        return res.status(401).json("fields cannot be empty")
    }
    const data=await user.findOne({email})
    if(data){
const comparepassword=bcrypt.compare(password,data.password)
if(comparepassword){
  const token=jwt.sign({loginid:email},"super")

  return res.status(200).json({data:data,token:token})
}
else{
  return res.status(401).json("username/password incorrect")
}

       





    }
    else{
        return res.status(401).json("user not found")
    }
    
}
