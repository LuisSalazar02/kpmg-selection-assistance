import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import CreatePage from "./pages/CreatePage";
import EditProjectPage from "./pages/EditProjectPage";
import EditProviderPage from "./pages/EditProviderPage";
import AnalyticsPage from "./pages/AnalyticsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<CreatePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/edit-project" element={<EditProjectPage />} />
          <Route path="/edit-provider" element={<EditProviderPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
