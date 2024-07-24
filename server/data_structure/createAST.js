import Node from './Node.js'
export default function createAST(ruleString) {
    const tokens = tokenize(ruleString);
    const ast = parse(tokens);
    return ast;
  }
  
  function tokenize(ruleString) {
    const tokens = [];
    let currentToken = '';
  
    for (let i = 0; i < ruleString.length; i++) {
      const char = ruleString[i];
  
      if (char === ' ') {
        if (currentToken !== '') {
          tokens.push(currentToken);
          currentToken = '';
        }
      } else if (char === '(' || char === ')') {
        if (currentToken !== '') {
          tokens.push(currentToken);
          currentToken = '';
        }
        tokens.push(char);
      } else if (char === '>' || char === '<' || char === '=') {
        if (currentToken !== '') {
          tokens.push(currentToken);
          currentToken = '';
        }
        tokens.push(char);
      } else {
        currentToken += char;
      }
    }
  
    if (currentToken !== '') {
      tokens.push(currentToken);
    }
  
    return tokens;
  }
  
  function parse(tokens) {
    const stack = [];
    const operators = [];
  
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
  
      if (token === '(') {
        operators.push(token);
      } else if (token === ')') {
        while (operators[operators.length - 1] !== '(') {
          const operator = operators.pop();
          const right = stack.pop();
          const left = stack.pop();
          stack.push(new Node('operator', operator, left, right));
        }
        operators.pop(); // Remove the '('
      } else if (token === 'AND' || token === 'OR') {
        while (
          operators.length > 0 &&
          operators[operators.length - 1] !== '(' &&
          getPrecedence(operators[operators.length - 1]) >= getPrecedence(token)
        ) {
          const operator = operators.pop();
          const right = stack.pop();
          const left = stack.pop();
          stack.push(new Node('operator', operator, left, right));
        }
        operators.push(token);
      } else if (token === '>' || token === '<' || token === '=') {
        const operand1 = stack.pop();
        const operand2 = tokens[i + 1];
        i++; // Skip the next token
        stack.push(new Node('operand', `${operand1.value} ${token} ${operand2}`));
      } else {
        stack.push(new Node('operand', token));
      }
    }
  
    while (operators.length > 0) {
      const operator = operators.pop();
      const right = stack.pop();
      const left = stack.pop();
      stack.push(new Node('operator', operator, left, right));
    }
  
    return stack[0];
  }
  
  function getPrecedence(operator) {
    if (operator === 'AND') {
      return 1;
    } else if (operator === 'OR') {
      return 0;
    } else {
      return -1;
    }
  }