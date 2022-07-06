import styles from "../styles/EmbedEditor.module.scss";

import TextInput from "./TextInput";
import ColorInput from "./ColorInput";

const EmbedEditor = ({ embed = {}, onChange = () => {} }) => {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.innerSection}>
          <div>
            <p>Author Name</p>
            <TextInput
              onChange={(d) => {
                onChange({
                  ...embed,
                  name: d,
                });
              }}
              value={embed?.name}
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
      </div>
    </div>
  );
};

export default EmbedEditor;
