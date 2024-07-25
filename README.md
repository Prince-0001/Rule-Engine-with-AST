
# Rule Engine With AST 

A simple 3-tier rule engine application to determine user eligibility based on attributes like age, department, income, spend, etc.


## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express


## Getting Started

To get started with the website, simply navigate to the homepage and select a rule to evaluate. Then, input the required data in the evaluation form and click the "Evaluate" button to see the result.

```bash
  step1 : Add one Rule or Add Combine multiple Rules

  step 2: Select the one Rule

  Step 3: Enter the data and Evaluate
```


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd rule-engine
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Server
This server is a Node.js application that provides a RESTful API for managing rules and evaluating them using a rule engine. The server uses MongoDB as its database and is built using Express.js.
## Deployment

To deploy the server

```bash
cd server
npm install
nodemon index.js
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SECRET_KEY`

`MONGO_URL`


## API Reference

#### Create a Rule

```http
  GET /api/rules/create
```

#### Cinbine two or more Rules

```http
  POST /api/rules/combine
```
#### Get all the Rules

```http
  GET /api/rules/getall
```
#### Delete the Rule

```http
  Delete /api/rules/${id}
```
#### Evaluate the Rule

```http
  Post /api/rules/evaluate
```



##  Schema

- `rule: A string representing the rule definition`

- `ast: An abstract syntax tree (AST) representation of the rule, composed of:`
`type: A string representing the node type (e.g. "AND", "OR", etc.).`

`left: A reference to another rule or a value.`

`right: A reference to another rule or a value.`

`value: A string representing the value of the node.`

## 🔗 Depoly -Links
`Frontend` (https://rule-engine-with-ast.vercel.app)

`Backend`  (https://rule-engine-with-ast.onrender.com)