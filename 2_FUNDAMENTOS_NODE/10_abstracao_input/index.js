import inquirer from "inquirer";

inquirer
  .prompt([
    {
      name: "p1",
      message: "Qual a primeira nota?",
    },
    {
      name: "p2",
      message: "Qual a segundo nota?",
    },
  ])
  .then((answers) => {
    const media = (parseFloat(answers.p1) + parseFloat(answers.p2)) / 2;
    console.log(`A media é: ${media}`);
  })
  .catch((err) => console.log(err));
