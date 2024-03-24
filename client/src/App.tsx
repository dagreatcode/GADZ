// import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getComments } from "./redux/actions/index";
import Home from "./containers/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import NotFound from "./containers/NotFound/NotFound";
import ContactUs from "./containers/ContactUs/ContactUs";
import AboutUs from "./containers/AboutUs/AboutUs";
import Login from "./containers/Login/Login";
import AdminLogin from "./containers/AdminLogin/AdminLogin";
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
import AdminUserProfile from "./containers/Admin/Users/UserProfile/UserProfile";
import Agreement from "./containers/AboutUs/globalassetdispatching/DispatchAgreement/Agreement/Agreement";


function App() {
  // // const comments = useSelector((state) => state.comments);
  // // const myPosts = useSelector((state) => state.myArticles);
  // const error = useSelector((state) => state.error);
  // const loading = useSelector((state) => state.loading);
  // // const reload = useSelector((state) => state.reload);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getComments());
  //   return () => {};
  // }, [dispatch]);

  // // useEffect(() => {
  // //   dispatch(getArticlesById());
  // //   // return () => {};
  // // }, [dispatch]);

  // if (error) {
  //   return <h1>{error}</h1>;
  // }

  // if (loading) {
  //   return <h1>Loading . . .</h1>;
  // }

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/Services" element={<Services />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/Bio" element={<Bio />} />
        <Route path="/Consultation" element={<Consultation />} />
        <Route path="/DispatchAgreement" element={<DispatchAgreement />} />
        <Route path="/Agreement" element={<Agreement />} />
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
      <Footer />
    </Router>
  );
}

export default App;
