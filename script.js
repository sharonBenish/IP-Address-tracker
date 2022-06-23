const form = document.querySelector("form");
const input = form.querySelector("input");
const ipAddress = document.getElementById("ip-address");
const locationDiv = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");
let ipKey='';
var map = L.map('map');
getLocation();

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log(input);
    ipKey = form.querySelector("input").value;
    console.log(ipKey)
    getLocation();
})

function showMap(lat,lng){
    map.setView([+ lat, + lng], 15);
    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=v187E0AsRp0S7KRGvoij', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    }).addTo(map);

    var myIcon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [30, 35],
    iconAnchor: null,
    popupAnchor: [-3, -76],
    });

    L.marker([+ lat, + lng], {icon: myIcon}).addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();

}

async function getLocation(){
    const res = await fetch ("https://geo.ipify.org/api/v2/country,city?apiKey=at_xvTscA4Pm0SAHH8GDLY7uc7KGI6Df&ipAddress="+ipKey);
    const json = await res.json();
    ipAddress.innerHTML = json.ip;
    locationDiv.innerHTML = `${json.location.city}, ${json.location.country}`;
    timezone.innerHTML = `USP ${json.location.timezone}`;
    isp.innerHTML = json.isp;

    showMap(json.location.lat, json.location.lng);
}


//TO DO
    //add form validation
    //load the data faster
    