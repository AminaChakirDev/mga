import axios from "axios";
import { useState } from "react";

export default function AdminCreateCategoryPage() {
  const [category, setCategory] = useState({
    name: "",
  });

  const postCategory = () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/categories`, { ...category })
      .then((response) => {
        console.error(response);
        console.error(response.data);
      });
  };

  return (
    <div>
      <p>Page de création d'une catégorie</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          postCategory();
        }}
      >
        <input
          type="text"
          value={category.title}
          placeholder="Titre"
          onChange={(e) =>
            setCategory({
              ...category,
              name: e.target.value,
            })
          }
        />
        <input type="submit" value="Créer une catégorie" />
      </form>
    </div>
  );
}
