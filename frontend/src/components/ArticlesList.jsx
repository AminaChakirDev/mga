import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Article from "./Article";

export default function ArticlesList() {
  const [articles, setArticles] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/articles/latest`)
      .then((response) => response.data)
      .then((data) => setArticles(data));
  }, []);

  return (
    <div>
      {articles &&
        articles.map((article) => (
          <Link to={`/articles/${article.id}`} key={article.id}>
            <Article article={article} />
          </Link>
        ))}
      <Link to="/admin/articles">
        <p>Vers l'admin</p>
      </Link>
    </div>
  );
}
