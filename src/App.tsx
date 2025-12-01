import { BrowserRouter as Router, Routes, Route } from "react-router";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/DashboardUnit/Home";
import HomeMutu from "./pages/DashboardMutu/HomeMutu";
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
          {/* Dashboard Unit*/}
          <Route index path="/dashboard-unit" element={<Home />} />

          {/* Dashboard Mutu*/}
          <Route index path="/dashboard-mutu" element={<HomeMutu />} />

          {/* Data Kejadian */}
          <Route path="/data-kejadian" element={<BasicTables />} />

          {/* Klasifikasi AI */}
          <Route path="/klasifikasi-ai" element={<FormElements />} />

          {/* User Profile */}
          <Route path="/profile" element={<UserProfiles />} />
          
        </Route>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
