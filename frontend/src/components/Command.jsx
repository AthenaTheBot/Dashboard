import styles from "../styles/Command.module.scss";
import $ from "jquery";

const Command = ({
  name,
  usage,
  description,
  cooldown,
  requiredPerms,
  requiredBotPerms,
}) => {
  const expandCommand = (e) => {
    if ($(e.currentTarget).children("#commandBody").attr("style")) {
      $(e.currentTarget).children("#commandBody").removeAttr("style");
    } else {
      $(e.currentTarget).children("#commandBody").css("display", "block");
    }
  };

  return (
    <div className={styles.command} onClick={expandCommand}>
      <div className={styles.commandHead}>
        <div className={styles.commandName}>{name}</div>
        {usage.length > 0
          ? usage.split(" ").map((_usage, index) => {
              return (
                <div key={index} className={styles.commandUsage}>
                  {_usage}
                </div>
              );
            })
          : ""}
      </div>
      <div id="commandBody" className={styles.commandBody}>
        <div className={styles.commandProp}>
          <h4>Description</h4>
          <p>{description}</p>
        </div>
        <div className={styles.commandProp}>
          <h4>Cooldown</h4>
          <p>{cooldown} seconds</p>
        </div>
        <div className={styles.commandProp}>
          <h4>Required Perms</h4>
          <p>{requiredPerms.length > 0 ? requiredPerms.join(", ") : "None"}</p>
        </div>
        <div className={styles.commandProp}>
          <h4>Required Bot Perms</h4>
          <p>
            {requiredBotPerms.length > 0 ? requiredBotPerms.join(", ") : "None"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Command;
