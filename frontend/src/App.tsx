
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import HomeLayout from "./pages/HomeLayout";
import User from "./pages/User";
import Singleuser from "./pages/Singleuser";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="user" element={<User />} />

          <Route path="/:id" element={<Singleuser />} />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </BrowserRouter>
  );
};

export default App;