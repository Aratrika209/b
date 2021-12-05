const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')
const app = express()
const publicDirectoryPath = path.join(__dirname,'public')
const viewsPath = path.join(__dirname,'template/views')
const partialsPath = path.join(__dirname,'template/partials')
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))
app.get('', (req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Aratrika Roy'
    })
})
app.get('/help', (req,res)=>{
    res.render('help',{
        title:'Help',
        name: 'Aratrika Roy',
        helpText: 'This is some helpful text'
    })
})
app.get('/about', (req,res)=>{
    res.send('About')
})
app.get('/weather', (req,res)=>{
   if(!req.query.address){
       return res.send({
           error : 'You must provide an address!'
       })
    }
       geocode( req.query.address,(error,{latitude,longitude,location}={})=>{
           if(error){
               return res.send({error})
           }
           forcast(latitude, longitude,(error, forcastData)=>{
               if(error){
                   return res.send({error})
               }
               res.send({
                   forcast : forcastData,
                   location,
                   address: req.query.address
               })
           })
       })
   
})
app.get('*',(req,res)=>{
    res.send('404 page')
})
app.listen(3000,()=>{
    console.log('Server running in port 3000')
})