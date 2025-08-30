import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Profile from "./pages/profile/profile";
import MainPage from "./pages/mainPage/mainPage";
import Company from "./pages/company/company";
import CompanyDetail from "./pages/companyDetail/companyDetail";
import CompanyListings from "./pages/companyListings/companyListings";
import AppliedCompanies from "./pages/appliedCompanies/AppliedCompanies";
import Applications from "./pages/applications/Applications";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/login" exact element={ <Login/>}></Route> 
      <Route path="/register" exact element={ <Register/>}></Route> 
      <Route path="/profile" exact element={ <Profile/>}></Route> 
      <Route path="/mainPage" exact element={ <MainPage/>}></Route> 
      <Route path="/companyProfile/new" element={<Company />} />
      <Route path="/companyProfile/:companyId" exact element={ <Company/>}></Route>
      <Route path="/companyDetail/:companyId" element={<CompanyDetail />} />
      <Route path="/companyListings" element={<CompanyListings />} />
      <Route path="/appliedCompanies" element={<AppliedCompanies />} />
      <Route path="/applications/:jobId" element={<Applications />} />
      </Routes>
      </Router>
  );
}

export default App;
