import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import CategoriesCheckbox from "@components/CategoriesCheckbox";

export default function AdminArticlePage() {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [article, setArticle] = useState({
    title: "",
    content: "",
    published: false,
    slug: "",
  });

  const [selectedCategories, setSelectedCategories] = useState("");

  // Appel API qui récupère le titre, le contenu, la date de création et de mise à jour
  // la publication d'un article - + catégorie ?
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/articles/${params.id}`)
      .then((response) => response.data)
      .then((data) => setArticle(data), setLoading(false));
  }, []);

  function updateArticle() {
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/articles/${params.id}`, {
      ...article,
      createdAt: moment(article.createdAt).format("YYYY-MM-DD"),
      updatedAt: moment().locale("fr").format("YYYY-MM-DD"),
      categories: selectedCategories,
    });
  }

  function deleteArticle() {
    // Je supprime cet article de la table article
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/articles/${params.id}`);
    // Je supprime les lignes relatives à cet article dans la table de jointure article_category
    axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/articles/${params.id}/categories`
    );
    navigate("/admin/articles");
  }

  if (loading) {
    return <div>En cours de chargement</div>;
  }

  return (
    <>
      <button type="button" onClick={() => navigate("/admin/articles")}>
        Retour aux articles
      </button>
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
        {article.categories ? (
          <CategoriesCheckbox
            selectedCategories={article.categories}
            setSelectedCategories={setSelectedCategories}
          />
        ) : (
          ""
        )}

        <input type="submit" value="Modifier un article" />
      </form>
      <button type="button" onClick={() => deleteArticle()}>
        Supprimer
      </button>
    </>
  );
}
