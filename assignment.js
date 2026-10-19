// Ratings are directory snapshots; live listing data and directions open in Google Maps.
const cafes = [
  ['Tim Hortons Saddar','Saddar',4.0,587,33.59309,73.05192],
  ["Gloria Jean’s Coffees Saddar",'Saddar',4.1,1251,33.5972,73.0550],
  ["Gloria Jean’s Coffees Bahria",'Bahria Town',4.2,1849,33.55512,73.12519],
  ['The Coffee Bean & Tea Leaf Bahria','Bahria Town',4.3,1664,33.5536,73.1232],
  ['Second Cup Jinnah Park','Chaklala',4.3,1031,33.5970,73.0872],
  ['Quetta Bolan Cafe Saddar','Saddar',4.3,783,33.5945,73.0560],
  ['Quetta Karachi Cafe Saddar','Saddar',4.3,23,33.5940,73.0545],
  ['Quetta Bilal Cafe Khanna Pul','Khanna',4.3,1694,33.5890,73.1250],
  ['Meseta Coffee Bahria Phase 4','Bahria Town',4.5,1095,33.5515,73.1228],
  ['Cafe Sol Bahria Phase 4','Bahria Town',4.3,703,33.5508,73.1220],
  ['BR 9 Cafe & Restaurant','Bahria Town',4.8,349,33.5530,73.1260],
  ['Sage Cafe & Grill','Bahria Town',4.8,553,33.5480,73.1260],
  ['Coffee Wagera Bahria','Bahria Town',4.6,139,33.5530,73.1290],
  ['Burning Brownie Bahria','Bahria Town',4.4,539,33.5500,73.1300],
  ['The 22/30 Cafe','Bahria Town',3.6,35,33.5520,73.1190],
  ['KHULA AASMAN Cafe','Bahria Town',4.2,820,33.5380,73.1370],
  ['Sports Hub Club & Cafe','Satellite Town',4.6,325,33.6370,73.0710],
  ['Creamado Satellite Town','Satellite Town',4.6,78,33.6380,73.0730],
  ['ISHQ CAFE','Satellite Town',4.1,415,33.6380,73.0690],
  ['The Gravity Cafe','Shamsabad',4.9,22,33.6530,73.0740],
  ['Quetta Chai Coffee','Bagh Sardaran',4.3,152,33.6120,73.0550],
  ['Cafe De Aroma','Sadiqabad',4.5,84,33.6260,73.0860],
  ['Petman’s Cafe','Saddar',4.3,140,33.5940,73.0490],
  ['Coffee Castle','Westridge',4.3,94,33.6120,73.0100],
  ['Dunkin Donuts Rawalpindi','Chaklala',4.0,154,33.6000,73.0920],
  ['Chaaye Khana DHA Phase 4','DHA Phase 4',4.6,738,33.5400,73.1050],
  ['Switch Coffee Company','DHA Phase 1',4.9,87,33.5550,73.0800],
  ['Caffinity Bahria Phase 7','Bahria Town',4.6,37,33.5570,73.1300],
  ['Bean | Breakfast and Coffee','Bahria Town',4.6,41,33.5550,73.1230],
  ['Tiger Lounge Cafe','Bahria Town',4.5,28,33.5580,73.1320],
  ['GreenO Bahria Town','Bahria Town',4.2,250,33.5590,73.1310],
  ['Quetta Chai Khana Cafe','Bahria Town',4.2,112,33.5520,73.1270],
  ['Coffee Beans Sports Pavilion','Chaklala Cantt',4.2,5,33.5900,73.0990],
  ['Beanz & Bites Lalkurti','Lalkurti',4.1,95,33.5840,73.0600],
  ['The Front Page Cafe','Rawalpindi',4.3,176,33.6070,73.0670],
  ['Pour Speciality Coffee','Bahria Town',3.7,53,33.5540,73.1220],
  ['Coffee Planet Chaklala Scheme 3','Chaklala',3.2,30,33.5980,73.1030]
].map((c,i)=>({id:String(i),name:c[0],area:c[1],rating:c[2],reviews:c[3],coords:[c[4],c[5]]}));
let selected=cafes[0], origin=null, routeLayer=null, originMarker=null;
const map=L.map('map',{zoomControl:false}).setView([33.60,73.09],12);
L.control.zoom({position:'bottomright'}).addTo(map);
const osmTiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
osmTiles.on('tileerror',()=>setStatus('Map tiles could not load. Check your internet connection and reload the page.'));
const cafeIcon=L.divIcon({className:'',html:'<div class="cafe-marker" aria-label="Café location">☕</div>',iconSize:[32,32],iconAnchor:[16,16]});
const meIcon=L.divIcon({className:'',html:'<div class="me"></div>',iconSize:[20,20],iconAnchor:[10,10]});
function mapsSearch(p){return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(p.name+' cafe '+p.area+' Rawalpindi');}
function showCafeDetails(p){
  document.getElementById('cafeDialogName').textContent=p.name;
  document.getElementById('cafeDialogArea').textContent=p.area+' · Rawalpindi, Pakistan';
  document.getElementById('cafeDialogRating').textContent=p.rating.toFixed(1)+'/5';
  document.getElementById('cafeDialogReviews').textContent='~'+p.reviews.toLocaleString()+' reviews';
  document.getElementById('cafeDialogPhone').innerHTML=p.phone?`<a href="tel:${p.phone}">${p.phone}</a>`:`No phone number is stored here. <a href="${mapsSearch(p)}" target="_blank" rel="noopener">See the current phone on Google Maps ↗</a>`;
  document.getElementById('cafeDialogOverview').textContent=`${p.name} is listed in ${p.area}, Rawalpindi. Check its Google Maps listing for the current business description, photos, menu, and opening hours.`;
  document.getElementById('cafeDialogMapsLink').href=mapsSearch(p);
  document.getElementById('cafeDialogMap').src=`https://maps.google.com/maps?output=embed&q=${encodeURIComponent(p.name+' '+p.area+' Rawalpindi')}&z=15`;
  const dialog=document.getElementById('cafeDialog');dialog.hidden=false;document.getElementById('closeCafeDialog').focus();
}
function closeCafeDetails(){const dialog=document.getElementById('cafeDialog');dialog.hidden=true;document.getElementById('cafeDialogMap').src='about:blank';}
function trafficUrl(p){const start=origin?`${origin[0]},${origin[1]}`:'Rawalpindi';return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(start)}&destination=${encodeURIComponent(p.name+' '+p.area+' Rawalpindi')}&travelmode=driving`;}
function timeBand(){const now=new Date(),h=now.getHours(),day=now.getDay();if(day!==0&&day!==6&&((h>=7&&h<10)||(h>=16&&h<20)))return {label:'Peak hour',factor:1.55};if(h>=10&&h<16||h>=20&&h<22)return {label:'Busy',factor:1.25};return {label:'Quieter hours',factor:1.08}}
function render(){const q=document.getElementById('search').value.trim().toLowerCase(),area=document.getElementById('areaFilter').value;const shown=cafes.filter(p=>(!q||p.name.toLowerCase().includes(q)||p.area.toLowerCase().includes(q))&&(area==='all'||p.area===area));document.getElementById('cafeList').innerHTML=shown.map(p=>`<article class="location ${p.id===selected.id?'active':''}" data-id="${p.id}"><div class="loc-title"><h2>${p.name}</h2><span class="pill">${p.area}</span></div><div class="address">Rawalpindi, Pakistan</div><div class="card-foot"><span class="rating">★ ${p.rating.toFixed(1)} <small>Directory snapshot · ~${p.reviews.toLocaleString()} reviews</small></span><button class="about-link" data-id="${p.id}">Details ↗</button></div></article>`).join('');document.getElementById('count').textContent=`${shown.length} café listings · Rawalpindi`;document.querySelectorAll('.location').forEach(el=>el.onclick=()=>select(cafes.find(p=>p.id===el.dataset.id)));document.querySelectorAll('.about-link').forEach(b=>b.onclick=e=>{e.stopPropagation();showCafeDetails(cafes.find(p=>p.id===b.dataset.id))});}
function select(p){selected=p;document.getElementById('mapPlace').textContent=p.area.toUpperCase();map.setView(p.coords,14);render();if(origin)drawRoute();else setStatus('Selected '+p.name+'. Select Use my location for a drive estimate.');}
function setStatus(t){document.getElementById('status').textContent=t}
async function drawRoute(){if(!origin)return;document.getElementById('distance').textContent='…';document.getElementById('duration').textContent='…';setStatus('Getting road route estimate…');try{const url=`https://router.project-osrm.org/route/v1/driving/${origin[1]},${origin[0]};${selected.coords[1]},${selected.coords[0]}?overview=full&geometries=geojson`;const res=await fetch(url);if(!res.ok)throw Error();const d=await res.json();if(d.code!=='Ok')throw Error();if(routeLayer)map.removeLayer(routeLayer);routeLayer=L.geoJSON(d.routes[0].geometry,{style:{color:'#98623e',weight:6,opacity:.9}}).addTo(map);map.fitBounds(routeLayer.getBounds(),{padding:[36,36],maxZoom:14});const band=timeBand(),mins=Math.max(1,Math.round(d.routes[0].duration/60*band.factor));document.getElementById('distance').textContent=(d.routes[0].distance/1000).toFixed(1)+' km';document.getElementById('duration').textContent=`~${mins} min`;document.getElementById('trafficBand').textContent=band.label;document.getElementById('liveTraffic').href=trafficUrl(selected);setStatus(`OSRM route plus ${band.label.toLowerCase()} time-of-day adjustment. Google Maps opens live traffic.`);}catch{setStatus('Routing unavailable. Open Google Maps for directions and current traffic.');document.getElementById('liveTraffic').href=trafficUrl(selected)}}
for(const p of cafes){p.marker=L.marker(p.coords,{icon:cafeIcon}).addTo(map).bindTooltip(p.name,{direction:'top'});p.marker.on('click',()=>select(p))}
document.getElementById('search').addEventListener('input',render);document.getElementById('areaFilter').addEventListener('change',render);
document.getElementById('locate').onclick=()=>{
  if(!navigator.geolocation){setStatus('This browser does not support location. Open this page in a current browser or use Google Maps.');return}
  if(!window.isSecureContext){setStatus('Browser location requires a secure page. Open the HTTPS site or run this page on localhost.');return}
  setStatus('Waiting for browser location permission…');
  navigator.geolocation.getCurrentPosition(pos=>{
    origin=[pos.coords.latitude,pos.coords.longitude];
    if(originMarker)map.removeLayer(originMarker);
    originMarker=L.marker(origin,{icon:meIcon}).addTo(map).bindPopup('Your location');
    map.setView(origin,12);
    drawRoute();
  },err=>{
    const message=err.code===1?'Location permission was denied. Allow location access for this site in your browser settings, then try again.':err.code===2?'Your device could not determine a location. Check that location services are enabled and try again.':'Location request timed out. Check device location services and try again.';
    setStatus(message);
  },{enableHighAccuracy:false,timeout:15000,maximumAge:60000});
};
document.getElementById('demo').onclick=()=>{origin=[33.5515,73.12275];if(originMarker)map.removeLayer(originMarker);originMarker=L.marker(origin,{icon:meIcon}).addTo(map).bindPopup('Sample origin · Bahria Town');drawRoute()};
document.getElementById('liveTraffic').onclick=e=>{if(!e.currentTarget.href||e.currentTarget.getAttribute('href')==='#')e.currentTarget.href=trafficUrl(selected)};
document.getElementById('liveTraffic').href=trafficUrl(selected);render();
document.getElementById('closeCafeDialog').addEventListener('click',closeCafeDetails);
document.querySelectorAll('[data-close-cafe]').forEach(el=>el.addEventListener('click',closeCafeDetails));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeCafeDetails()});

const landing=document.getElementById('landing');
landing.innerHTML=`<nav class="landing-nav"><div class="landing-brand"><span class="landing-brand-icon">☕</span><span>PINDI CAFÉ CRAWL</span></div><span class="landing-kicker">RAWALPINDI · PAKISTAN</span></nav><div class="landing-main"><div class="landing-copy"><div class="landing-kicker">37 LOCAL CAFÉ LISTINGS · WEBGIS LAB 03</div><h1 id="landingTitle">Rawalpindi’s<br><em>Café Crawl.</em></h1><p>Explore coffee spots across the city, compare local ratings, and find your next stop.</p></div><div class="landing-art"><div class="cup-scene" aria-hidden="true"><div class="cup-halo"></div><i class="steam one"></i><i class="steam two"></i><i class="steam three"></i><div class="cup-plate"></div><div class="hero-cup"></div><div class="float-card float-rating"><strong>★ 4.8</strong><small>Local favorite</small></div><div class="float-card float-area"><strong>Find a café nearby</strong></div></div><button class="landing-cta" id="enterApp">Explore the cafés <span>↗</span></button><span class="landing-quiet">Ratings · neighborhood map · drive estimates</span></div></div><footer class="landing-footer"><span>Laiba Rafi · 24-ARID-2217</span><span>Find your next coffee stop</span></footer>`;
document.getElementById('enterApp').addEventListener('click',()=>{
  const landing=document.getElementById('landing');
  const shell=document.getElementById('appShell');
  landing.classList.add('is-leaving');
  setTimeout(()=>{
    landing.hidden=true;
    shell.classList.remove('is-hidden');
    map.invalidateSize({pan:false});
    map.fitBounds(L.latLngBounds(cafes.map(p=>p.coords)),{padding:[36,36]});
  },560);
});

const cursorOrb=document.createElement('div');
cursorOrb.className='cursor-orb';
cursorOrb.setAttribute('aria-hidden','true');
document.body.append(cursorOrb);
window.addEventListener('pointermove',event=>{
  if(event.pointerType==='touch')return;
  cursorOrb.style.transform=`translate3d(${event.clientX}px,${event.clientY}px,0) translate(-50%,-50%)`;
});
window.addEventListener('pointerdown',()=>cursorOrb.classList.add('is-pressed'));
window.addEventListener('pointerup',()=>cursorOrb.classList.remove('is-pressed'));
window.addEventListener('blur',()=>cursorOrb.style.transform='translate3d(-100px,-100px,0) translate(-50%,-50%)');
document.querySelectorAll('.left,.right').forEach(panel=>panel.addEventListener('wheel',event=>{
  const multiplier=event.deltaMode===1?16:event.deltaMode===2?panel.clientHeight:1;
  panel.scrollTop+=event.deltaY*multiplier;
  event.preventDefault();
},{passive:false}));

