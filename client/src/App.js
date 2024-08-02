import {Reservation}  from "./View/Reservation"
import ReservationPayment from "./View/ReservationPayment"
import PaymentComplete from "./View/PaymentComplete";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";



function App() {
  return (
    <>
       <Router>
      <Routes>
        <Route path="/Reservation" element={<Reservation/>}/>
        <Route path="/ReservationPayment/:productName" element={<ReservationPayment />} />
        <Route path="/PaymentComplete" element={<PaymentComplete/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
