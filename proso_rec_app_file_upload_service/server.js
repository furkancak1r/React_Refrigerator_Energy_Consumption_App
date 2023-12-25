import axios from "axios";
import { readFileSync, existsSync } from "fs";
import MDBReader from "mdb-reader";
import path from "path";

//const url= 'https://backend-energy-consumption.prosocockpit.com'
const url = "http://localhost:4000";
const mdbDirectory = "C:/Users/furkan.cakir/Downloads/mdbDatas2";

let previousRowCount = 0;
let previousDate = null;

// Function to upload the MDB file to the server
const uploadMdbFile = async () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
//  const fileName = `testdata@${2023}-${12}-${14}.mdb`;
  const fileName = `testdata@${year}-${month}-${day}.mdb`;

  const filePath = path.join(mdbDirectory, fileName);

  if (existsSync(filePath)) {
    const buffer = readFileSync(filePath, { flag: "r" });
    const reader = new MDBReader(buffer);
    const table = reader.getTable("TestConditionResult");
    const rowCount = table.getData().length;

    if (previousDate !== day) {
      // Dosya adı değişti, bu nedenle previousRowCount sıfırlanır.
      previousRowCount = 0;
      previousDate = day;
    }

    if (rowCount !== previousRowCount) {
      try {
        const formData = new FormData();
        // Append the buffer as a file to the FormData
        const blob = new Blob([buffer], { type: "application/octet-stream" });
        formData.append("mdbFile", blob, fileName);

        // Send the FormData object to the server using axios
        await axios.post(`${url}/api/admin/addMdbFiles`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("File uploaded to the server.");
      } catch (error) {
        console.error("Error uploading the file: " + error.message);
      }

      // Update the previous row count
      previousRowCount = rowCount;
    }
  } else {
     console.log('Dosya mevcut değil. Hiçbir şey yapılmadı.');
  }
};

// Schedule the uploadMdbFile function to run every 20 seconds
setInterval(uploadMdbFile, 20000);

// import axios from 'axios';
// import { readFileSync, readdirSync } from 'fs';
// import path from 'path';

// //const url= 'https://backend-energy-consumption.prosocockpit.com'
// const url = 'http://localhost:4000';
// const mdbDirectory = 'C:/Users/furkan.cakir/Downloads/mdbDatas';

// const uploadMdbFiles = async (filePath) => {
//   try {
// const buffer = readFileSync(filePath, { flag: 'r' });
//     const fileName = path.basename(filePath);
//     const formData = new FormData();
//     const blob = new Blob([buffer], { type: 'application/octet-stream' });
//     formData.append('mdbFile', blob, fileName);

//     await axios.post(`${url}/api/admin/addMdbFiles`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     console.log('File uploaded to the server.',fileName);
//   } catch (error) {
//     console.error('Error uploading the file: ' + error.message);
//   }
// };

// const uploadAllMdbFiles = async () => {
//   const mdbFiles = readdirSync(mdbDirectory).filter((file) => file.endsWith('.mdb'));

//   for (let file of mdbFiles) {
//     const filePath = path.join(mdbDirectory, file);
//     await uploadMdbFiles(filePath);
//   }
// };

// // Schedule the uploadAllMdbFiles function to run every 1 minute
// uploadAllMdbFiles();
