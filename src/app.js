const path=require("path")
const express=require("express")
const hbs=require("hbs")
const geocode=require("./utils/geocode.js")
const forecast=require("./utils/weather.js")
const app=express()

//define paths for Express Config
//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))
const pathViews=path.join(__dirname,'/templates/views')
const partialViews=path.join(__dirname,'/templates/partials')
//Setup Handlebars
app.set("view engine","hbs")
app.set("views",pathViews)
hbs.registerPartials(partialViews)
//setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name:"Anukriti Garg"
    })
})

app.get('/help',(req,res)=>{
    res.render("help",{
        title:"Help Page",
        contact:"23777-0000",
        name:"Anukriti Garg"
    })
})
app.get('/about',(req,res)=>{
     res.render("about",{
         title:"About Me",
         name:"Anukriti"
     })
 })
// app.get('/products',(req,res)=>{
//     if(!req.query.search){
//         return res.send({
//             error:"You must provide a search term"
//         })
//     }
//     console.log(req.query)
//     res.send({
//         product:[]
//     })
// })
app.get('/weather',(req,res)=>{
    if(!req.query.location){
        return res.send({
            error:"Please provide a location"
        })
    }
    geocode(req.query.location,(error,{latitude,longitude,location}={})=>{
        if(error){
          return res.send({
              error:error
          })
        }
        //console.log("Error",error)
        //console.log("Data",data)
        forecast(latitude,longitude, (error, forecastdata) => {
          if(error)
          {return res.send({
            error:error
        })}
          res.send({
              data:forecastdata, 
              location:location,
              address:req.query.location
          })
       })
      })
})
app.get("/help/*",(req,res)=>{
    res.render("404",{
        title:"400",
        name:"Anukriti",
        errorMessage:"Help article not Found"
    })
})
app.get("*",(req,res)=>{
    res.render("404",{
        title:"400",
        name:"Anukriti",
        errorMessage:"Page not Found"
    })
})
app.listen(3000,()=>{
    console.log("Server is up on port 3000")
})