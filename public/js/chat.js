 (function () {
      // Sidebar logic
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

      window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
          closeSidebar();
        }
      });

      // Chat elements
      const chatForm = document.getElementById('chat-form');
      const chatInput = document.getElementById('chat-input');
      const chatMessages = document.getElementById('chat-messages');
      const chatHistory = document.getElementById('chat-history');

      // Socket.IO init
      const socket = io();

      socket.on("connect", () => {
        console.log("✅ Connected to server:", socket.id);
      });

      socket.on("disconnect", () => {
        console.log("❌ Disconnected from server");
      });

      // Add a new chat to the history
      function addChatToHistory(title = 'New Chat') {
        const li = document.createElement('li');
        li.textContent = title;
        li.classList.add('active');
        chatHistory.appendChild(li);
      }

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

      // Init
      addChatToHistory('Chat with ChatMe');
    })();