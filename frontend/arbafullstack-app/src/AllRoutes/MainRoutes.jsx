
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Home from "../pages/HomePage/Home";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import MyStore from "../pages/MyStore/MyStore";


export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/profile" element={<ProfilePage/>}></Route>
      <Route path="/mystore" element={<MyStore/>}></Route>
    </Routes>
  );
}