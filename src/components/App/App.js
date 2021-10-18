import CarbiTable from '../CarbiTable/CarbiTable'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="appTitle">
          Carbi
        </div>
      </header>
      <main>
        <CarbiTable className="carbiTable" />
      </main>
    </div>
  );
}

export default App;
