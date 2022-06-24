const form = document.querySelector("form");
const input = form.querySelector("input");
const ipAddress = document.getElementById("ip-address");
const locationDiv = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");
const placeHolder = "Search for any IP address or domain";
const errorMsg ="Input valid IP address";
const errorIcon =document.getElementById("error-icon")
let ipKey='';
var map = L.map('map');
getLocation();

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log(input);
    ipKey = form.querySelector("input").value;
    console.log(ipKey)
    getLocation();
});

input.addEventListener('focus', (e)=>{
    e.target.classList.remove('error');
    e.target.placeholder=placeHolder;
    errorIcon.style.display="none"
})

function showMap(lat,lng, city){
    map.setView([+ lat, + lng], 15);
    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=v187E0AsRp0S7KRGvoij', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    }).addTo(map);

    var myIcon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [30, 35],
    iconAnchor: null,
    popupAnchor: [0, 0],
    });

    L.marker([+ lat, + lng], {icon: myIcon}).addTo(map)
        .bindPopup(city)
        .openPopup();

}

async function getLocation(){
    console.log("getting location");
   try{
        const res = await fetch ("https://geo.ipify.org/api/v2/country,city?apiKey=at_xvTscA4Pm0SAHH8GDLY7uc7KGI6Df&ipAddress="+ipKey);

        if (res.ok){
            console.log("ok")
            const json = await res.json();
            console.log(json);
            ipAddress.innerHTML = json.ip;
            locationDiv.innerHTML = `${json.location.city}, ${json.location.country}`;
            timezone.innerHTML = `USP ${json.location.timezone}`;
            isp.innerHTML = json.isp;
        
            showMap(json.location.lat, json.location.lng, json.location.city);
        }else{
            throw "error"
        }
   
   }catch(e){
        input.classList.add("error");
        input.placeholder = errorMsg;
        input.value="";
        errorIcon.style.display="block";
    }

}


//TO DO
    //add form validation
    //load the data faster
    