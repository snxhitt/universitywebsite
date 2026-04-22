// --- Mobile Menu Toggle ---
var navLinks = document.getElementById("navLinks");

function showMenu() {
    navLinks.style.right = "0";
}

function hideMenu() {
    navLinks.style.right = "-200px";
}

// --- Admission Form Validation ---
const admissionForm = document.getElementById('admissionForm');

if (admissionForm) {
    admissionForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent actual submission for demo

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const course = document.getElementById('course').value;

        if (name === "" || email === "" || phone === "" || course === "") {
            alert("Please fill in all required fields.");
            return;
        }

        // Simple Email Regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        alert("Application Submitted Successfully! We will contact you shortly.");
        admissionForm.reset();
    });
}

// --- Service Worker Registration ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then((registration) => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch((err) => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}