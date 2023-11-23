import './App.css';
import ViewCars from './Components/Car/ViewCars';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEditCar from './Components/Car/AddEditCar';
import Signup from './Components/User/Signup';
import Login from './Components/User/Login';
import Booking from './Components/Bookings';
import MyBookings from './Components/Bookings/MyBookings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ViewCars />} />
        <Route path="add-car" element={<AddEditCar />} />
        <Route path="signup" element={<Signup />} />
        <Route path="settings" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="all-bookings" element={<Booking />} />
        <Route path="my-bookings" element={<MyBookings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
