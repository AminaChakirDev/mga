import axios from "axios";
import { useState } from "react";

export default function AdminCreateArticlePage() {
  const [article, setArticle] = useState({
    title: "",
    content: "",
    createdAt: "2022-07-09",
    updatedAt: null,
    published: 0,
    slug: "",
  });

  const postArticle = () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/articles`, { ...article })
      .then((response) => {
        console.error(response);
        console.error(response.data);
      });
  };

  return (
    <div>
      <p>Page de création d'article</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          postArticle();
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
        <input type="submit" value="Créer un article" />
      </form>
    </div>
  );
}
