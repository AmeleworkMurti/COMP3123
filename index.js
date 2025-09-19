var http = require("http");
//TODO - Use Employee Module here

let employees = [
    {id: 1, firstName: "Pritesh", lastName: "Patel", email: "pritesh@gmail.com", Salary:5000},
    {id: 2, firstName: "Krish", lastName: "Lee", email: "krish@gmail.com", Salary:4000},
    {id: 3, firstName: "Racks", lastName: "Jacson", email: "racks@gmail.com", Salary:5500},
    {id: 4, firstName: "Denial", lastName: "Roast", email: "denial@gmail.com", Salary:9000}
]

function getAllEmployees() {
    return employees;
}

function getEmployeeById(id) {
    return employees.find(emp => emp.id === id);
}

module.exports = {
    getAllEmployees,
    getEmployeeById
};

console.log("Lab 03 -  NodeJs");

//TODO - Fix any errors you found working with lab exercise
//Define Server Port
const port = process.env.PORT || 8081

//Create Web Server using CORE API
const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.writeHead(405, { "Content-Type": "application/json"});
        return res.end(JSON.stringify({ error: http.STATUS_CODES[405] }));
    } 
    
   
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    return res.end("<h1>Welcome to Lab Exercise 03</h1>");
  }

  if (req.url === "/employee") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(getAllEmployees()));
  }

  if (req.url === "/employee/names") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const names = employees
      .map(e => `${e.firstName} ${e.lastName}`)
      .sort(); 
    return res.end(JSON.stringify(names));
  }

  if (req.url === "/employee/totalsalary") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const total = employees.reduce((sum, e) => sum + e.Salary, 0);
    return res.end(JSON.stringify({ total_salary: total }));
  }

  
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: http.STATUS_CODES[404] }));
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});