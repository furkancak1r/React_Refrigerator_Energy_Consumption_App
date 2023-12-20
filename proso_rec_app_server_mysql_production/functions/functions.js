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
  checkExistingRowQuery,
  updateEvaporatorPanForAdmin,
  fetchTesterNamesQuery,
  addNewTesterNameQuery,
  deleteTesterNameQuery,
} = queries;

import { pool } from "../db/dbConnector.js";

async function loginFn(req, res) {
  const plaintextPassword = req.body.password;
  // bcrypt.hash(plaintextPassword, 10, function (err, hash) {
  //   console.log("aaa:", hash);
  // });

  await checkUsername(req, res, async (usernameExists, passwordResult) => {
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
            .status(401)
            .json({ message: "Username or password is incorrect" });
        }
      });
    } else {
      res.status(401).json({ message: "Username or password is incorrect" });
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

async function controlFn(req, res) {
  await checkUsername(req, res, async (usernameExists) => {
    let user = req.session.user;
    if (usernameExists) {
      res.status(200).json({ message: "Login Success", username: user });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  });
}
async function fetchTable(req, res) {
  await checkUsername(req, res, async (usernameExists) => {
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
    .execute(getLatestRowQuery, [SerialNo, SerialNo])
    .then(([resultData]) => {
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
        return res.status(404).json({ error: "Data not found" });
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
    .execute(fetchEnergyDataQuery, [SerialNo])
    .then(([data]) => {
      if (data.length === 0) {
        return res.status(404).json({ error: "Data not found" });
      }

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
    .execute(fetchExactMatchSerialNoQuery, [SerialNo])
    .then(([data]) => {
      if (data.length === 0) {
        return res.status(404).json({ error: "Data not found" });
      }

      return res.status(200).json(data);
    })
    .catch((err) => {
      console.error("Error while executing the query: ", err);
      return res.status(500).json({ error: "Query execution error" });
    });
}

async function deleteFn(req, res) {
  const IdForRow = req.body.IdForRow;

  await checkUsername(req, res, (usernameExists) => {
    if (!usernameExists) {
      return res.status(401).send("Unauthorized");
    }

    pool
      .execute(deleteEnergyQuery, [IdForRow])
      .then(([result]) => {
        if (result.affectedRows === 0) {
          return res.status(404).send("Data not found");
        }

        res.status(200).send("Data deleted successfully");
      })
      .catch((err) => {
        console.error("Error while executing the query: ", err);
        res.status(500).send("Database query error");
      });
  });
}

async function updateRowFn(req, res) {
  const { TesterName, SerialNo, oldSerialNo } = req.body;
  await checkUsername(req, res, (usernameExists) => {
    if (!usernameExists) {
      return res.status(401).send("Unauthorized");
    }

    pool
      .execute(updateEnergyQuery, [SerialNo, TesterName, oldSerialNo])
      .then(([result]) => {
        res.status(200).send("Data updated successfully");
      })
      .catch((err) => {
        console.error("Error while executing the query: ", err);
        res.status(500).send("Database query error");
      });
  });
}

async function columnNamesFn(req, res) {
  await checkUsername(req, res, (usernameExists) => {
    if (!usernameExists) {
      return res.status(401).send("Unauthorized");
    }

    pool
      .execute(fetchColumnNamesQuery, ["energyconsumptiontable"])
      .then(([columns]) => {
        if (columns.length === 0) {
          return res.status(404).send("Data not found");
        } else {
          res.status(200).json(columns);
        }
      })
      .catch((err) => {
        console.error("Error while executing the query: ", err);
        res.status(500).send("Database query error");
      });
  });
}

async function addRowFn(req, res) {
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
  await checkUsername(req, res, (usernameExists) => {
    if (!usernameExists) {
      return res.status(401).send("Unauthorized");
    }

    // Define and execute the SQL query to insert all data
    pool
      .execute(insertEnergyQuery, [
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
        "Manuel",
      ])
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
      let combinedDateTime = `${extractedDate} ${systemTime}`;
      var parts = combinedDateTime.split(/[-\s:]/);
      var year = parseInt(parts[2]);
      var month = parseInt(parts[1]) - 1;
      var day = parseInt(parts[0]);
      var hour = parseInt(parts[3]);
      var minute = parseInt(parts[4]);
      var second = parseInt(parts[5]);

      var date = new Date(year, month, day, hour, minute, second);

      return date.toISOString().slice(0, 19).replace("T", " ");
    }

    try {
      await Promise.all(
        data.map(async (row) => {
          let systemTime = row.SystemTime;
          let dateValue = getDate(extractedDate, systemTime);

          // Check if a row with the same SerialNo and DateColumn already exists
          const [existingRows] = await pool.execute(checkExistingRowQuery, [
            row.SerialNo,
            dateValue,
          ]);

          if (existingRows.length > 0) {
            // Row already exists, skip inserting new data
            //console.log(`Row with SerialNo ${row.SerialNo} and DateColumn ${dateValue} already exists. Skipping insertion.`);
          } else {
            // Row doesn't exist, insert new data
            await pool.execute(insertFromMdbQuery, [
              row.SerialNo,
              row.ID,
              row.TIID,
              row.TIName,
              row.ConditionSet,
              row.ConditionOut,
              row.ConditionFormat,
              row.ConditionUnit,
              row.ResultMin,
              row.ResultMax,
              row.ResultConditionUnit,
              row.ResultValue,
              row.ResultFormat,
              row.ResultUnit,
              row.TestStateID,
              row.TestState,
              row.TestTimeSet,
              row.TestTime,
              row.TestTimeFormat,
              row.TestTimeUnit,
              row.LineNo,
              dateValue,
              "Automatic",
            ]);
            console.log(
              `Data for SerialNo ${row.SerialNo} inserted successfully.`
            );
          }

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

async function fetchTesterNamesFn(req, res) {
  await checkUsername(req, res, (usernameExists) => {
    if (!usernameExists) {
      return res.status(401).send("Unauthorized");
    }

    pool
      .execute(fetchTesterNamesQuery)
      .then(([data]) => {
        if (data.length === 0) {
          return res.status(404).json({ error: "Data not found" });
        }

        res.status(200).json(data);
      })
      .catch((err) => {
        console.error("Error while executing the query: ", err);
        res.status(500).json({ error: "Query execution error" });
      });
  });
}
async function checkUsername(req, res, callback) {
  const user = req.body.username || req.session.user || "";
  pool
    .execute(checkUsernameQuery, [user])
    .then(([result]) => {
      const usernameExists = result.length > 0;
      callback(usernameExists, result);
    })
    .catch((err) => {
      console.error("Error while executing the query: ", err);
      callback(false, null);
    });
}

function fetchLanguage(req, res) {
  const { language } = req.body;

  pool
    .execute(fetchLanguageQuery, [language])
    .then(([newResult]) => {
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
async function addNewTesterNameFn(req, res) {
  const { newTesterName } = req.body;
  await checkUsername(req, res, (usernameExists) => {
    if (!usernameExists) {
      return res.status(401).send("Unauthorized");
    }

    pool
      .execute(addNewTesterNameQuery, [newTesterName])
      .then((result) => {
        res.status(200).send("Data updated successfully");
      })
      .catch((err) => {
        console.error("Error while executing the query: ", err);
        res.status(500).send("Database query error");
      });
  });
}
async function deleteTesterNameFn(req, res) {
  const { testerName } = req.body;
  await checkUsername(req, res, (usernameExists) => {
    if (!usernameExists) {
      return res.status(401).send("Unauthorized");
    }

    pool
      .execute(deleteTesterNameQuery, [testerName])
      .then((result) => {
        res.status(200).send("Data updated successfully");
      })
      .catch((err) => {
        console.error("Error while executing the query: ", err);
        res.status(500).send("Database query error");
      });
  });
}

async function updateEvaporatorPanFn(req, res) {
  const { SerialNo, EvaporatorPan, TesterName } = req.body;
  const user = req.body.username || req.session.user || "";
  await checkUsername(req, res, (usernameExists) => {
    if (!usernameExists) {
      return res.status(401).send("Unauthorized");
    }

    const updateQuery =
      user === "admin" ? updateEvaporatorPanForAdmin : updateEvaporatorPan;
    const updateParams =
      user === "admin"
        ? [EvaporatorPan, SerialNo]
        : [EvaporatorPan, TesterName, SerialNo];

    pool
      .execute(updateQuery, updateParams)
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
  fetchTesterNamesFn,
  addNewTesterNameFn,
  deleteTesterNameFn,
};
