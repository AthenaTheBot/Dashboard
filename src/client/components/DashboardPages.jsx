import styles from "../styles/DashboardPages.module.scss";
import { Fragment } from "react";

import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";

export const Overview = () => {
  return (
    <Fragment>
      <h1>Overview</h1>
    </Fragment>
  );
};

export const Settings = () => {
  return (
    <Fragment>
      <h1>Settings</h1>

      <div className={styles.module}>
        <div className={styles.moduleHead}>
          <h2>Prefix</h2>
          <p>
            Change the prefix of Athena in your server to prevent from
            triggering other bots.
          </p>
        </div>
        <div className={styles.moduleInner}>
          <TextInput />
        </div>
      </div>

      <div className={styles.module}>
        <div className={styles.moduleHead}>
          <h2>Language</h2>
          <p>Change the language of Athena in your server.</p>
        </div>
        <div className={styles.moduleInner}>
          <SelectInput
            options={[
              { id: "en_us", content: "English" },
              {
                id: "tr_tr",
                content: "Türkçe",
              },
            ]}
          />
        </div>
      </div>
    </Fragment>
  );
};

export const Moderation = () => {
  return (
    <Fragment>
      <h1>Moderation</h1>

      <div className={styles.module}>
        <div className={styles.moduleHead}>
          <h2>Auto Role</h2>
          <p>Make Athena give members to your new members of your guild.</p>
        </div>
        <div className={styles.moduleInner}>
          <p>Whatever you want to put in here</p>
        </div>
      </div>
    </Fragment>
  );
};

export const Music = () => {
  return (
    <Fragment>
      <h1>Music</h1>
      <p className={styles.futureAvailable}>
        This module will be available in the future.
      </p>
    </Fragment>
  );
};

export const NotFound = () => {
  return <h1>Page not found!</h1>;
};
