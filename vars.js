const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

var name;
var machineNumber;
var setor;

readline.question(
  "Nome do Funcionario, Número da máquina e Setor",
  (userName, number, userSetor) => {
    name = userName;
    machineNumber = number;
    setor = userSetor;
  }
);
