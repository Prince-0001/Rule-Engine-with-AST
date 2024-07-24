const RuleList = ({ rules, onDeleteRule , onSelectRule }) => {
  return (

    <div className="flex flex-col flex-wrap justify-center mt-4 items-center">
      <h2 className="text-3xl font-bold">Rules List</h2>
      {rules.map((ruleChild, index) => (
        <div key={index} className="w-4/5 p-2">
          <div className="bg-white rounded shadow-xl p-4">
            <div className="flex items-center justify-between">
              <input
                type="checkbox"
                id={`rule-${ruleChild._id}`}
                onChange={()=>onSelectRule(ruleChild._id)}
                className="mr-2 w-4 h-4 "
              />
              <label htmlFor={`rule-${ruleChild._id}`} className="text-lg text-gray-700">{ruleChild.rule}</label>
              <button
                type="button"
                onClick={() => onDeleteRule(ruleChild._id)}
                className="bg-orange-500 hover:bg-orange-700 ml-3 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RuleList;