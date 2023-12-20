import sql from "mssql/msnodesqlv8.js";
import config from "./dbConfig.js";
import pkg from 'mssql/msnodesqlv8.js';
const { ConnectionPool } = pkg;

const pool = new ConnectionPool(config);

pool
  .connect()
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error: ", err);
  });

  export { sql, pool };

// const prepareStatement = (sql, query, params, callback) => {
//     const ps = new sql.PreparedStatement(); // Yeni bir prepared statement oluştur
//     for (let param of params) { // Parametre dizisini döngüye al
//         ps.input(param.name, param.type); // Her parametreyi tanımla
//     }
//     ps.prepare(query, function(err) { // Sorguyu hazırla
//         if (err) {
//             console.error('Error preparing the statement: ', err);
//             callback(err, null);
//         } else {
//             callback(null, ps); // Hazırlanan sorguyu geri döndür
//         }
//     });
// };

//  "getMaxRevisionQuery": "SELECT * FROM EnergyConsumptionTable WHERE ProductSerialNumber = @ProductSerialNumber AND Revision = (SELECT MAX(Revision) FROM EnergyConsumptionTable WHERE ProductSerialNumber = @ProductSerialNumber)",
//  "fetchEnergyDataQuery": "SELECT * FROM EnergyConsumptionTable WHERE ProductSerialNumber = @ProductSerialNumber",
