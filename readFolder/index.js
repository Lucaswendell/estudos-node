const fs = require("fs");
const moment = require("moment");

function fomartDate(date) {
  return moment(date).format("DD/MM/yyyy HH:mm:ss");
}

let txtFile = "";
fs.readdirSync("../").forEach((file) => {
  const isFileIgnore = /(^|\/)\.[^\/\.]/g.test(file);
  const fileStat = fs.statSync(`../${file}`);

  if (isFileIgnore || fileStat.isFile()) return;

  const fileReplace = file.replace(/(\d){0,}\_/g, " ");
  txtFile += `# ${fileReplace.toUpperCase()} | ${fomartDate(
    fileStat.birthtime
  )}\n\r`;

  const filesChild = fs.readdirSync(`../${file}`);
  const filesChildOrder = filesChild.sort((a, b) => {
    const birthtimeA = moment(fs.statSync(`../${file}/${a}`).birthtime);
    const birthtimeB = moment(fs.statSync(`../${file}/${b}`).birthtime);

    if (birthtimeA.isAfter(birthtimeB)) return 1;
    if (birthtimeA.isBefore(birthtimeB)) return -1;

    return 0;
  });

  filesChildOrder.forEach((fileChild, index) => {
    const fileReplaceChild = fileChild.replaceAll(/(\d){0,}\_/g, " ");
    const fileChildStat = fs.statSync(`../${file}/${fileChild}`);
    txtFile += `${index + 1}. ${fileReplaceChild.toLowerCase()} | ${fomartDate(
      fileChildStat.birthtime
    )}\n\r`;
  });
});

fs.writeFileSync("../paths.md", txtFile);
