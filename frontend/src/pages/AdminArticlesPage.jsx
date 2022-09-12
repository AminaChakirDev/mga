import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/articles`)
      .then((response) => response.data)
      .then((data) => setArticles(data));
  }, []);

  return (
    <div>
      {articles ? (
        <table>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Ajouté le</th>
              <th>Modifié le</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td>{article.title}</td>
                <td>{article.createdAt}</td>
                <td>{article.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        ""
      )}
      <Link to="/admin/articles/create">
        <button type="button">Créer un article</button>
      </Link>
    </div>
  );
}
