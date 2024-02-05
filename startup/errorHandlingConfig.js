export default function errorHandlingConfig() {
  // catching unhandled exception
  process.on("uncaughtException", (ex) => {
    console.log("We got an Exception");
    console.log(ex);
    process.exit(1);
  });

  // catching unhandled Rejection
  process.on("unhandledRejection", (ex) => {
    console.log("We got a Rejection");
    console.log(ex);
    process.exit(1);
  });
}
