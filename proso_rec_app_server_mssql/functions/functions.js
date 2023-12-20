import bcrypt from "bcrypt";
import MDBReader from "mdb-reader";

import queries from "../helpers/queries.json" assert { type: "json" };
const {
  getLatestRowQuery,
  insertEnergyQuery,
  deleteEnergyQuery,
  updateEnergyQuery,
  checkUsernameQuery,
  fetchEnergyDataQuery,
  fetchColumnNamesQuery,
  fetchExactMatchSerialNoQuery,
  insertFromMdbQuery,
  fetchLanguageQuery,
  updateEvaporatorPan,
} = queries;

import { sql, pool } from "../db/dbConnector.js";

function loginFn(req, res) {
  const plaintextPassword = req.body.password;
  // bcrypt.hash(plaintextPassword, 10, function (err, hash) {
  //   console.log("aaa:", hash);
  // });

  checkUsername(req, res, async (usernameExists, passwordResult) => {
    if (usernameExists) {
      const passwordHashed = passwordResult[0]?.PasswordHashed;

      if (!passwordHashed) {
        return res.status(500).json({ message: "Password hash not found" });
      }

      bcrypt.compare(plaintextPassword, passwordHashed, (err, result) => {
        if (err) {
          // Handle the error, e.g., log it or return an error response
          return res.status(500).json({ message: "Internal server error" });
        }

        if (result) {
          // Passwords match, set the user session and send a success response
          req.session.user = req.body.username;
          res.status(200).json({ message: "Login Success" });
        } else {
          // Passwords do not match or the username does not exist
          res
            .status(321)
            .json({ message: "Username or password is incorrect" });
        }
      });
    } else {
      res.status(321).json({ message: "Username or password is incorrect" });
    }
  });
}

function logout(req, res) {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error while destroying the session: ", err);
        res.status(500).send("Session destruction error");
      } else {
        res.send("Oturum kapatıldı");
      }
    });
  } else {
    res.send("Oturum açık değil");
  }
}

function controlFn(req, res) {
  checkUsername(req, res, async (usernameExists) => {
    let user = req.session.user;
    if (usernameExists) {
      res.status(200).json({ message: "Login Success", username: user });
    } else {
      res.status(321).json({ message: "Unauthorized" });
    }
  });
}
function fetchTable(req, res) {
  checkUsername(req, res, async (usernameExists) => {
    if (usernameExists) {
      fetchTableForAdmin(req, res);
    } else {
      fetchTableForUser(req, res);
    }
  });
}

function fetchTableForUser(req, res) {
  const SerialNo = req.body.SerialNo;
  pool
    .request()
    .input("SerialNo", sql.VarChar(50), SerialNo)
    .query(getLatestRowQuery)
    .then((result) => {
      const resultData = result.recordset;
      if (resultData) {
        // Kontrol: EvaporatorPan kolonundaki tüm değerler 0 mı?
        const allEvaporatorPanZero = resultData.every(
          (row) => row.EvaporatorPan === 0
        );

        if (allEvaporatorPanZero) {
          // EvaporatorPan kolonunu sil
          resultData.forEach((row) => delete row.EvaporatorPan);
        }

        return res.status(200).json(resultData);
      } else {
        return res.status(321).json({ error: "Data not found" });
      }
    })
    .catch((err) => {
      console.error("Error while executing the query: ", err);
      return res.status(500).json({ error: "Query execution error" });
    });
}

function fetchTableForAdmin(req, res) {
  const SerialNo = req.body.SerialNo;

  pool
    .request()
    .input("SerialNo", sql.VarChar(50), SerialNo)
    .query(fetchEnergyDataQuery)
    .then((result) => {
      if (result.recordset.length === 0) {
        return res.status(321).json({ error: "Data not found" });
      }

      const data = result.recordset;
      return res.status(200).json(data);
    })
    .catch((err) => {
      console.error("Error while executing the query: ", err);
      return res.status(500).json({ error: "Query execution error" });
    });
}
function fetchExactMatchSerialNo(req, res) {
  const SerialNo = req.body.SerialNo;

  pool
    .request()
    .input("SerialNo", sql.VarChar(50), SerialNo)
    .query(fetchExactMatchSerialNoQuery)
    .then((result) => {
      if (result.recordset.length === 0) {
        return res.status(321).json({ error: "Data not found" });
      }

      const data = result.recordset;
      return res.status(200).json(data);
    })
    .catch((err) => {
      console.error("Error while executing the query: ", err);
      return res.status(500).json({ error: "Query execution error" });
    });
}

function deleteFn(req, res) {
  const IdForRow = req.body.IdForRow;

  checkUsername(req, res, (usernameExists) => {
    if (!usernameExists) {
      return res.status(321).send("Data not found & Unauthorized");
    }

    const request = new sql.PreparedStatement();
    request.input("IdForRow", sql.Int);

    pool
      .request()
      .input("IdForRow", sql.Int, IdForRow)
      .query(deleteEnergyQuery)
      .then((result) => {
        if (result.rowsAffected[0] === 0) {
          return res.status(321).send("Data not found");
        }

        res.status(200).send("Data deleted successfully");
      })
      .catch((err) => {
        console.error("Error while executing the query: ", err);
        res.status(500).send("Database query error");
      });
  });
}

function updateRowFn(req, res) {
  const { TesterName, SerialNo, oldSerialNo } = req.body;
  checkUsername(req, res, (usernameExists) => {
    if (!usernameExists) {
      return res.status(321).send("Data not found & Unauthorized");
    }
    const request = new sql.PreparedStatement();
    request.input("SerialNo", sql.VarChar(50));
    request.input("oldSerialNo", sql.VarChar(50));

    request.input("TesterName", sql.VarChar(255));
    pool
      .request()
      .input("SerialNo", sql.VarChar(50), SerialNo)
      .input("oldSerialNo", sql.VarChar(50), oldSerialNo)
      .input("TesterName", sql.VarChar(255), TesterName)
      .query(updateEnergyQuery)
      .then((result) => {
        res.status(200).send("Data updated successfully");
      })
      .catch((err) => {
        console.error("Error while executing the query: ", err);
        res.status(500).send("Database query error");
      });
  });
}

function columnNamesFn(req, res) {
  checkUsername(req, res, (usernameExists) => {
    if (!usernameExists) {
      return res.status(321).send("Data not found & Unauthorized");
    }

    const request = new sql.PreparedStatement();
    request.input("tableName", sql.VarChar(50));

    pool
      .request()
      .input("tableName", sql.VarChar(50), "EnergyConsumptionTable")
      .query(fetchColumnNamesQuery)
      .then((result) => {
        if (result.recordset.length === 0) {
          return res.status(321).send("Data not found");
        } else {
          let columns = result.recordset;
          res.status(200).json(columns);
        }
      })
      .catch((err) => {
        console.error("Error while executing the query: ", err);
        res.status(500).send("Database query error");
      });
  });
}

function addRowFn(req, res) {
  const {
    TesterName,
    SerialNo,
    ResultMin,
    ResultMax,
    TIName,
    ConditionSet,
    ConditionUnit,
    ResultConditionUnit,
    ResultValue,
    ResultUnit,
    TestTimeSet,
    TestTimeUnit,
    EvaporatorPan,
    DateColumn,
  } = req.body;

  // Kullanıcı adı var mı kontrol edin
  checkUsername(req, res, (usernameExists) => {
    if (!usernameExists) {
      return res.status(321).send("Data not found & Unauthorized");
    }

    // Define and execute the SQL query to insert all data
    pool
      .request()
      .input("TesterName", sql.NVarChar(255), TesterName)
      .input("SerialNo", sql.NVarChar(64), SerialNo)
      .input("ResultMin", sql.Float, ResultMin)
      .input("ResultMax", sql.Float, ResultMax)
      .input("TIName", sql.NVarChar(20), TIName)
      .input("ConditionSet", sql.Float, ConditionSet)
      .input("ConditionUnit", sql.NVarChar(5), ConditionUnit)
      .input("ResultConditionUnit", sql.NVarChar(5), ResultConditionUnit)
      .input("ResultValue", sql.Float, ResultValue)
      .input("ResultUnit", sql.NVarChar(5), ResultUnit)
      .input("TestTimeSet", sql.Float, TestTimeSet)
      .input("TestTimeUnit", sql.NVarChar(5), TestTimeUnit)
      .input("EvaporatorPan", sql.Float, EvaporatorPan)
      .input("DateColumn", sql.DateTime2, DateColumn)
      .input("UploadType", sql.NVarChar(64), "Manuel")

      .query(insertEnergyQuery)
      .then((result) => {
        res.status(200).send("Veri başarıyla eklenmiştir");
      })
      .catch((err) => {
        console.error("Sorgu çalıştırılırken hata oluştu: ", err);
        res.status(500).send("Veritabanı sorgu hatası");
      });
  });
}

function extractDateFromFileName(fileName) {
  const dateMatch = fileName.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (dateMatch && dateMatch.length === 4) {
    const year = dateMatch[1];
    const month = dateMatch[2];
    const day = dateMatch[3];
    const extractedDate = `${day}-${month}-${year}`;
    return extractedDate;
  } else {
    return "Tarih dosya adından çıkarılamadı.";
  }
}

async function addDataToEnergyConsumptionTable(buffer, fileName) {
  try {
    const reader = new MDBReader(buffer);
    const table = reader.getTable("TestConditionResult");
    const data = table.getData();

    if (data.length === 0) {
      console.log("Dosya boş veya veri bulunamadı.");
      return false;
    }

    const extractedDate = extractDateFromFileName(fileName);
    if (extractedDate.startsWith("Tarih")) {
      console.log("Tarih dosya adından çıkarılamadı.");
      return false;
    }
    function getDate(extractedDate, systemTime) {
      let combinedDateTime = `${extractedDate}T${systemTime}`;
      var parts = combinedDateTime.split(/[-T:]/); // Veriyi parçalara ayır
      var year = parseInt(parts[2]);
      var month = parseInt(parts[1]) - 1; // Ayın sıfır tabanlı indeksi kullanılır
      var day = parseInt(parts[0]);
      var hour = parseInt(parts[3]);
      var minute = parseInt(parts[4]);
      var second = parseInt(parts[5]);

      var date = new Date(year, month, day, hour, minute, second);

      return date.toISOString();
    }

    try {
      await Promise.all(
        data.map(async (row) => {
          const request = new sql.PreparedStatement();
          let systemTime = row.SystemTime;
          let dateValue = getDate(extractedDate, systemTime);
          request.input("SerialNo", sql.NVarChar(64));
          request.input("ID", sql.SmallInt);
          request.input("TIID", sql.SmallInt);
          request.input("TIName", sql.NVarChar(20));
          request.input("ConditionSet", sql.Float);
          request.input("ConditionOut", sql.Float);
          request.input("ConditionFormat", sql.SmallInt);
          request.input("ConditionUnit", sql.NVarChar(5));
          request.input("ResultMin", sql.Float);
          request.input("ResultMax", sql.Float);
          request.input("ResultConditionUnit", sql.NVarChar(5));
          request.input("ResultValue", sql.Float);
          request.input("ResultFormat", sql.Int);
          request.input("ResultUnit", sql.NVarChar(5));
          request.input("TestStateID", sql.Int);
          request.input("TestState", sql.NVarChar(10));
          request.input("TestTimeSet", sql.Float);
          request.input("TestTime", sql.Float);
          request.input("TestTimeFormat", sql.Int);
          request.input("TestTimeUnit", sql.NVarChar(5));
          request.input("LineNo", sql.SmallInt);
          request.input("DateColumn", sql.DateTime);
          request.input("UploadType", sql.NVarChar(64), "Automatic");

          await pool
            .request()
            .input("SerialNo", sql.NVarChar(64), row.SerialNo)
            .input("ID", sql.SmallInt, row.ID)
            .input("TIID", sql.SmallInt, row.TIID)
            .input("TIName", sql.NVarChar(20), row.TIName)
            .input("ConditionSet", sql.Float, row.ConditionSet)
            .input("ConditionOut", sql.Float, row.ConditionOut)
            .input("ConditionFormat", sql.SmallInt, row.ConditionFormat)
            .input("ConditionUnit", sql.NVarChar(5), row.ConditionUnit)
            .input("ResultMin", sql.Float, row.ResultMin)
            .input("ResultMax", sql.Float, row.ResultMax)
            .input(
              "ResultConditionUnit",
              sql.NVarChar(5),
              row.ResultConditionUnit
            )
            .input("ResultValue", sql.Float, row.ResultValue)
            .input("ResultFormat", sql.Int, row.ResultFormat)
            .input("ResultUnit", sql.NVarChar(5), row.ResultUnit)
            .input("TestStateID", sql.Int, row.TestStateID)
            .input("TestState", sql.NVarChar(10), row.TestState)
            .input("TestTimeSet", sql.Float, row.TestTimeSet)
            .input("TestTime", sql.Float, row.TestTime)
            .input("TestTimeFormat", sql.Int, row.TestTimeFormat)
            .input("TestTimeUnit", sql.NVarChar(5), row.TestTimeUnit)
            .input("LineNo", sql.SmallInt, row.LineNo)
            .input("DateColumn", sql.DateTime, dateValue)
            .input("UploadType", sql.NVarChar(64), "Automatic")
            .query(insertFromMdbQuery);
          return true;
        })
      );
    } catch (error) {
      console.error(`Error processing file ${fileName}:`, error);
      return false;
    }
    return true;
  } catch (error) {
    console.error(`Error processing file ${fileName}:`, error);
    return false;
  }
}

async function addMdbFiles(req, res) {
  if (!req.files || !req.files.mdbFile) {
    return res.status(400).send("Dosya yüklenmedi.");
  }

  const mdbFile = req.files.mdbFile;
  const fileName = mdbFile.name;

  const result = await addDataToEnergyConsumptionTable(mdbFile.data, fileName);

  if (result) {
    res.status(200).send("Dosya başarıyla okundu ve işlendi.");
  } else {
    res.status(500).send("Veritabanına veri eklenirken hata oluştu.");
  }
}

function checkUsername(req, res, callback) {
  const user = req.body.username || req.session.user || "";

  pool
    .request()
    .input("username", sql.VarChar(50), user)
    .query(checkUsernameQuery)
    .then((result) => {
      const usernameExists = result.recordset.length > 0;
      callback(usernameExists, result.recordset);
    })
    .catch((err) => {
      console.error("Error while executing the query: ", err);
      callback(false, null);
    });
}

function fetchLanguage(req, res) {
  const { language } = req.body;

  pool
    .request()
    .input("language", sql.VarChar(50), language)
    .query(fetchLanguageQuery)
    .then((result) => {
      const newResult = result.recordset;
      if (newResult) {
        res.status(200).json(newResult);
      } else {
        res.status(500).send("Language fetch error");
      }
    })
    .catch((err) => {
      console.error("Error while executing the query: ", err);
      res.status(500).send("Language fetch error");
    });
}

function updateEvaporatorPanFn(req, res) {
  const { SerialNo, EvaporatorPan, TesterName } = req.body;
  checkUsername(req, res, (usernameExists) => {
    if (!usernameExists) {
      return res.status(321).send("Data not found & Unauthorized");
    }

    const request = new sql.PreparedStatement();
    request.input("SerialNo", sql.VarChar(50));
    request.input("EvaporatorPan", sql.Float);
    request.input("TesterName", sql.VarChar(255));

    pool
      .request()
      .input("SerialNo", sql.VarChar(50), SerialNo)
      .input("EvaporatorPan", sql.Float, EvaporatorPan)
      .input("TesterName", sql.VarChar(255), TesterName)
      .query(updateEvaporatorPan)
      .then((result) => {
        res.status(200).send("Data updated successfully");
      })
      .catch((err) => {
        console.error("Error while executing the query: ", err);
        res.status(500).send("Database query error");
      });
  });
}
export {
  loginFn,
  logout,
  controlFn,
  fetchTable,
  fetchTableForUser,
  fetchTableForAdmin,
  fetchExactMatchSerialNo,
  deleteFn,
  checkUsername,
  updateRowFn,
  columnNamesFn,
  addRowFn,
  addMdbFiles,
  fetchLanguage,
  updateEvaporatorPanFn,
};
