import { createServer } from "node:http";

const server = createServer((req, res) => {
  console.log("request received");

  res.statusCode200;

  res.setHeader("Content-Type", "text/html");

  res.end(  "<html> <body> <h1> This is my beautiful server! </h1></body> </html>"
  );
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
