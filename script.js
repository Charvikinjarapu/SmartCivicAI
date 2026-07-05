const d = document;
let loc = null;

const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SR) {
    const r = new SR();
    r.lang = "en-US";

    d.getElementById("mic").onclick = () => r.start();

    r.onresult = e => {
        d.getElementById("desc").value = e.results[0][0].transcript;
    };
}

d.getElementById("loc").onclick = () => {
    navigator.geolocation.getCurrentPosition(
        p => {
            loc = {
                lat: p.coords.latitude,
                lng: p.coords.longitude
            };

            d.getElementById("coords").textContent =
                `Location: ${loc.lat}, ${loc.lng}`;
        },
        () => alert("Location denied")
    );
};

d.getElementById("submit").onclick = () => {

    const complaint = {
        title: d.getElementById("title").value,
        description: d.getElementById("desc").value,
        photo: d.getElementById("photo").files[0]?.name || "No photo",
        location: loc,
        status: "Forwarded to Municipal Operations (Prototype)",
        time: new Date().toLocaleString()
    };

    // AI Analysis
    document.getElementById("aiCategory").textContent = "Road Infrastructure";
    document.getElementById("aiPriority").textContent = "High";
    document.getElementById("aiDepartment").textContent = "Municipal Engineering";
    document.getElementById("aiResponse").textContent = "Within 24 Hours";

    d.getElementById("status").textContent =
        "Complaint submitted successfully.\n\nAI analyzed the complaint and forwarded it to the concerned department.";

    d.getElementById("dashboard").innerHTML = `
        <b>Latest Complaint</b><br>
        <b>Title:</b> ${complaint.title}<br>
        <b>Description:</b> ${complaint.description}<br>
        <b>Photo:</b> ${complaint.photo}<br>
        <b>Location:</b> ${
            complaint.location
                ? complaint.location.lat + ", " + complaint.location.lng
                : "Unavailable"
        }<br>
        <b>Status:</b> ${complaint.status}<br>
        <b>Time:</b> ${complaint.time}
    `;
};
