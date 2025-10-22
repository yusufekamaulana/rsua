import { BrowserRouter as Router, Routes, Route } from "react-router";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";

// Halaman yang dipakai
import Home from "./pages/Dashboard/Home";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import UserProfiles from "./pages/UserProfiles";
import NotFound from "./pages/OtherPage/NotFound";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Layout utama */}
        <Route element={<AppLayout />}>
          {/* Dashboard */}
          <Route index path="/" element={<Home />} />

          {/* Data Kejadian */}
          <Route path="/basic-tables" element={<BasicTables />} />

          {/* Klasifikasi AI */}
          <Route path="/form-elements" element={<FormElements />} />

          {/* User Profile */}
          <Route path="/profile" element={<UserProfiles />} />
          
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
