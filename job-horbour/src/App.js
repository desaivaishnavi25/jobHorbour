import Login from "./pages/login/login";
import Register from "./pages/register/register";

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
      </Routes>
      </Router>
  );
}

export default App;
