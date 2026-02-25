import { ChatContainer } from './components/chat/ChatContainer';

function App() {
  return (
    <div className="h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-3xl h-[90vh] max-h-[800px] shadow-2xl rounded-2xl overflow-hidden bg-background ring-1 ring-slate-900/5">
        <ChatContainer />
      </div>
    </div>
  );
}

export default App;
