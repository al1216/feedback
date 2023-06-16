import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./Pages/Main";
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path="/Signup" element={<SignUp></SignUp>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
    </div>
  );
}

export default App;
