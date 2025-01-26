(function() {
    // Initialize EmailJS with your public key
    emailjs.init("Jf5zHj5NqwcJJQo70");
})();

// Add event listener to the form
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Send form data using EmailJS
   
    emailjs.sendForm('service_rrdl2hs', 'template_67mn4qu', this)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Message sent successfully!');
        }, function(error) {
            console.error('FAILED...', error.text || error);
            alert(`Failed to send message: ${error.text || error}`);
        });
});

document.addEventListener("DOMContentLoaded", function() {
    const animatedHeader = document.getElementById("animated-header");

    // Function to create animation effect on the header text
    function animateText(element, text, interval) {
        let currentIndex = 0;
        element.innerHTML = '';
        const intervalId = setInterval(() => {
            if (currentIndex < text.length) {
                element.innerHTML += text[currentIndex];
                currentIndex++;
            } else {
                clearInterval(intervalId);
                setTimeout(() => { element.innerHTML = ''; animateText(element, text, interval); }, 2000); // Restart animation after 2s
            }
        }, interval);
    }

    // Apply the animation to the "Contact Me" text
    animateText(animatedHeader, "Contact Me", 200);

    // Chatbot functionality
    const chatInput = document.getElementById("chat-input");
    const chatOutput = document.getElementById("chat-output");
    const chatSubmit = document.getElementById("chat-submit");

    chatSubmit.addEventListener("click", function() {
        const userMessage = chatInput.value;
        if (userMessage.trim()) {
            displayMessage("User", userMessage);
            chatInput.value = "";
            setTimeout(() => {
                const response = getResponse(userMessage);
                displayMessage("Rahul", response);
                if (response.includes("submit the form")) {
                    document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
                }
            }, 1000);
        }
    });

    function displayMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.className = sender.toLowerCase() + "-message";
        messageElement.textContent = `${sender}: ${message}`;
        chatOutput.appendChild(messageElement);
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }

    function getResponse(message) {
        // Simple responses based on keywords
        if (message.toLowerCase().includes("portfolio")) {
            return "Mihir's portfolio showcases his skills in web designing, including HTML, CSS, and JavaScript.";
        } else if (message.toLowerCase().includes("qualified")) {
            return "Mihir is qualified with extensive experience in web development and a strong educational background.";
        } else if (message.toLowerCase().includes("experience")) {
            return "Mihir has several years of experience working on various web development projects.";
        } else {
            return "I'm here to help! For more details, please submit the form to connect with Mihir.";
        }
    }
});