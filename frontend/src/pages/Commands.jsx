import { Fragment, useContext, useEffect, useState } from "react";
import $ from "jquery";

import UtilsContext from "../context/Utils/UtilsContext";

import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import Command from "../components/Command";
import Loader from "../components/Loader";

import styles from "../styles/Commands.page.module.scss";

function Commands() {
  const { commands, getCommands } = useContext(UtilsContext);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [currentCommands, setCurrentCommands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (!commands) setTimeout(getCommands, 500);
    else {
      let _categories = [];
      let _commands = [];

      commands?.forEach((x) => {
        _categories.push(x.category);

        if (x.category === selectedCategory) _commands = x.commands;
      });

      // Change the order of the All category
      _categories = _categories.filter((x) => x !== "All");
      _categories.splice(0, 0, "All");

      setCurrentCategories(_categories);
      setCurrentCommands(_commands);
    }
  }, [commands, getCommands, selectedCategory]);

  const loadCategory = (categoryName) => {
    $("#commands").children().children().removeAttr("style");

    setSelectedCategory(categoryName);
  };

  return (
    <Container bgGradientColor="var(--secondary-theme)">
      <Seo
        title="Commands - Athena"
        keywords={[
          "commands",
          "athena",
          "athenabot",
          "discord-bot-commands",
          "discordbot",
        ]}
        description="See all commands of Athena."
      />
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Commands</h1>
        </div>
        <div className={styles.main}>
          <div className={styles.wrapper}>
            {currentCommands.length > 0 ? (
              <Fragment>
                <div className={styles.categories}>
                  {currentCategories?.map((currentCategory) => {
                    return (
                      <div
                        onClick={(e) => {
                          loadCategory(currentCategory);
                        }}
                        key={currentCategories.indexOf(currentCategory)}
                        className={`${styles.category} ${
                          currentCategory === selectedCategory
                            ? styles.selectedCategory
                            : ""
                        }`}
                      >
                        {currentCategory}
                      </div>
                    );
                  })}
                </div>
                <div id="commands" className={styles.commands}>
                  {currentCommands?.map((currentCommand, index) => {
                    return (
                      <Command
                        key={index}
                        name={currentCommand.name}
                        usage={currentCommand.usage}
                        description={currentCommand.description}
                        cooldown={currentCommand.cooldown?.toString()}
                        requiredPerms={currentCommand.required_perms}
                        requiredBotPerms={currentCommand.required_bot_perms}
                      />
                    );
                  })}
                </div>
              </Fragment>
            ) : (
              <Loader enabled={true} message="Fetching commands" />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </Container>
  );
}

export default Commands;
