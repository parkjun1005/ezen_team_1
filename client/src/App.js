import React from "react";
import { Reservation } from "./View/Reservation";
import ReservationPayment from "./View/ReservationPayment";
import PaymentComplete from "./View/PaymentComplete";
import MemBership from "./View/MemBership";
import Login from "./View/Login";
import FindId from "./View/FindId";
import FindPassword from "./View/FindPassword";
import Consent from "./View/Consent";
import Information from "./View/Information";
import { AuthProvider } from './Component/AuthContext';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Detailreview from "./View/Detailreview";
import NewsEvent from "./View/NewsEvent";
import Reviewwrite from "./View/Reviewwrite";
import Reviewlist from "./View/Reviewlist";
import Eventlist from "./View/Eventlist";
import Newswrite from "./View/Newswrite";
import Editreview from "./View/Editreview";
import EditNewsEvent from "./View/EditNewsEvent";
import { ReviewProvider } from "./Component/ReviewContext";
import { NewsProvider } from "./Component/NewsContext";
import CampingRoom from "./View/CampingRoom";
import Community from "./View/Community";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import Tour from "./Component/Tour";
import Map from "./Component/Map";
import Contents from "./Component/Contents";
import RoomCheck from "./View/RoomCheck";
function App() {
  return (
    <AuthProvider>
    <ReviewProvider>
      <NewsProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/Tour" element={<Tour />} />
            <Route path="/Map" element={<Map />} />
            <Route path="/" element={<Contents />} />
            <Route path="/Reservation" element={<Reservation />} />
            <Route
              path="/ReservationPayment/:productName"
              element={<ReservationPayment />}
            />
            <Route path="/PaymentComplete" element={<PaymentComplete />} />
            <Route path="/Detailreview/:id" element={<Detailreview />} />
            <Route path="/Newsevent/:id" element={<NewsEvent />} />
            <Route path="/Reviewwrite" element={<Reviewwrite />} />
            <Route path="/Reviewlist" element={<Reviewlist />} />
            <Route path="/Eventlist" element={<Eventlist />} />
            <Route path="/Newswrite" element={<Newswrite />} />
            <Route path="/Editreview/:id" element={<Editreview />} />
            <Route path="/register" element={<MemBership />} />
            <Route path="/login" element={<Login />} />
            <Route path="/findId" element={<FindId />} />
            <Route path="/findpassword" element={<FindPassword />} />
            <Route path="/Consent" element={<Consent />} />
            <Route path="/information" element={<Information />} />
            <Route path="/EditNewsevent/:id" element={<EditNewsEvent />} />{" "}
            <Route path="/CampingRoom" element={<CampingRoom />} />{" "}
            <Route path="/Community" element={<Community />} />{" "}
            <Route path="/RoomCheck" element={<RoomCheck />} />
          </Routes>
          <Footer />
        </Router>
      </NewsProvider>
    </ReviewProvider>
    </AuthProvider>
  );
}

export default App;
