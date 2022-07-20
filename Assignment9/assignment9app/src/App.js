import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from "./Pages/home";
import About from "./Pages/about";
import Contact from "./Pages/contact";
import Jobs from "./Pages/jobs";

function App() {
  const [emailIdErr, setEmailIdErr] = useState("valid");
  const [passwordErr, setPasswordErr] = useState("valid");
  const [loginErr, setLoginErr] = useState("untested");
  const [emailIdValue, setEmailIdValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isloggedIn, setIsLoggeIn] = useState(false);

  return (
    <>
      {
        isloggedIn ? <Router>
          < Routes >
            <Route path="/" element={<Navigate replace to="/Home" />} />
            <Route path="/Home" element={<Home />}></Route>
            <Route path="/About" element={<About />}></Route>
            <Route path="/Contact" element={<Contact />}></Route>
            <Route path="/Jobs" element={<Jobs />}></Route>
          </Routes ></Router >
          :
          <div className='container loginContainer'>
            <form>
              <div className="mb-3">
                <label className="form-label">Email ID: </label>
                <input type="email" className="form-control" id="emailId" aria-describedby="emailId" onChange={(e) => { handleEmail(e) }} value={emailIdValue} />
                {emailIdErr === "empty" ? <div className="errMessage">
                  Enter Email Id
                </div> : emailIdErr === "invalid" ? <div className="errMessage">
                  Email ID nonconforming
                </div> : null}
              </div>
              <div className="mb-3">
                <label className="form-label">Password: </label>
                <input type="password" className="form-control" id="password" onChange={(e) => { handlePassword(e) }} value={passwordValue} />
                {passwordErr === "empty" ? <div className="errMessage">
                  Enter Password
                </div> : passwordErr === "invalid" ? <div className="errMessage">
                  Password nonconforming
                </div> : null}
              </div>
              <button type="submit" className="btn btn-primary" onClick={(e) => { handleSubmit(e) }}>Submit</button>
              {loginErr === "invalid" ? <div className="errMessage">
                Password does not match
              </div> : null}
            </form>
          </div>
      }

    </>

  );

  function handleEmail(e) {
    let val = e.target ? e.target.value ? e.target.value : null : e;
    setEmailIdValue(val)
    const EmailRegex = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+");
    if (!val) {
      setEmailIdErr("empty")
    } else if (!EmailRegex.test(val)) {
      setEmailIdErr("invalid")
    } else if (EmailRegex.test(val)) {
      setEmailIdErr("valid");
      return true
    } else {
      setEmailIdErr("untested");
    }
    return false
  }


  function handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()
    let isEmailValid = handleEmail(emailIdValue);
    let isPasswordValid = handlePassword(passwordValue);
    if (isEmailValid && isPasswordValid) {
      setLoginErr("valid")
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailID: emailIdValue, password: passwordValue })
      };

      fetch("http://localhost:3000/user/login", requestOptions)
        .then(res => res.json())
        .then((result => {
          console.log("result: " + result.errorCode);
          if (result && result.errorCode === 0) {
            setIsLoggeIn(true)
            console.log("success")
          } else {
            setLoginErr("invalid")
          }
        }))
    }
  }


  function handlePassword(e) {
    let val = e.target ? e.target.value ? e.target.value : null : e;
    setPasswordValue(val);
    const PasswordRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$");
    if (!val) {
      setPasswordErr("empty")
    } else if (!PasswordRegex.test(val)) {
      setPasswordErr("invalid")
    } else if (PasswordRegex.test(val)) {
      setPasswordErr("valid");

      return true;
    } else {
      setPasswordErr("untested");
    }
    return false;
  }

}

export default App;
