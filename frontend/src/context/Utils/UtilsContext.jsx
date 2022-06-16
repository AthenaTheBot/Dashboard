import { createContext } from "react";

export default createContext({
  commands: null,
  availableLanguages: null,
  getCommands: () => {},
  getAvailableLanguages: () => {},
});
