document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('user-input').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});

function sendMessage() {
    var userMessage = document.getElementById('user-input').value;
    document.getElementById('user-input').value = '';

    var chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += '<div>User: ' + userMessage + '</div>';

    // Display loading spinner
    var spinner = new Spinner().spin();
    chatBox.appendChild(spinner.el);

    // Send the user message to the server
    fetch('/get_response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'user_message=' + encodeURIComponent(userMessage),
    })
    .then(response => response.json())
    .then(data => {
        // Remove loading spinner
        chatBox.removeChild(spinner.el);

        var botResponse = data.bot_response;
        chatBox.innerHTML += '<div class="animate__animated animate__bounce">Bot: ' + botResponse + '</div>';
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
    });
}
