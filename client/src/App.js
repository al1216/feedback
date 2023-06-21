import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./Pages/Main";
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import MissingDeatils from "./Pages/Errors/MissingDetails/index";
import NoAccount from './Pages/Errors/NoAccountWithEmail';
import WrongPassword from "./Pages/Errors/WrongPassword";
import SameUserExist from './Pages/Errors/SameUserExist';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path="/Signup" element={<SignUp></SignUp>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/missing-details" element={<MissingDeatils></MissingDeatils>}></Route>
        <Route path="/no-account-found" element={<NoAccount></NoAccount>}></Route>
        <Route path="/wrong-password" element={<WrongPassword></WrongPassword>}></Route>
        <Route path="/same-user-already-exist" element={<SameUserExist></SameUserExist>}></Route>
      </Routes>
    </div>
  );
}

export default App;
