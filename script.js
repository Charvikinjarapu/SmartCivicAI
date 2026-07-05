const d=document;
let loc=null;
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
if(SR){
 const r=new SR();r.lang='en-US';
 d.getElementById('mic').onclick=()=>r.start();
 r.onresult=e=>d.getElementById('desc').value=e.results[0][0].transcript;
}
d.getElementById('loc').onclick=()=>{
 navigator.geolocation.getCurrentPosition(p=>{
  loc={lat:p.coords.latitude,lng:p.coords.longitude};
  d.getElementById('coords').textContent=`Location: ${loc.lat}, ${loc.lng}`;
 },()=>alert('Location denied'));
};
d.getElementById('submit').onclick=()=>{
 const complaint={
  title:d.getElementById('title').value,
  description:d.getElementById('desc').value,
  photo:d.getElementById('photo').files[0]?.name||'No photo',
  location:loc,
  status:'Forwarded to Municipal Operations (Prototype)',
  time:new Date().toLocaleString()
 };
 d.getElementById('status').textContent='Complaint submitted successfully.\n\nThis is a prototype demonstrating forwarding to a municipal system.';
 d.getElementById('dashboard').innerHTML=`<b>Latest Complaint</b><br>
 Title: ${complaint.title}<br>
 Description: ${complaint.description}<br>
 Photo: ${complaint.photo}<br>
 Location: ${complaint.location?complaint.location.lat+', '+complaint.location.lng:'Unavailable'}<br>
 Status: ${complaint.status}<br>
 Time: ${complaint.time}`;
};
};
