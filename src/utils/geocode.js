const request=require('request')
const geocode=(address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiYW51a3JpdGlnYXJnMTMiLCJhIjoiY2tjbTFoeWwwMjNhYzJ3bHB1eXZqYWlsMiJ9.tk_D26lFjpeudXhHN7P6Nw&limit=1"
    request({url,json:true},function(error,{body}){
      if(error){
        callback('Unable to connect to location services',undefined)
      }
      else if(body.features.length===0){
        callback('Unable to find location',undefined)
      }else{
        callback(undefined,{
          latitude:body.features[0].center[1],
          longitude:body.features[0].center[0],
          location:body.features[0].place_name
  
        })
      }
  
    })
  
  }
module.exports=geocode