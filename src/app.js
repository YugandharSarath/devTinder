const express = require("express");

const app = express();

//Order of the routes matters a lot

app.get("/user/:id/:name/:password", (req, res) => {
  console.log(req.params);
  res.send({ firstName: "Yugandhar", lastName: "Sarath" });
});

// app.post("/user", (req, res) => {
//   res.send("Data successfully saved to database");
// });

// app.delete("/user", (req, res) => {
//   res.send("Deleted Successfully");
// });

app.use("/test", (req, res) => {
  res.send("Hello from the server");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000");
});
