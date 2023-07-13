import './App.scss';
import VideoChat from './VideoChat';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Video Chat with Hooks</h1>
      </header>
      <main>
        <VideoChat />
      </main>
      <footer>
        <p>
          Made with{' '}
          <span role="img" aria-label="React">
            ⚛️
          </span>{' '}
          by <a href="https://salvatore-dininni.com">Salvatore Dininni</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
