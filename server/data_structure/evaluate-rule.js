
function evaluateRule(ast, data) {
    if (ast.type === 'operand') {
      const [key, operator, value] = ast.value.split(' ');
      const userData = data[key];
      switch (operator) {
        case '>':
          return userData > parseFloat(value.replace(/\'|\"/g, ''));
        case '<':
          return userData < parseFloat(value.replace(/\'|\"/g, ''));
        case '=':
          return userData === value.replace(/\'|\"/g, '');
        default:
          throw new Error(`Unknown operator: ${operator}`);
      }
    } else if (ast.type === 'operator') {
      const leftResult = evaluateRule(ast.left, data);
      const rightResult = evaluateRule(ast.right, data);
      switch (ast.value) {
        case 'AND':
          return leftResult && rightResult;
        case 'OR':
          return leftResult || rightResult;
        default:
          throw new Error(`Unknown operator: ${ast.value}`);
      }
    } else {
      throw new Error(`Unknown node type: ${ast.type}`);
    }
  }

  export default evaluateRule;