import { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Markdown from "markdown-to-jsx";

// Other Compontents
import Navbar from "../../layout/Navbar";
import Footer from "../../layout/Footer";
import Loader from "../../layout/Loader";

// Styling
import "./style.css";

function Legal({ page }) {
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState(null);

  const capitalizeText = (text) => {
    return text.slice(0, 1).toUpperCase() + text.slice(1, text.length);
  };

  useEffect(() => {
    (async () => {
      if (process.env.NODE_ENV === "production") {
        const data = await fetch(`/legal-docs/${page}`)
          .then(async (res) => {
            if (!res.ok) return null;
            return await res?.data;
          })
          .catch((err) => null);

        if (!data) {
          setTitle("Error");
          setContent(
            "An error occured while loading this legal document, please try again later or [contact us](/support)."
          );

          return;
        }

        setTitle(capitalizeText(page));
        setContent(data);
      }
    })();
  }, [page]);

  return (
    <Fragment>
      <Navbar />
      <Helmet>
        <title>Legal - Athena</title>
      </Helmet>
      <div className="athena-legal-container">
        <div className="athena-legal-head">
          <h1 style={{ color: "var(--primary-theme)" }}>{title}</h1>
        </div>
        <div className="athena-legal-content">
          {content ? (
            <Markdown>{content}</Markdown>
          ) : (
            <Loader loaderMsg={"Fetching legal document..."} active={true} />
          )}
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

export default Legal;
