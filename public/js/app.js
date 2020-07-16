console.log("Client side script is loaded")



const weatherForm=document.querySelector("form")
const search=document.querySelector("input")
const message1=document.querySelector("#msg-1")
const message2=document.querySelector("#msg-2")

//message1.textContent="It's Working"
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    console.log(location)
    message1.textContent="Loading!...."
    message2.textContent=''
    fetch("http://localhost:3000/weather?location="+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            message1.textContent=data.error
        }
        else{
            console.log(data.data)
            message1.textContent=data.location
            message2.textContent="It is "+data.data.temperature+" outside. With a "+data.data.weather_code+" weather and precipitation type is "+data.data.precipitation_type
        }
        
    })
})
})