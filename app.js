const express = require("express"); //Подключаем express 
const mongoose = require("mongoose"); //Подключаем mongoose
const passport = require("passport"); //Подключаем passport
const path = require("path");
const authRoutes = require("./Routes/auth");
const feedbackRoutes = require("./Routes/feedback");
const galleryRoutes = require("./Routes/gallery");
const historyRoutes = require("./Routes/history");
const mainRoutes = require("./Routes/main");
const staffRoutes = require("./Routes/staff");
const adminPanel = require("./Routes/adminPanel");
const keys = require("./config/keys");
const app = express(); //Создаем экземпляр express

mongoose.connect(keys.MongoURI).then(()=>console.log('Db connected')).catch(error=>console.log(error)); // Подключение к монгоБД

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(require("cors")());  // обработка cors запросов (от людей на других доменах)
app.use(require("morgan")("dev")); // Более удобное логирование (для отслеживания состояния сервера) 
app.use(require("body-parser").urlencoded({extended:true})); //Подключаем body-parser (работа с json-ами) 
app.use(require("body-parser").json());
app.use('/uploads', express.static('uploads'))


//Используемые роуты
app.use('/api/auth/', authRoutes);
app.use('/api/feedback/', feedbackRoutes);
app.use('/api/gallery/', galleryRoutes);
app.use('/api/history/', historyRoutes);
app.use('/api/main/', mainRoutes);
app.use('/api/staff/', staffRoutes);
app.use('/api/adminPanel/', passport.authenticate('jwt', {session:false}), adminPanel);

if(process.env.NODE_ENV==='production'){
    app.use(express.static('front/dist/front'))
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'front', 'dist', 'front', 'index.html'))
    })
}

module.exports = app;
