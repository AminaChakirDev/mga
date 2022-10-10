import axios from "axios";
import { useEffect, useState } from "react";
import User from "./User";

export default function UsersList() {
  const [users, setUsers] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users`)
      .then((response) => response.data)
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      {users && users.map((user) => <User user={user} key={user.id} />)}
    </div>
  );
}
