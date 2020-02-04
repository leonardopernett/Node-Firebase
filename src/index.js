const app = require('./app.js');


async function main(){
   await  app.listen(3000);
    console.log("server on port 3000");
}

main();