var pdf = require("html-pdf");
var aejs = require("async-ejs");


aejs.renderFile(
  "./notebookTemplate.ejs",
  { userName: name, machineNumber: machineNumber, setor: setor }, {async: true},
  (err, html) => {
    if (err) {
      console.log(err);
    } else {
      pdf.create(html, {}).toFile("./output/teste.pdf", (err, res) => {
        if (err) {
          return console.log(err);
        } else {
          console.log(res);
        }
      });
    }
  }
);
