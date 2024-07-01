document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('darkModeToggle');
  
    // Check the current dark mode status
    chrome.storage.sync.get('darkMode', function (data) {
      toggle.checked = data.darkMode;
    });
  
    toggle.addEventListener('change', function () {
      const darkMode = toggle.checked;
  
      // Save the dark mode status
      chrome.storage.sync.set({ darkMode: darkMode });
  
      // Send a message to the content script to toggle dark mode
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { darkMode: darkMode });
      });
    });
  });
  