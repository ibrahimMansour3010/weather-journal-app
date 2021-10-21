
// Personal API Key for OpenWeatherMap API
const date = new Date().toLocaleString();
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=" 
const apiKey = ",us&appid=09b6ab3f56dc04729c961a08325312c3&units=metric";
const server = "http://127.0.0.1:4000";

// Event listener to add function to existing HTML DOM element
const generateData = ()=>{
    
    const zipCode = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    getData(zipCode).then((data)=>{
        if(data){
            const{
                main:{temp},
                name:city,
            } = data;

            const info = {
                date,
                city,
                temp:Math.round(temp),
                feelings,
            };
            console.log(data);
            postData(server+"/add",info);
            updateURL();
        }
    })
}
/* Function called by event listener */
document.getElementById("generate").addEventListener("click",generateData);
/* Function to GET Web API Data*/

const getData = async (zipCode)=>{
    try {
        let res = await fetch(baseURL + zipCode + apiKey);
        let data = await res.json();
        if(data.cod == 200){
            console.log(date);
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

/* Function to POST data */
const postData = async (url = "",info = {})=>{
    const res = await fetch (url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(info),
    });
    try {
        const newData = await res.json();
        console.log("data : ",newData);
        return newData;
    } catch (error) {
        console.log(error);
    }
}

/* Function to GET Project Data */
const updateURL = async ()=>{
    const res = await fetch(server + "/all");
    try {
        const savedData = await res.json();

        document.getElementById("city").innerHTML = savedData.city;
        document.getElementById("date").innerHTML = savedData.date;
        document.getElementById("temp").innerHTML = savedData.temp + ' &#8451';
        document.getElementById("content").innerHTML = savedData.feelings;

    } catch (error) {
        console.log(error);
    }
}

