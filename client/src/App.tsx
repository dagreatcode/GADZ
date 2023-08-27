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
import Services from "./containers/Services/Services";


function App() {





  return (
    <Router>
          <NavBar />
          <Routes>
            <Route path="/Services" element={<Services />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      
    </Router>
  );
}

export default App;
