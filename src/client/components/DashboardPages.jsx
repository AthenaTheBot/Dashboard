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

export const Settings = ({ serverData }) => {
  for (let i = 0; i < serverData?.availableLanguages?.length; i++) {
    if (
      serverData?.availableLanguages[i]?.id ===
      serverData?.modules?.settings?.language
    ) {
      serverData.availableLanguages[i].active = true;
    } else serverData.availableLanguages[i].active = false;
  }

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
          <TextInput initialValue={serverData?.modules?.settings?.prefix} />
        </div>
      </div>

      <div className={styles.module}>
        <div className={styles.moduleHead}>
          <h2>Language</h2>
          <p>Change the language of Athena in your server.</p>
        </div>
        <div className={styles.moduleInner}>
          <SelectInput options={serverData?.availableLanguages || []} />
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
          <p className={styles.futureAvailable}>
            This module will be available in the future.
          </p>
        </div>
      </div>

      <div className={styles.module}>
        <div className={styles.moduleHead}>
          <h2>Bot Verificiation</h2>
          <p>Verify your members and protect your server from spam and bots.</p>
        </div>
        <div className={styles.moduleInner}>
          <p className={styles.futureAvailable}>
            This module will be available in the future.
          </p>
        </div>
      </div>

      <div className={styles.module}>
        <div className={styles.moduleHead}>
          <h2>Bad Word Protection</h2>
          <p>Protect your server members from bad words.</p>
        </div>
        <div className={styles.moduleInner}>
          <p className={styles.futureAvailable}>
            This module will be available in the future.
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export const Logging = () => {
  return (
    <Fragment>
      <h1>Logging</h1>
      <p className={styles.futureAvailable}>
        This module will be available in the future.
      </p>
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
  return <h1>Module not found!</h1>;
};
