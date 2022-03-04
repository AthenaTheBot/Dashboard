import dot from "dot-object";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import mongoose from "mongoose";

dayjs.extend(localizedFormat);

const updateServerModule = async (
  guildId: string,
  moduleName: string,
  newData: object
): Promise<boolean> => {
  const db = mongoose.connection;

  if (!db) return false;

  const document = await db
    .collection("guilds")
    .findOne({ _id: guildId })
    .catch(() => null);

  if (!document) return false;

  const dottedDocument = dot.dot(document);
  const dottedNewData = dot.dot({ modules: { [moduleName]: newData } });

  // Merge datas
  Object.keys(dottedNewData).forEach((key) => {
    dottedDocument[key] = dottedNewData[key];
  });

  // Reform object from dotted strings
  const result = dot.object(dottedDocument);

  // Update the lastUpdated property and change its position in the object
  delete (result as any).lastUpdated;
  Object.assign(result, { lastUpdated: dayjs().format("L LT") });

  const success = await db
    .collection("guilds")
    .replaceOne({ _id: guildId }, result)
    .then(() => true)
    .catch((err) => false);

  return success;
};

export default updateServerModule;
