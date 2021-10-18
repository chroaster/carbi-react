import CarbiTable from './components/carbiTable'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <span className="appTitle">Carbi</span>
      </header>
      <main>
        <CarbiTable className="carbiTable" />
      </main>
    </div>
  );
}

export default App;
