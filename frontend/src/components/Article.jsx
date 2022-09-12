export default function Article({ article }) {
  return (
    <div className="article-container">
      <p>{article.title}</p>
      <p>{article.createdAt}</p>
      <p>{article.content}</p>
    </div>
  );
}
