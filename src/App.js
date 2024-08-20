import './App.css';
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Contents from "./components/Contents.js";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Map from './components/Map.js';
import Tour from './components/Tour.js';
import Popup from './components/Popup.js';

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
<Routes>
<Route
      path="/Tour"
      element={<Tour />}
    />
<Route
      path="/Map"
      element={<Map />}
    />
<Route
      path="/"
      element={<Contents />}
    />
    <Route
      path="/"
      element={<Popup />}
    />
</Routes>
      <Footer />              
               
      </Router>

    </div>
  );
}

export default App;
