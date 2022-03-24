//  const readline = require("readline-sync");
//  const name = readline.question("what the\n");
//  console.log(name);

// json(javascript object notation)

//  const http = require("http");
//  const server = http.createServer((req, res) => {
//       console.log(req.url);
//    if (req.url === "/") {
//      res.write("<h1>hihihi");
//    } else {
//      res.write("<h1>error!!!");
//    }
//    res.end();
//  });
//  server.listen(3000, () => {
//    console.log("the server is listening");
//  });
// const express = require("express");
// const server = express();
//  const hbs = require("express-handlebars");

//  server.use((res, req) => {
//    console.log("wow");
//  });// amiddleware,이를 거치기 때문에 로컬에는 안뜸
// server.use((req, res, next) => {
//   req.user = {
//     id: "1111"
//   };
//   next();
// });

// server.get("/", (req, res) => {
//      __dirname//경로찾기
//      __filename
//   console.log(req.user);
//   res.sendFile(__dirname + "/index.html");
// });
// server.get("/about", (req, res) => {
//   res.sendFile(__dirname + "/about.html");
// });
// server.use((req, res) => {
//   res.sendFile(__dirname + "/404.html");
// });

// server.listen(3000, error => {
//   if (error)
//     return console.log(error);
//   console.log("server is listening");
// }); get!!!!!!!!!
