import React, { useState,useEffect } from 'react';
import RuleInput from './components/RuleInput';
import RuleList from './components/RuleList';
import EvaluateRule from './components/EvaluateRule';
import CombineRule from './components/CombineRule';
import axios from 'axios';

const App = () => {
  const [rules, setRules] = useState([]);
  const [astId,setAstId]=useState([]);
  const [inputError, setInputError]=useState([]);
  const [combineError, setCombineError]=useState([]);

  useEffect(() => {
    axios.get('http://localhost:8800/api/rules/getAll')
      .then(response => {
        setRules(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleCreateRule = (newRule) => {
    axios.post('http://localhost:8800/api/rules/create', { ruleString: newRule })
      .then(response => {
        setRules([...rules, response.data.rule]);
      })
      .catch(err => {
        setInputError(err.response.data.message);
      
      });
  };

  const handleCombineRule =(combinedRulesArray)=>{
    axios.post('http://localhost:8800/api/rules/combine',combinedRulesArray)
    .then(response=>{
      setRules([...rules,response.data.rule]);
    })
    .catch(err=>{
      setCombineError(err.response.data.message);
    })
  }
  const handleDeleteRule = (ruleId) => {
    axios.delete(`http://localhost:8800/api/rules/${ruleId}`)
      .then(response => {
        setRules(rules.filter(rule => rule._id !== ruleId));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSelectRule=(ruleId)=>{
    setAstId(ruleId);
  }

 

  return (
    <div>
      <div className='flex items-center justify-center m-2'>
        <h1 className="text-3xl font-bold mb-4 flex">Rule Engine with AST</h1>
      </div>
      <RuleInput onCreateRule={handleCreateRule} error={inputError} />
      <CombineRule onCombineRule={handleCombineRule} error={combineError}></CombineRule>
      <EvaluateRule  astId={astId}></EvaluateRule>
      <RuleList rules={rules} onDeleteRule={handleDeleteRule} onSelectRule={handleSelectRule} />
    </div>
  );
};

export default App;