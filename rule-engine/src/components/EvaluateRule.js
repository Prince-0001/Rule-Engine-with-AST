import React, { useState } from 'react';

const EvaluateRule = ({ astId }) => {
  const [data, setData] = useState({
    age: '',
    department: '',
    salary: '',
    experience: '',
  });

  const [results, setResults] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Data:', data);
    handleEvaluate();
  };

  const handleEvaluate = () => {
    // Call API to evaluate rule
    fetch('http://localhost:8800/api/rules/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ astId, data }),
    })
     .then((response) => response.json())
     .then((data) => {
        console.log(data);
        setResults(data);
        setData({
          age: '',
          department: '',
          salary: '',
          experience: '',
        });
        setResults("")
      })
     .catch((error) => console.error(error));
  };

  return (
    <div className="flex justify-center items-center mt-6">
      <div className="w-2/3 p-8 bg-white rounded-lg shadow-md mx-4 border-r-2 border-gray-300">
        <h2 className="text-2xl text-gray-700 mb-4 font-bold text-center">Evaluate Rule</h2>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex mb-4">
            <label className="w-1/4 text-sm text-gray-700 mr-2">Age:</label>
            <input
              type="number"
              name="age"
              value={data.age}
              onChange={handleInputChange}
              className="w-3/4 pl-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="flex mb-4">
            <label className="w-1/4 text-sm text-gray-700 mr-2">Department:</label>
            <input
              type="text"
              name="department"
              value={data.department}
              onChange={handleInputChange}
              className="w-3/4 pl-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="flex mb-4">
            <label className="w-1/4 text-sm text-gray-700 mr-2">Salary:</label>
            <input
              type="number"
              name="salary"
              value={data.salary}
              onChange={handleInputChange}
              className="w-3/4 pl-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="flex mb-4">
            <label className="w-1/4 text-sm text-gray-700 mr-2">Experience:</label>
            <input
              type="number"
              name="experience"
              value={data.experience}
              onChange={handleInputChange}
              className="w-3/4 pl-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-500"
            >
              Evaluate
            </button>
          </div>
        </form>
      </div>
      <div className="w-1/3 p-8 bg-white rounded-lg shadow-md mx-4 pl-4 border-l-2 border-gray-300">
        <h2 className="text-2xl text-gray-700 mb-4">Result:</h2>
        <p className="text-3xl text-gray-700 font-bold">{results? 'True' : 'False'}</p>
      </div>
    </div>
  );
};

export default EvaluateRule;