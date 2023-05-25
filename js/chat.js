const chatLink = document.querySelector('.chat-link');
const hoverbox = document.querySelector('.hoverbox');
const startChatButton = hoverbox.querySelector('button');

chatLink.addEventListener('click', function(event) {
  event.preventDefault();
  hoverbox.classList.toggle('show');

  if (hoverbox.classList.contains('show')) {
    startChatButton.style.display = 'block';
  } else {
    startChatButton.style.display = 'none';
    const chatWindow = hoverbox.querySelector('.chat-window');
    if (chatWindow) {
      chatWindow.remove();
    }
  }
});

startChatButton.addEventListener('click', function() {
  const chatWindow = document.createElement('div');
  chatWindow.classList.add('chat-window');
  chatWindow.innerHTML = `
    <div class="chat-header">
      <h4 class="chat-title">Live chat</h4>
    </div>
    <div class="chat-body">
      <div class="message incoming">Hello, how can we assist you?</div>
    </div>
    <textarea type="text" class="chatinput"></textarea>
    <button class="close-button">Close</button>
  `;

  const closeButton = chatWindow.querySelector('.close-button');
  closeButton.addEventListener('click', function() {
    hoverbox.classList.remove('show');
    chatWindow.remove();
  });

  startChatButton.style.display = 'none';
  hoverbox.appendChild(chatWindow);
});
