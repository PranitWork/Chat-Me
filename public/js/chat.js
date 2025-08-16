(function () {
			// Chat elements
			const chatForm = document.getElementById('chat-form');
			const chatInput = document.getElementById('chat-input');
			const chatMessages = document.getElementById('chat-messages');

		

			// Render message in chat
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

			// Send message
			function sendMessage(message) {
				renderMessage(message, 'user');
				socket.emit("ai-message", message); // Send to server
			}

			// Listen for AI responses
			socket.on("ai-message-response", (data) => {
				const text = typeof data === 'string' ? data : data.content || '';
				if (text.trim()) {
					renderMessage(text, 'bot');
				}
			});

			// Form submit
			chatForm.addEventListener('submit', function (e) {
				e.preventDefault();
				const message = chatInput.value.trim();
				if (!message) return;
				sendMessage(message);
				chatInput.value = '';
			});
		})();