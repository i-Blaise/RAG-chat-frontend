import { ChatContainer } from './components/chat/ChatContainer';

function App() {
  return (
    <div className="h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-4xl h-full max-h-[900px] shadow-2xl rounded-2xl overflow-hidden bg-background ring-1 ring-slate-900/5">
        <ChatContainer />
      </div>
    </div>
  );
}

export default App;
