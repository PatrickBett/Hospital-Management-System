import "./App.css";
import HospitalLandingPage from "./components/HospitalLandingPage";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/Signupform";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HospitalLandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
