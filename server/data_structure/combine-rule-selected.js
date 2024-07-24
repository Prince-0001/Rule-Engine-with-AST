import Rule from "../module/Rule";
export default async function combineRuleSelected(ruleIds) {

    // Fetch the rules from the database
    const rules = await Rule.find({ _id: { $in: ruleIds } });
  
    // Create a frequency map to store the frequency of each operator
    const freqMap = {};
    for (const rule of rules) {
      traverseAST(rule.ast, (node) => {
        if (node.type === 'operator') {
          freqMap[node.value] = (freqMap[node.value] || 0) + 1;
        }
      });
    }
  
    // Sort the operators by frequency in descending order
    const sortedOperators = Object.keys(freqMap).sort((a, b) => freqMap[b] - freqMap[a]);
  
    // Combine the rules using the most frequent operator
    let root = null;
    for (const rule of rules) {
      if (!root) {
        root = rule.ast;
      } else {
        root = combineASTs(root, rule.ast, sortedOperators[0]);
      }
    }
  
    return root;
  }