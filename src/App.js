import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCard from "./components/NewsCards/NewsCards";
import wordsToNumbers from "words-to-numbers";

import useStyles from "./style";
const alanKey =
  "708a1fe47f01f708fc8246041c8cb6d72e956eca572e1d8b807a3e2338fdd0dc/stage";
const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle((pre) => pre + 1);
        } else if ((command = "open")) {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText("Please try that again...");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtn().playText("Opening...");
          } else {
            alanBtn().playText("Please try that again...");
          }
        }
      },
    });
  }, []);
  const classes = useStyles();
  return (
    <div>
      {newsArticles.length === 0 ? (
        <div className={classes.logoContainer}>
          <img
            src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500"
            className={classes.alanLogo}
            alt="logo"
          />
        </div>
      ) : null}
      <NewsCard articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
};
export default App;
