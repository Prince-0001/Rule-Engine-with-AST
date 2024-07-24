import { useState } from "react";

const RuleInput = ({ onCreateRule,error,setError}) => {
  const [ruleString, setRuleString] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onCreateRule(ruleString);
      setRuleString('');
      setError('');
      
    } catch (error) {
    }
  };

  return (
    <div className='w-full'>
      <form onSubmit={handleSubmit} className="w-2/3 mx-auto p-4 bg-white shadow-xl rounded">
        <h2 className="text-lg font-bold mb-4">Create a New Rule</h2>
        {error && (
          <div className="text-red-500 text-sm mb-2">{error}</div>
        )}
        <input
          type="text"
          value={ruleString}
          onChange={(e)=>setRuleString(e.target.value)}
          placeholder="Enter a rule"
          className="w-full p-2 pl-10 text-sm mb-2 text-gray-700 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Rule
        </button>
      </form>
    </div>
  );
};

export default RuleInput;