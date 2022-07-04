import styles from "../styles/EmbedEditor.module.scss";

import TextInput from "./TextInput";
import ColorInput from "./ColorInput";

const EmbedEditor = ({
  author,
  title,
  description,
  thumbnail,
  image,
  url,
  color,
  footer,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.innerSection}>
          <div>
            <p>Author Name</p>
            <TextInput initialValue={author?.name} />
          </div>
        </div>

        <div className={styles.innerSection}>
          <div>
            <p>Author Icon</p>
            <TextInput initialValue={author?.icon} />
          </div>
          <div>
            <p>Author Url</p>
            <TextInput initialValue={author?.url} />
          </div>
        </div>

        <div className={styles.innerSection}>
          <div>
            <p>Title</p>
            <TextInput initialValue={title} />
          </div>
        </div>

        <div className={styles.innerSection}>
          <div>
            <p>Description</p>
            <TextInput initialValue={description} />
          </div>
        </div>

        <div className={styles.innerSection}>
          <div>
            <p>Thumbnail URL</p>
            <TextInput initialValue={thumbnail} />
          </div>
          <div>
            <p>Image URL</p>
            <TextInput initialValue={image} />
          </div>

          <div>
            <p>URL</p>
            <TextInput initialValue={url} />
          </div>
        </div>

        <div className={styles.innerSection}>
          <div>
            <p>Color</p>
            <ColorInput initialValue={color} />
          </div>
        </div>

        <div className={styles.innerSection}>
          <div>
            <p>Footer Icon</p>
            <TextInput initialValue={footer?.icon} />
          </div>

          <div>
            <p>Footer Text</p>
            <TextInput initialValue={footer?.text} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbedEditor;
