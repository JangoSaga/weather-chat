# Weather Agent Chat Interface

A modern React chat interface for interacting with a weather agent API. Built with Vite, React, and Tailwind CSS with a clean, minimalist design inspired by modern chat applications.


**Deployed Link**: https://weather-chat-mu.vercel.app/

## Features

### Core Chat Functionality
- 💬 **Real-time Chat**: Interactive chat interface with user and agent messages
- 🔄 **Streaming Responses**: Live streaming of agent responses as they're generated
- ⌨️ **Keyboard Shortcuts**: Send messages with Enter, new line with Shift+Enter
- 🔄 **Auto-scroll**: Automatically scrolls to latest messages
- ⚠️ **Error Handling**: Graceful error handling and display
- 🗑️ **Thread Deletion**: Delete unwanted conversations
- 💾 **Persistent Storage**: All threads saved to localStorage

### UI/UX Features
- 🌙 **Dark/Light Mode**: Toggle between themes with persistent preference
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🎨 **Modern Interface**: Clean design matching contemporary chat applications
- 💡 **Smart Suggestions**: Pre-populated question suggestions for new conversations
- ⚡ **Fast Performance**: Optimized with Vite for quick loading
- 📅 **Timestamps**: Message timing for better context
- 🎯 **Loading States**: Clear visual feedback during API calls

## Project Structure

```
src/
├── components/
│   ├── ChatBox.jsx       
│   ├── Messages.jsx      
│   ├── Message.jsx    
│   ├── ChatInput.jsx        
│   └── Loading.jsx
│   └── other UI components
├── hooks/
│   └── useWeatherAgent.js   # Custom API hook for streaming
│   └── useChat.js   
│   └── useDarkMode.js   
├── App.jsx                  
├── main.jsx                 
└── index.css                
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Create project directory**
```bash
mkdir weather-agent-chat
cd weather-agent-chat
```

2. **Install dependencies**
```bash
npm install
```


3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```bash
Navigate to `http://localhost:5173`
```




