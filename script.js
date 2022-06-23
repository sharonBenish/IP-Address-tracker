var map = L.map('map').setView([6.45407, 3.39467], 15);

L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=v187E0AsRp0S7KRGvoij', {
attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(map);

var myIcon = L.icon({
iconUrl: './images/icon-location.svg',
iconSize: [30, 35],
iconAnchor: null,
popupAnchor: [-3, -76],
});

L.marker([6.45407, 3.39467], {icon: myIcon}).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();