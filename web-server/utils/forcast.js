const request = require('request')
const forcast = ( latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=ee02141b52fbf84b3c76000603061b90&query='+latitude+','+longitude
    request({url,json:true},(error,{body})=>{
      if(error){
          callback('',undefined)
      } else if( body.error){
          callback('Unable to find forcast!',undefined)
      } else{
          callback(undefined," It is currently "+body.current.temperature+" degree Celsius out. It feels like " + body.current.feelslike +" degrees out")
      }
    })


}
module.exports = forcast