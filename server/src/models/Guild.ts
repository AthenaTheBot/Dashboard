import mongoose from "mongoose";

const GuildSchema = new mongoose.Schema(
  {
    _id: String,
    settings: {
      prefix: String,
      language: String,
    },
    modules: {
      moderationModule: {
        adminRole: String || null,
        modRole: String || null,
        autoRole: String || null,
        warnings: Array,
      },
      funModule: Object,
      utilsModule: Object,
    },
    lastUpdated: String,
  },
  { versionKey: false }
);

const GuildModel = mongoose.model("Guild", GuildSchema);

export default GuildModel;
