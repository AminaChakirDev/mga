import Article from "@components/Article";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ArticlePage() {
  const [article, setArticle] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/articles/${params.id}`)
      .then((response) => response.data)
      .then((data) => setArticle(data));
  }, []);

  return (
    <>
      <button type="button" onClick={() => navigate("/")}>
        Retour aux articles
      </button>
      <h2>Page d'un article</h2>
      <Article article={article} />
    </>
  );
}
