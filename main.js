// Set target time — Philippine Time (UTC+8)
const launchDate = new Date();
launchDate.setHours(11, 30, 0, 0);  // Today @ 11:30 AM

// Display launch time as "11:30 AM" only
document.getElementById("launch-time").innerText =
    "Launching today at: " + launchDate.toLocaleTimeString("en-PH", { hour: '2-digit', minute: '2-digit' });

// Countdown function
function updateCountdown() {
    const now = new Date();
    const diff = launchDate - now;

    if (diff <= 0) {
        document.getElementById("countdown").style.display = "none";
        document.getElementById("launched").style.display = "block";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();
