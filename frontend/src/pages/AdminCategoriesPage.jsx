import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AdminCategoriesPage() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/categories`)
      .then((response) => response.data)
      .then((data) => setCategories(data));
  }, []);

  return (
    <div>
      {categories ? (
        <table>
          <thead>
            <tr>
              <th>Nom de la catégorie</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                onClick={() => navigate(`/admin/categories/${category.id}`)}
              >
                <td>{category.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        ""
      )}
      <Link to="/admin/categories/create">
        <button type="button">Créer une categorie</button>
      </Link>
    </div>
  );
}
