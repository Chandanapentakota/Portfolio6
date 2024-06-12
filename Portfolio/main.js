document.addEventListener('DOMContentLoaded', () => {
    // Initialize menu toggling
    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');

    menuIcon.addEventListener("click", () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });

    // Highlight active section in the navbar
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');

    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY;
        sections.forEach(section => {
            let offset = section.offsetTop - 150;
            let height = section.offsetHeight;
            let id = section.getAttribute('id');

            if (scrollPosition >= offset && scrollPosition < offset + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    let activeLink = document.querySelector(`header nav a[href*=${id}]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                });
            }
        });

        let header = document.querySelector('header');
        header.classList.toggle('sticky', scrollPosition > 100);

        // Close navbar on scroll
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });

    // Initialize EmailJS (move outside the function to initialize only once)
    emailjs.init("nmrrciWGTh8SDikzG");

    // Event listener for form submission
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission
        sendMessage();
    });
});

function sendMessage() {
    let serviceID = "service_fdz1fws";
    let templateID = "template_cvxss94";

    let params = {
        fullNameInput: document.getElementById("name").value,
        emailInput: document.getElementById("email").value,
        mobileInput: document.getElementById("mobileno").value,
        subjectInput: document.getElementById("subject").value,
        messageTextarea: document.getElementById("message").value,
    };

    if (!params.fullNameInput || !params.emailInput || !params.mobileInput || !params.subjectInput || !params.messageTextarea) {
        alert('Please fill in all fields.');
        return;
    }

    emailjs.send(serviceID, templateID, params)
        .then(response => {
            alert(`Thank you, ${params.fullNameInput}. Your message has been sent!`);
            document.getElementById('contactForm').reset(); // Reset the form after successful submission
        })
        .catch(error => {
            console.error('Failed to send message:', error);
        });
}
