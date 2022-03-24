const express = require("express");
const server = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const connection = mysql.createConnection({host: "localhost", user: "root", password: "7422", port: 3306, database: "Jennifer"});
//request body를 통해서 json을 가지고 올수있게
server.use(bodyParser.json()); //제이슨 포맷을 다 읽을 수 있게
server.use(cors());
const users = [
  {
    ID: "bohyunk",
    name: "Bohyun",
    email: "bohyunk001@gmail.com"
  }, {
    ID: "hello",
    name: "e",
    email: "idontknow"
  }
];
server.get("/api/user", (req, res) => {
  res.json(users);
});

server.get("/api/user/:ID", (req, res) => {
  //   console.log(req.params.ID);
  const user = users.find(u => {
    return u.ID === req.params.ID;
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({errorMessage: "User was not found"});
  }
}); ///사람들을 불러올때 params로 유저 존재여부 파악가능

server.post("/api/user", (req, res) => {
  //   console.log(req.body);
  users.push(req.body);
  res.json(users); // 유저를 추가한다
});

server.put("/api/user/:ID", (req, res) => {
  let foundIndex = users.findIndex(u => u.ID === req.params.ID);
  if (foundIndex === -1) {
    res.status(404).json({errorMessage: "User was not found"});
  } else {
    users[foundIndex] = {
      ...users[foundIndex], //현재있는 foundIndex에서
      ...req.body
    };
    res.json(users[foundIndex]);
  }
}); //업데이트하고싶은 아이디

// sql

server.get("/api/qna", (req, res) => {
  console.log("test");
  connection.query("SELECT * FROM qna", (err, rows, fields) => {
    if (err) 
      throw err;
    
    res.json(rows);
  });
});
// crud
server.post("/api/qna", (req, res) => {
  const {title, contents} = req.body;

  if (title && contents) {
    connection.query(`INSERT INTO qna(title, contents) VALUES ('${title}', '${contents}')`, (err, rows, fields) => {
      if (err) 
        throw err;
      
      res.json(rows);
    });
  }
});

server.get("/api/qna/:idx", (req, res) => {
  const {idx} = req.params;

  console.log(idx);
  //const {title, contents} = req.body;

  connection.query(`SELECT * FROM qna WHERE idx = '${idx}'`, (err, rows, fields) => {
    if (err) 
      throw err;
    if (rows.length !== 1) 
      res.json({res: "error!"});
    else 
      res.json(rows[0]);
    }
  );
});

server.delete("/api/qna/:idx", (req, res) => {
  const {idx} = req.params;

  console.log(idx);
  //const {title, contents} = req.body;

  connection.query(`DELETE FROM qna WHERE idx = '${idx}'`, (err, rows, fields) => {
    if (err) 
      throw err;
    console.log(rows);
    res.json("wow");
  });
});

server.put("/api/qna/:idx", (req, res) => {
  const {idx} = req.params;

  const {title, contents} = req.body;

  console.log(idx);
  //const {title, contents} = req.body;

  connection.query(`UPDATE qna SET title = '${title}', contents = '${contents}' WHERE idx = '${idx}'`, (err, rows, fields) => {
    if (err) 
      throw err;
    console.log(rows);
    res.json("wow");
  });
});

server.get("/api/card", (req, res) => {
  console.log("test");
  connection.query("SELECT * FROM card", (err, rows, fields) => {
    if (err) 
      throw err;
    
    res.json(rows);
  });
});
// crud
server.post("/api/card", (req, res) => {
  const {card1, card2, card3, card4} = req.body;

  if (card1 && card2 && card3 && card4) {
    connection.query(`INSERT INTO card(title, contents) VALUES ('${title}', '${contents}')`, (err, rows, fields) => {
      if (err) 
        throw err;
      
      res.json(rows);
    });
  }
});

server.get("/api/card/:idx", (req, res) => {
  const {idx} = req.params;

  console.log(idx);
  //const {title, contents} = req.body;

  connection.query(`SELECT * FROM card WHERE idx = '${idx}'`, (err, rows, fields) => {
    if (err) 
      throw err;
    if (rows.length !== 1) 
      res.json({res: "error!"});
    else 
      res.json(rows[0]);
    }
  );
});

server.delete("/api/card/:idx", (req, res) => {
  const {idx} = req.params;

  console.log(idx);
  //const {title, contents} = req.body;

  connection.query(`DELETE FROM card WHERE idx = '${idx}'`, (err, rows, fields) => {
    if (err) 
      throw err;
    console.log(rows);
    res.json("wow");
  });
});

server.put("/api/card/:idx", (req, res) => {
  const {idx} = req.params;

  const {title, contents} = req.body;

  console.log(idx);
  //const {title, contents} = req.body;

  connection.query(`UPDATE card SET title = '${title}', contents = '${contents}' WHERE idx = '${idx}'`, (err, rows, fields) => {
    if (err) 
      throw err;
    console.log(rows);
    res.json("wow");
  });
});

server.listen(3000, () => {
  console.log("server running");
});
server.delete("/api/user/:ID", (req, res) => {
  let foundIndex = users.findIndex(u => u.ID === req.params.ID);
  if (foundIndex === -1) {
    res.status(404).json({errorMessage: "User was not found"});
  } else {
    let foundUser = users.splice(foundIndex, 1); //한칸을 지운다
    res.json(foundUser[0]);
  }
});
exports.pagingServerSide = (curpage, pageSize) => {
  const DEFAULT_START_PAGE = 1;
  const DEFAULT_PAGE_SIZE = 5;

  if (!curpage || curpage <= 0) 
    curpage = DEFAULT_START_PAGE;
  if (!pageSize || pageSize <= 0) 
    pageSize = DEFAULT_PAGE_SIZE;
  
  let result = {
    offset: (curpage - 1) * Number(pageSize),
    limit: Number(pageSize)
  };

  return result;
};
