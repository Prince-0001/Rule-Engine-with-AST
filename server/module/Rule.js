import mongoose from "mongoose";

const astSchema = new mongoose.Schema({
  type: String,
  left: { type: mongoose.Schema.Types.Mixed, ref: 'Rule' },
  right: { type: mongoose.Schema.Types.Mixed, ref: 'Rule' },
  value: String,
});

const ruleSchema = new mongoose.Schema({
  rule: String,
  ast: astSchema,
});

const Rule = mongoose.model('Rule', ruleSchema);

export default Rule;