import fs from 'fs';
import os from 'os';

const memoryData = () => {
  const heap = process.memoryUsage().heapUsed / 1024 / 1024;
  const date = new Date().toISOString();
  const freeMemory = Math.round((os.freemem() * 100) / os.totalmem()) + "%";

  let csv = `${date}, ${heap}, ${freeMemory}\n`;

  fs.appendFile("demo.csv", csv, function (err: any) {
    if (err) throw err;
    console.log("server details logged!", csv);
  });
}

export default memoryData;
