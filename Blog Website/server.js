const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const articalRouter = require("./routes/articles");
const Article = require("./models/article");
const methodOverride = require("method-override");
const app = express();
dotenv.config();
const PORT = 3000 || process.env.PORT;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;


mongoose
.connect(`mongodb+srv://${username}:${password}@cluster0.82rhfhc.mongodb.net/BlogWebsite`)
.then(
    console.log(`DB is connected`)
);


app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));
app.get("/",async(req,res)=>{
    const articles = await Article.find().sort({createdAt:'desc'});
    res.render("articles/index",{articles:articles});
});
app.use('/articles',articalRouter);
app.listen(PORT,(req,res)=>{
    console.log(`server is upon running on ${PORT}`);
});