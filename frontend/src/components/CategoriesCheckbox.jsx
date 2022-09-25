import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

export default function CategoriesCheckbox({
  selectedCategories,
  setSelectedCategories,
}) {
  const [categories, setCategories] = useState("");

  // Récupère la liste des catégories
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/categories`)
      .then((response) => response.data)
      .then((data) => setCategories(data));
  }, []);

  return (
    <Select
      // defaultValue : catégories déjà attribuées à l'article en db (vide en création d'article)
      defaultValue={selectedCategories}
      // option : catégories proposées dans la liste déroulante
      options={categories}
      // peut choisir plusieurs valeurs
      isMulti
      onChange={setSelectedCategories}
      placeholder="Affecter une ou plusieurs catégories"
    />
  );
}
