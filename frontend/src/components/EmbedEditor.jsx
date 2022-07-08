import styles from "../styles/EmbedEditor.module.scss";

import TextInput from "./TextInput";
import ColorInput from "./ColorInput";
import { Fragment, useState } from "react";

const EmbedEditor = ({ embed = {}, onChange = () => {} }) => {
  const [showPreview, setShowPreview] = useState(false);

  const togglePreview = () => {
    if (showPreview) setShowPreview(false);
    else setShowPreview(true);
  };

  return (
    <div className={styles.container}>
      <p onClick={togglePreview} className={styles.togglePreview}>
        {showPreview ? "Disable" : "Show"} Preview
      </p>
      {!showPreview ? (
        <Fragment>
          <div className={styles.innerSection}>
            <div>
              <p>Author Name</p>
              <TextInput
                onChange={(d) => {
                  onChange({
                    ...embed,
                    author: {
                      ...embed?.author,
                      name: d,
                    },
                  });
                }}
                value={embed?.author?.name}
              />
            </div>
          </div>

          <div className={styles.innerSection}>
            <div>
              <p>Author Icon</p>
              <TextInput
                onChange={(d) => {
                  onChange({
                    ...embed,
                    author: {
                      ...embed?.author,
                      icon: d,
                    },
                  });
                }}
                value={embed?.author?.icon}
              />
            </div>
            <div>
              <p>Author Url</p>
              <TextInput
                onChange={(d) => {
                  onChange({
                    ...embed,
                    author: {
                      ...embed?.author,
                      url: d,
                    },
                  });
                }}
                value={embed.author?.url}
              />
            </div>
          </div>

          <div className={styles.innerSection}>
            <div>
              <p>Title</p>
              <TextInput
                onChange={(d) => {
                  onChange({
                    ...embed,
                    title: d,
                  });
                }}
                value={embed?.title}
              />
            </div>
          </div>

          <div className={styles.innerSection}>
            <div>
              <p>Description</p>
              <TextInput
                onChange={(d) => {
                  onChange({
                    ...embed,
                    description: d,
                  });
                }}
                value={embed?.description}
              />
            </div>
          </div>

          <div className={styles.innerSection}>
            <div>
              <p>Thumbnail URL</p>
              <TextInput
                onChange={(d) => {
                  onChange({
                    ...embed,
                    thumbnail: d,
                  });
                }}
                value={embed?.thumbnail}
              />
            </div>
            <div>
              <p>Image URL</p>
              <TextInput
                onChange={(d) => {
                  onChange({
                    ...embed,
                    image: d,
                  });
                }}
                value={embed?.ColorInputimage}
              />
            </div>

            <div>
              <p>URL</p>
              <TextInput
                onChange={(d) => {
                  onChange({
                    ...embed,
                    url: d,
                  });
                }}
                value={embed?.url}
              />
            </div>
          </div>

          <div className={styles.innerSection}>
            <div>
              <p>Color</p>
              <ColorInput
                onChange={(d) => {
                  onChange({
                    ...embed,
                    color: d,
                  });
                }}
                value={embed?.color}
              />
            </div>
          </div>

          <div className={styles.innerSection}>
            <div>
              <p>Footer Icon</p>
              <TextInput
                onChange={(d) => {
                  onChange({
                    ...embed,
                    footer: {
                      ...embed?.footer,
                      icon: d,
                    },
                  });
                }}
                value={embed?.footer?.icon}
              />
            </div>

            <div>
              <p>Footer Text</p>
              <TextInput
                onChange={(d) => {
                  onChange({
                    ...embed,
                    footer: {
                      ...embed?.footer,
                      text: d,
                    },
                  });
                }}
                value={embed?.footer?.text}
              />
            </div>
          </div>
        </Fragment>
      ) : (
        <div className={styles.preview}>
          <div className={styles.previewInner}>
            <div className={styles.author}>
              <img src="/logo.png" alt="Athena" />
              <p className={styles.authorName}>
                Athena <span className={styles.authorTag}>BOT</span>
              </p>
            </div>
            <div className={styles.message}>
              <div className={styles.messageContent}></div>
              <div className={styles.messageEmbed}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmbedEditor;
