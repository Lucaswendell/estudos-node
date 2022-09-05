const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

eventEmitter.on("start", () => {
  console.log("durante");
});

console.log("Antes");

eventEmitter.emit("start");

console.log("depois");
