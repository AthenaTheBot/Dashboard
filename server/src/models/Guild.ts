import mongoose from "mongoose";

const GuildSchema = new mongoose.Schema(
  {
    _id: String,
    modules: {
      settings: {
        prefix: String,
        language: String,
      },
      moderation: {
        adminRole: String || null,
        modRole: String || null,
        autoRole: String || null,
        warnings: Array,
      },
      fun: Object,
      utils: Object,
    },
    lastUpdated: String,
  },
  { versionKey: false }
);

const GuildModel = mongoose.model("Guild", GuildSchema);

export default GuildModel;
