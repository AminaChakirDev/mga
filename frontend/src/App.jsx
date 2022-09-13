import HomePage from "@pages/HomePage";
import ArticlePage from "@pages/ArticlePage";
import AdminArticlesPage from "@pages/AdminArticlesPage";
import AdminArticlePage from "@pages/AdminArticlePage";
import AdminCreateArticlePage from "@pages/AdminCreateArticlePage";
import UsersPage from "@pages/UsersPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles/:id" element={<ArticlePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/admin/articles" element={<AdminArticlesPage />} />
        <Route path="/admin/articles/:id" element={<AdminArticlePage />} />
        <Route
          path="/admin/articles/create"
          element={<AdminCreateArticlePage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
