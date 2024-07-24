import createRule from "./createAST.js"
export default function combineRule(rules) {
  const freqMap = {};
  for (const rule of rules) {
    const ast = createRule(rule);
    traverseAST(ast, (node) => {
      if (node.type === 'operator') {
        freqMap[node.value] = (freqMap[node.value] || 0) + 1;
      }
    });
  }

  const sortedOperators = Object.keys(freqMap).sort((a, b) => freqMap[b] - freqMap[a]);

  let root = null;
  for (const rule of rules) {
    const ast = createRule(rule);
    if (!root) {
      root = ast;
    } else {
      root = combineASTs(root, ast, sortedOperators[0]);
    }
  }

  return root;
}

function combineASTs(left, right, operator) {
  return {
    type: 'operator',
    value: operator,
    left,
    right
  };
}

function traverseAST(ast, callback) {
  callback(ast);
  if (ast.left) {
    traverseAST(ast.left, callback);
  }
  if (ast.right) {
    traverseAST(ast.right, callback);
  }
}
// const rule1 = "age > 30 AND department = 'Sales'";
// const rule2 = "age < 25 OR department = 'Marketing'";
// const rule3 = "salary > 50000 OR experience > 5";

// const rules = [rule1, rule2, rule3];

// const combinedAst = combineRule(rules);

// console.log(combinedAst.left);
// // {
// //   "type": "operator",
// //   "value": "AND",
// //   "left":{
// //     "type": "operator",
// //     "value": "AND",
// //     "left": {
// //       "type": "operator",
// //       "value": "OR",
// //       "left": {
// //         "type": "operand",
// //         "value": "age > 30"
// //       },
// //       "right": {
// //         "type": "operand",
// //         "value": "age < 25"
// //       }
// //     },
// //     "right": {
// //       "type": "operator",
// //       "value": "OR",
// //       "left": {
// //         "type": "operand",
// //         "value": "department = 'Sales'"
// //       },
// //       "right": {
// //         "type": "operand",
// //         "value": "department = 'Marketing'"
// //       }
// //     }
// //   },
// //   "right": Node {
// //     type: 'operator',
// //     value: 'OR',
// //     left: Node {
// //       type: 'operand',
// //       value: 'salary > 50000',
// //       left: undefined,
// //       right: undefined
// //     },
// //     right: Node {
// //       type: 'operand',
// //       value: 'experience > 5',
// //       left: undefined,
// //       right: undefined
// //     }
// // }
  
  
// //   const data = {
// //     "age": 35,
// //     "department": "Sales",
// //     "salary": 60000,
// //     "experience": 3
// //   };