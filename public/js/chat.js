// Sidebar open/close logic for mobile
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebarOverlay = document.getElementById('sidebar-overlay');

function openSidebar() {
	sidebar.classList.add('open');
	sidebarOverlay.classList.add('open');
}
function closeSidebar() {
	sidebar.classList.remove('open');
	sidebarOverlay.classList.remove('open');
}

sidebarToggle.addEventListener('click', openSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

// Optional: close sidebar on resize if desktop
window.addEventListener('resize', () => {
	if (window.innerWidth > 900) {
		closeSidebar();
	}
});
// ChatMe - Client-side chat logic
// This is a basic implementation. Integrate with your backend/socket as needed.

const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const chatHistory = document.getElementById('chat-history');

// Example: Add a new chat to the sidebar (history)
function addChatToHistory(title = 'New Chat') {
	const li = document.createElement('li');
	li.textContent = title;
	li.classList.add('active');
	chatHistory.appendChild(li);
}


// Render a message in the chat area (generic)
function renderMessage(message, sender = 'user') {
	const msgDiv = document.createElement('div');
	msgDiv.className = `message ${sender}`;
	const bubble = document.createElement('div');
	bubble.className = 'bubble';
	bubble.textContent = message;
	msgDiv.appendChild(bubble);
	chatMessages.appendChild(msgDiv);
	chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Sender: User sends a message
function sendMessage(message) {
	renderMessage(message, 'user');
	// Integrate your AI call here, then call receiveMessage with the AI's response
	// Example (simulate AI):
	setTimeout(() => {
		receiveMessage('This is a bot response to: ' + message);
	}, 700);
}

// Receiver: AI/bot sends a message
function receiveMessage(message) {
	renderMessage(message, 'bot');
}

// Handle form submit (send message)
chatForm.addEventListener('submit', function(e) {
	e.preventDefault();
	const message = chatInput.value.trim();
	if (!message) return;
	sendMessage(message);
	chatInput.value = '';
});

// Initial setup
addChatToHistory('Chat with ChatMe');
