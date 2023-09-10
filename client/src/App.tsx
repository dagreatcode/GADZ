import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";

import Home from "./containers/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import NotFound from "./containers/NotFound/NotFound";
import ContactUs from "./containers/ContactUs/ContactUs";
import AboutUs from "./containers/AboutUs/AboutUs";
import Bio from "./containers/AboutUs/globalassetdispatching/Biography/Bio";
import Consultation from "./containers/AboutUs/globalassetdispatching/ConsultationForm/Consultation";
import DispatchAgreement from "./containers/AboutUs/globalassetdispatching/DispatchAgreement/DispatchAgreement";
import RoadFreight from "./containers/AboutUs/globalassetdispatching/RoadFreight/RoadFreight";
import Admin from "./containers/Admin/Admin";
import B2BMessages from "./containers/Admin/B2BMessages/B2BMessages";
import Dash from "./containers/Admin/Dash/Dash";
import PrintOut from "./containers/Admin/PrintOut/PrintOut";
import TicketsCreated from "./containers/Admin/Tickets/TicketsCreated";
import Services from "./containers/Services/Services";
import User from "./containers/User/User";
import AvailableTable from "./containers/User/AvailableTable/AvailableTable";
import UserProfile from "./containers/User/AvailableTable/UserProfile/UserProfile";
import MessageUser from "./containers/User/AvailableTable/UserProfile/MessageUser/MessageUser";
import Checkout from "./containers/User/Checkout/Checkout";
import CreateTicket from "./containers/User/IT-Ticket/CreateTicket";
import Profile from "./containers/User/Profile/ProfileUpdate";
import UserDash from "./containers/User/UserDash/Dash";
import AdminAllUsers from "./containers/Admin/Users/AllUsers";
import AdminUserProfile from "./containers/Admin/Users/UserProfile/UserProfile"



function App() {
  return (
    <Router>
       <NavBar />
          <Routes>
            <Route path="/Services" element={<Services />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/Bio" element={<Bio />} />
            <Route path="/Consultation" element={<Consultation />} />
            <Route path="/DispatchAgreement" element={<DispatchAgreement />} />
            <Route path="/RoadFreight" element={<RoadFreight />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/AdminAllUsers" element={<AdminAllUsers />} />
            <Route path="/AdminUserProfile" element={<AdminUserProfile />} />
            <Route path="/B2BMessages" element={<B2BMessages />} />
            <Route path="/Dash" element={<Dash />} />
            <Route path="/PrintOut" element={<PrintOut />} />
            <Route path="/TicketsCreated" element={<TicketsCreated />} />
            <Route path="/User" element={<User />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/AvailableTable" element={<AvailableTable />} />
            <Route path="/UserProfile" element={<UserProfile />} />
            <Route path="/MessageUser" element={<MessageUser />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/CreateTicket" element={<CreateTicket />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/UserDash" element={<UserDash />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
    </Router>
  );
}

export default App;
