const map_element = document.querySelector("#map");
const map_btn = document.querySelector(".add-self");

const map = L.map(map_element).setView([51.505, -0.09], 3);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const issIcon = L.icon({
  iconUrl: "iss.png",
  shadowUrl: "iss-shadow.png",
  iconSize: [64, 25], // size of the icon
  shadowSize: [64, 25], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [22, 64], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const marker = L.marker([0.0, 0.0], { icon: issIcon });
marker.addTo(map);

const refreshIss = async () => {
  console.log("refresh!");
  const req = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
  const resp = await req.json();
  const coords = [resp.latitude, resp.longitude];
  map.setView(coords);
  marker.setLatLng(coords);
};

map_btn.addEventListener("click", async (_) => {
  let here = navigator.geolocation.getCurrentPosition((pos) => {
    const lat = pos.coords.latitude;
    const long = pos.coords.longitude;

    L.marker([lat, long]).addTo(map);

    map_btn.setAttribute("disabled", "true");
  });
  // await refreshIss();
});

refreshIss();
setInterval(refreshIss, 5000);
