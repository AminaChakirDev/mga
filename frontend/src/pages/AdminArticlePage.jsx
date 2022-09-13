import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

export default function AdminArticlePage() {
  const params = useParams();

  const [article, setArticle] = useState({
    title: "",
    content: "",
    createdAt: "2022-09-13",
    updatedAt: "2022-09-13",
    published: false,
    slug: "",
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/articles/${params.id}`)
      .then((response) => response.data)
      .then((data) => setArticle(data));
  }, []);

  function updateArticle() {
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/articles/${params.id}`, {
      ...article,
      createdAt: moment(article.createdAt).format("YYYY-MM-DD"),
      updatedAt: moment().locale("fr").format("YYYY-MM-DD"),
    });
  }

  function deleteArticle() {
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/articles/${params.id}`);
  }

  return (
    <>
      <h2>Page d'un article</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateArticle();
        }}
      >
        <input
          type="text"
          value={article.title}
          placeholder="Titre"
          onChange={(e) =>
            setArticle({
              ...article,
              title: e.target.value,
            })
          }
        />
        <input
          type="text"
          value={article.content}
          placeholder="Corps de l'article"
          onChange={(e) =>
            setArticle({
              ...article,
              content: e.target.value,
            })
          }
        />
        <input type="submit" value="Modifier un article" />
      </form>
      <button type="button" onClick={() => deleteArticle()}>
        Supprimer
      </button>
    </>
  );
}
