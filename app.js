const request = require('request')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')
// const url = 'http://api.weatherstack.com/current?access_key=ee02141b52fbf84b3c76000603061b90&query=22.54111,88.33778'
// request({url:url,json:true},(error,response)=>{
//     console.log(response.body.current.weather_descriptions[0]+". It is currently "+response.body.current.temperature+" degree Celsius.")
// } 
// )
// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Kolkata.json?access_token=pk.eyJ1IjoiYWJjZGVmZ2gtMTIzNCIsImEiOiJja3RnMmd6ajIwZTU2MndtcjY4aDU5d2JzIn0.PV-6azLsfVAhXbYzMXUBSg&limit=1'
// request({url:geocodeURL, json:true},(error,response)=>{
//     if(error){
//         console.log('Unable to connect!')
//     }
//     else if(response.body.features.length==0){
//         console.log('Unable to find location. Try another search')
//     }
//     else{
//         const latitute = response.body.features[0].center[1]
//         const longitute = response.body.features[0].center[0]
//         console.log(latitute,longitute)
//     }
    
// })
const address = process.argv[2]
if(!address)
{
    console.log('Please provide a location.')
} else{
    geocode(address, (error,{latitude,longitute,location})=>{
        if(error){
        return console.log('Error', error);
        }
        forcast(latitude,longitute,(error,forcastData)=>{
        if(error){
            return console.log('Error',error)
        }
        console.log(location)
        console.log(forcastData)
        })
    })
    
}
