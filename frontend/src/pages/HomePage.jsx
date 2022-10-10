import { useEffect } from "react";
import ArticlesList from "@components/ArticlesList";

export default function HomePage() {
  useEffect(() => {
    document.title = "My Page Title";
  });
  return (
    <>
      <div>Articles</div>
      <ArticlesList />
    </>
  );
}
