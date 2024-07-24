import { useState } from "react";

const CombineRule = ({ onCombineRule ,error}) => {
  const [ruleStrings, setRuleStrings] = useState([{ value: "" }]);
  const [combinedRule, setCombinedRule] = useState([]);

  const handleAddRule = () => {
    setRuleStrings([...ruleStrings, { value: "" }]);
  };

  const handleRuleChange = (index, value) => {
    setRuleStrings(
      ruleStrings.map((rule, i) => {
        if (i === index) {
          return { value };
        }
        return rule;
      })
    );
  };

  const handleCombineRules = () => {
    const combinedRuleArray = ruleStrings.map((rule) => rule.value);
    setCombinedRule(combinedRuleArray);
    onCombineRule(combinedRuleArray);
    
  };

  return (
    <div className="w-full mt-4">
      <form className="w-2/3 mx-auto p-4 bg-white shadow-xl rounded">
        <h2 className="text-lg font-bold mb-4">Combine Rules</h2>
        {error && (
          <div className="text-red-500 text-sm mb-2">{error}</div>
        )}
        {ruleStrings.map((rule, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              value={rule.value}
              onChange={(e) => handleRuleChange(index, e.target.value)}
              placeholder="Enter a rule"
              className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded"
            />
            {index > 0 && (
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={() => setRuleStrings(ruleStrings.filter((_, i) => i!== index))}
              >
                -
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="bg-green-500 hover:bg-green-700 text-white mr-2 font-bold py-2 px-4 rounded"
          onClick={handleAddRule}
        >
          +
        </button>
        <button
          type="button"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCombineRules}
        >
          Combine Rules
        </button>
        {combinedRule.length > 0 && (
          <p className="text-lg font-bold mt-4">Combined Rule: {combinedRule.join(", ")}</p>
        )}
      </form>
    </div>
  );
};

export default CombineRule;