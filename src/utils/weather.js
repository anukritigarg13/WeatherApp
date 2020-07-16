const request=require("request")

const forecast=(latitude,longitude,callback)=>{
    var options = {
        method: 'GET',
        url: 'https://api.climacell.co/v3/weather/realtime',
        qs: {
           lat:latitude,
           lon:longitude,
           unit_system: 'si',
           fields: 'weather_code,temp,precipitation_type',
           apikey: 'QF4KyXGkNB3XfjVm49vCtNVYQCA10Gg5'
         },
         json:true
       }
      
      request(options,(error,{body})=>{
        if (error)// throw new Error(error);
        {
          callback("Unable to connect to weather service",undefined) 
        }
      //const dataJson=JSON.parse(response.body)
      //console.log(response.body)
        else if(body.errorCode){
          callback("Unable to find Location",undefined)
    
        }
      else{
        callback(undefined,{
          temperature:body.temp.value,
          weather_code:body.weather_code.value,
          precipitation_type:body.precipitation_type.value
        })
      }
  
      })
    }
  
module.exports=forecast
