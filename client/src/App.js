import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./DesktopPages/Main";
import SignUp from "./DesktopPages/SignUp";
import Login from "./DesktopPages/Login";
import MissingDeatils from "./DesktopPages/Errors/MissingDetails/index";
import NoAccount from "./DesktopPages/Errors/NoAccountWithEmail";
import WrongPassword from "./DesktopPages/Errors/WrongPassword";
import SameUserExist from "./DesktopPages/Errors/SameUserExist";
import { useEffect, useState } from "react";

import SignUpMob from "./MobilePages/SignUp";
import MainMob from "./MobilePages/Main";
import LoginMob from "./MobilePages/Login";
import MissingDeatilsMob from "./MobilePages/Errors/MissingDetails";
import NoAccountMob from "./MobilePages/Errors/NoAccountWithEmail";
import WrongPasswordMob from "./MobilePages/Errors/WrongPassword";
import SameUserExistMob from "./MobilePages/Errors/SameUserExist";

function App() {
  let [isWebView, setIsWebView] = useState();
  useEffect(() => {
    // if (window.innerWidth <= 425) {
    //   setIsWebView(false);
    // } else {
    //   setIsWebView(true);
    // }
    // console.log(window.innerWidth, isWebView);
    if (
      window.navigator.userAgent.includes("Windows") ||
      window.navigator.userAgent.includes("Mac")
    ) {
      setIsWebView(true);
    } else {
      setIsWebView(false);
    }

    console.log(window.navigator.userAgent);
  }, [isWebView]);
  return (
    <div className="App">
      {isWebView === true ? (
        <>
          <Routes>
            <Route path="/" element={<Main></Main>}></Route>
            <Route path="/signup" element={<SignUp></SignUp>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route
              path="/missing-details"
              element={<MissingDeatils></MissingDeatils>}
            ></Route>
            <Route
              path="/no-account-found"
              element={<NoAccount></NoAccount>}
            ></Route>
            <Route
              path="/wrong-password"
              element={<WrongPassword></WrongPassword>}
            ></Route>
            <Route
              path="/same-user-already-exist"
              element={<SameUserExist></SameUserExist>}
            ></Route>
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<MainMob></MainMob>}></Route>
            <Route path="/signup" element={<SignUpMob></SignUpMob>}></Route>
            <Route path="/login" element={<LoginMob></LoginMob>}></Route>
            <Route
              path="/missing-details"
              element={<MissingDeatilsMob></MissingDeatilsMob>}
            ></Route>
            <Route
              path="/no-account-found"
              element={<NoAccountMob></NoAccountMob>}
            ></Route>
            <Route
              path="/wrong-password"
              element={<WrongPasswordMob></WrongPasswordMob>}
            ></Route>
            <Route
              path="/same-user-already-exist"
              element={<SameUserExistMob></SameUserExistMob>}
            ></Route>
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
