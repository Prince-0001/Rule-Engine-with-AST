import express from 'express';
import Rule from '../module/Rule.js';
import combineRule from '../data_structure/combine-rule.js';
import createAST from '../data_structure/createAST.js';
import evaluateRule from '../data_structure/evaluate-rule.js';

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const ruleString = req.body.ruleString;
    if (!ruleString || ruleString.trim() === '') {
      return res.status(400).send({ message: 'Rule string is required' });
    }
    const ast = createAST(ruleString);
    if (!ast) {
      return res.status(400).send({ message: 'Invalid rule string' });
    }
    const rule = new Rule({ rule: ruleString, ast });
    await rule.save();
    res.status(201).send({ rule });
  } catch (error) {
    res.status(500).send({ message: 'Error creating rule' });
  }
});

router.post('/combine', async (req, res) => {
  try {
    const combineRulesArray = req.body;
    if (!Array.isArray(combineRulesArray) || combineRulesArray.length < 2) {
      return res.status(400).send({ message: 'At least two rules are required to combine' });
    }
    const combinedAst = combineRule(combineRulesArray);
    if (!combinedAst) {
      return res.status(400).send({ message: 'Invalid rules to combine' });
    }
    const rule = new Rule({ rule: 'combine', combinedAst });
    await rule.save(rule);
    res.status(200).send({ rule });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error combining rules' });
  }
});

router.post('/evaluate', async (req, res) => {
  try {
    const ruleId = req.body.astId;
    const data = req.body.data;
    if (!ruleId || !data) {
      return res.status(400).send({ message: 'Rule ID and data are required' });
    }
    const rule = await Rule.findById(ruleId);
    if (!rule) {
      return res.status(404).send({ message: 'Rule not found' });
    }
    const result = evaluateRule(rule.ast, data);
    if (result === null || result === undefined) {
      return res.status(400).send({ message: 'Invalid data to evaluate' });
    }
    res.status(200).send({ result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error evaluating rule' });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const rules = await Rule.find().exec();
    res.status(200).json(rules.map(rule => rule.toJSON()));
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Rule.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;