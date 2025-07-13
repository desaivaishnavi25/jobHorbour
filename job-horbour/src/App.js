import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Profile from "./pages/profile/profile";
import TestPage from "./pages/testpage";

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
      <Route path="/testPage" exact element={ <TestPage/>}></Route> 
      </Routes>
      </Router>
  );
}

export default App;
