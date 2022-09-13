export default function User({ user }) {
  return (
    <div className="article-container">
      <p>{user.email}</p>
      <p>{user.pass}</p>
      <p>{user.firstname}</p>
      <p>{user.lastname}</p>
      {user.url ? (
        <img width="200" height="200" src={user.url} alt={user.firstname} />
      ) : (
        ""
      )}
    </div>
  );
}
