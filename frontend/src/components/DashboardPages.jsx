import styles from "../styles/DashboardPages.module.scss";
import { Fragment, useEffect, useState, useContext } from "react";

import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";
import ChangesDetected from "./ChangesDetected";

import SaveChnages from "../utils/SaveChanges";
import Toggle from "./Toggle";
import EmbedEditor from "./EmbedEditor";

import UserContext from "../context/User/UserContext";

import $ from "jquery";

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

  const saveChanges = async (toggleUi) => {
    setWarnLoading(true);

    const success = await SaveChnages(serverData.id, "settings", settings);

    if (success) {
      serverData.setServerDetails({
        ...serverData,
        modules: {
          ...serverData?.modules,
          settings: settings,
        },
      });

      setWarnLoading(false);

      await toggleUi();

      setWarnActive(false);
    } else {
      console.error("An error occured while saving data.");
    }
  };

  const resetChanges = async (toggleUi) => {
    setSettings(serverData?.modules?.settings);

    await toggleUi();
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
            value={settings?.prefix}
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

export const Moderation = ({ serverData }) => {
  const [moderationSettings, setModerationSettings] = useState(
    serverData?.modules?.moderation
  );
  const [warnActive, setWarnActive] = useState(false);
  const [warnLoading, setWarnLoading] = useState(false);

  useEffect(() => {
    setModerationSettings(serverData?.modules?.moderation);
  }, [setModerationSettings, serverData]);

  const saveChanges = async (toggleUi) => {
    setWarnLoading(true);

    const success = await SaveChnages(
      serverData.id,
      "moderation",
      moderationSettings
    );

    if (success) {
      serverData.setServerDetails({
        ...serverData,
        modules: {
          ...serverData?.modules,
          moderation: moderationSettings,
        },
      });

      setWarnLoading(false);

      await toggleUi();

      setWarnActive(false);
    } else {
      console.error("An error occured while saving data.");
    }
  };

  const resetChanges = async (toggleUi) => {
    setModerationSettings(serverData?.modules?.moderation);

    await toggleUi();
    setWarnActive(false);
  };

  return (
    <Fragment>
      <h1>Moderation</h1>

      <div className={styles.module}>
        <div className={styles.moduleHead}>
          <h2>Auto Role</h2>
          <p>Make Athena give members to your new members of your guild.</p>
        </div>
        <div className={styles.moduleInner}>
          <SelectInput
            onSelect={(item) => {
              setModerationSettings({
                ...moderationSettings,
                autoRole: item.id,
              });
              setWarnActive(true);
            }}
            onFocus={(e) => {
              $(e.currentTarget)
                .parent()
                .parent()
                .parent()
                .css("z-index", "9999");
            }}
            onBlur={(e) => {
              $(e.currentTarget).parent().parent().parent().removeAttr("style");
            }}
            active={
              moderationSettings?.autoRole
                ? {
                    id: moderationSettings?.autoRole,
                    label:
                      serverData?.roles?.find(
                        (x) =>
                          x.id === serverData?.modules?.moderation?.autoRole
                      )?.name || serverData?.modules?.moderation?.autoRole,
                  }
                : {}
            }
            options={serverData?.roles?.map((role) => {
              if (role.id !== moderationSettings?.autoRole) {
                return {
                  id: role.id,
                  label: role.name,
                };
              } else return <Fragment />;
            })}
          />
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

      <ChangesDetected
        resetChanges={resetChanges}
        saveChanges={saveChanges}
        active={warnActive}
        loading={warnLoading}
      />
    </Fragment>
  );
};

export const Welcomer = ({ serverData }) => {
  const [welcomerSettings, setWelcomerSettings] = useState(
    serverData?.modules?.welcomer
  );
  const [warnActive, setWarnActive] = useState(false);
  const [warnLoading, setWarnLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setWelcomerSettings(serverData?.modules?.welcomer);
  }, [setWelcomerSettings, serverData]);

  const saveChanges = async (toggleUi) => {
    setWarnLoading(true);

    const success = await SaveChnages(
      serverData.id,
      "welcomer",
      welcomerSettings
    );

    if (success) {
      serverData?.setServerDetails({
        ...serverData,
        modules: {
          ...serverData?.modules,
          welcomer: welcomerSettings,
        },
      });

      setWarnLoading(false);

      await toggleUi();

      setWarnActive(false);
    } else {
      console.error("An error occured while saving data.");

      await toggleUi();

      setWarnActive(false);
    }
  };

  const resetChanges = async (toggleUi) => {
    setWarnLoading(true);

    setWelcomerSettings(serverData?.modules?.welcomer);

    setWarnLoading(false);

    await toggleUi();

    setWarnActive(false);
  };

  return (
    <Fragment>
      <h1>Welcomer</h1>

      <div className={`${styles.module} ${styles.toggleableModule}`}>
        <div className={styles.moduleHead}>
          <h2>
            Message To Channel
            <Toggle
              active={welcomerSettings?.messageToChannel?.enabled}
              onChange={(x) => {
                setWelcomerSettings({
                  ...welcomerSettings,
                  messageToChannel: {
                    ...welcomerSettings.messageToChannel,
                    enabled: x,
                  },
                });
                setWarnActive(true);
              }}
            />
          </h2>
          <p>Send message to a channel when a user joins to the guild.</p>
        </div>
        <div className={styles.moduleInner}>
          <div className={styles.welcomerModuleWarns}>
            <p className={styles.welcomerModuleWarn}>
              <code>$user</code>: Shows user joined to the server
            </p>
            <p className={styles.welcomerModuleWarn}>
              <code>$server</code>: Shows current server
            </p>
          </div>
          <div className={styles.welcomerModuleChannel}>
            <p>Channel</p>
            <SelectInput
              onSelect={(item) => {
                if (!item?.id) return;
                setWelcomerSettings({
                  ...welcomerSettings,
                  messageToChannel: {
                    ...welcomerSettings.messageToChannel,
                    channel: item.id,
                  },
                });
                setWarnActive(true);
              }}
              active={
                welcomerSettings?.messageToChannel?.channel
                  ? {
                      id: welcomerSettings.messageToChannel.channel,
                      label:
                        serverData.channels.text.find(
                          (x) =>
                            x.id === welcomerSettings?.messageToChannel?.channel
                        )?.name || welcomerSettings?.messageToChannel?.channel,
                    }
                  : {}
              }
              options={serverData?.channels?.text?.map((channel) => {
                if (
                  channel?.id !== welcomerSettings?.messageToChannel?.channel
                ) {
                  return {
                    id: channel.id,
                    label: channel.name,
                  };
                } else return <Fragment></Fragment>;
              })}
            />
          </div>
          <EmbedEditor
            embed={welcomerSettings?.messageToChannel?.message?.embed}
            example={{
              server: serverData.name,
              user: user?.username || "User",
            }}
            onChange={(newEmbed) => {
              setWelcomerSettings({
                ...welcomerSettings,
                messageToChannel: {
                  ...welcomerSettings.messageToChannel,
                  message: {
                    ...welcomerSettings.messageToChannel.message,
                    embed: newEmbed,
                  },
                },
              });
              setWarnActive(true);
            }}
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
