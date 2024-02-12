require('dotenv').config()
const express=require('express')
const expressLayout=require('express-ejs-layouts')
const methodOverride=require('method-override') 
const flash = require('connect-flash');
const session=require('express-session')

const connectDB=require('./server/config/db')


// Route files import
const authRouter = require("./server/routes/auth");
const userRouter = require("./server/routes/user");
const adminRouter = require("./server/routes/customer");


const app=express();
const port=process.env.PORT||5000

//connect to database
connectDB()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method'))

app.use(express.static('public'))

//session
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000 * 60*60*24*7, //1week
    }
}))
    //flash meassages

app.use(flash());
    



app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine','ejs')

//routes
app.use("/", authRouter);
app.use("/", userRouter);
app.use("/admin", adminRouter);


app.get("*",(req,res)=>{
    res.status(404).render('404')
})


app.listen(port,()=>{
    console.log(`app listening on the port:${port} \n link:http://localhost:${port}`)
})

module.exports=app