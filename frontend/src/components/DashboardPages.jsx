import styles from "../styles/DashboardPages.module.scss";
import { Fragment, useEffect, useState } from "react";

import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";
import ChangesDetected from "./ChangesDetected";

import SaveChnages from "../utils/SaveChanges";
import Toggle from "./Toggle";
import EmbedEditor from "./EmbedEditor";

export const Overview = () => {
  return (
    <Fragment>
      <h1>Overview</h1>
    </Fragment>
  );
};

export const Settings = ({ serverData }) => {
  const [settings, setSettings] = useState(serverData?.modules?.settings);
  const [warnActive, setWarnActive] = useState(false);
  const [warnLoading, setWarnLoading] = useState(false);

  useEffect(() => {
    setSettings(serverData?.modules?.settings);
  }, [setSettings, serverData]);

  const saveChanges = async () => {
    setWarnLoading(true);

    const success = await SaveChnages(serverData.id, "settings", settings);

    if (success) {
      setWarnActive(false);
      setWarnLoading(false);
      serverData.setServerDetails({
        ...serverData,
        modules: {
          ...serverData?.modules,
          settings: settings,
        },
      });
    } else {
      console.error("An error occured while saving data.");
    }
  };

  const resetChanges = () => {
    setSettings(serverData?.modules?.settings);
    setWarnActive(false);
  };

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
          <TextInput
            onChange={(x) => {
              setSettings({
                ...settings,
                prefix: x,
              });
              setWarnActive(true);
            }}
            initialValue={settings?.prefix}
          />
        </div>
      </div>

      <div className={styles.module}>
        <div className={styles.moduleHead}>
          <h2>Language</h2>
          <p>Change the language of Athena in your server.</p>
        </div>
        <div className={styles.moduleInner}>
          <SelectInput
            onSelect={(x) => {
              setSettings({
                ...settings,
                language: x.id,
              });
              setWarnActive(true);
            }}
            active={serverData?.availableLanguages?.find(
              (x) => x.id === settings?.language
            )}
            options={serverData?.availableLanguages || []}
          />
        </div>
      </div>

      <ChangesDetected
        resetChanges={resetChanges}
        saveChanges={saveChanges}
        active={warnActive}
        loading={warnLoading}
      />
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

export const Welcomer = ({ serverData }) => {
  const [settings, setSettings] = useState(serverData?.modules?.settings);
  const [warnActive, setWarnActive] = useState(false);
  const [warnLoading, setWarnLoading] = useState(false);

  useEffect(() => {
    setSettings(serverData?.modules?.settings);
  }, [setSettings, serverData]);

  const saveChanges = async () => {
    setWarnLoading(true);

    const success = await SaveChnages(serverData.id, "settings", settings);

    if (success) {
      setWarnActive(false);
      setWarnLoading(false);
      serverData.setServerDetails({
        ...serverData,
        modules: {
          ...serverData?.modules,
          settings: settings,
        },
      });
    } else {
      console.error("An error occured while saving data.");
    }
  };

  const resetChanges = () => {
    setSettings(serverData?.modules?.settings);
    setWarnActive(false);
  };

  return (
    <Fragment>
      <h1>Welcomer</h1>

      <div className={`${styles.module} ${styles.toggleableModule}`}>
        <div className={styles.moduleHead}>
          <h2>
            Message To Channel
            <Toggle />
          </h2>
          <p>Send message to a channel when a user joins to the guild.</p>
        </div>
        <div className={styles.moduleInner}>
          <EmbedEditor />
        </div>
      </div>

      <ChangesDetected resetChanges={resetChanges} saveChanges={saveChanges} />
    </Fragment>
  );
};

export const Logging = () => {
  return (
    <Fragment>
      <h1>Logging</h1>

      <div className={styles.module}>
        <div className={styles.moduleHead}>
          <h2>Actions</h2>
          <p>Select the actions that you want Athena to log.</p>
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

export const Music = () => {
  return (
    <Fragment>
      <h1>Music</h1>

      <div className={styles.module}>
        <div className={styles.moduleHead}>
          <h2>Banned Songs</h2>
          <p>Ban any youtube link, and make Athena not play that song.</p>
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

export const NotFound = () => {
  return <h1>Module not found!</h1>;
};
