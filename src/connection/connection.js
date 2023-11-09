const mongoose=require('mongoose')
const db=process.env.DATABASE
mongoose.connect(db,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log(`MongoDB database is connected successfully`);
})