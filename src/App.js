import './App.css';
import Weather from './components/weatherComponent';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <Weather />
      <FooterComponent />
    </div>
  );
}

export default App;
