import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

export default function AdminArticlesPage() {
  const navigate = useNavigate();

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
              <th>Id</th>
              <th>Titre</th>
              <th>Ajouté le</th>
              <th>Modifié le</th>
              <th>Catégories</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr
                key={article.id}
                onClick={() => navigate(`/admin/articles/${article.id}`)}
              >
                <td>{article.id}</td>
                <td>{article.title}</td>
                <td>{moment(article.createdAt).format("DD-MM-YYYY")}</td>
                <td>
                  {article.updatedAt
                    ? moment(article.updatedAt).format("DD-MM-YYYY")
                    : ""}
                </td>
                <td>
                  <ul>
                    {article.categories &&
                      article.categories.map((category) => (
                        <li key={category.value}>{category.label}</li>
                      ))}
                  </ul>
                </td>
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
