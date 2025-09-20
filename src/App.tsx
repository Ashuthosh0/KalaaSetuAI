import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ChatBotProvider } from './contexts/ChatBotContext';
import AppWrapper from './components/AppWrapper';

function App() {
  return (
    <AuthProvider>
      <ChatBotProvider>
        <Router>
          <Toaster position="top-right" />
          <AppWrapper />
        </Router>
      </ChatBotProvider>
    </AuthProvider>
  );
}

export default App;