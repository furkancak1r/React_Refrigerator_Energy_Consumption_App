// Define your URLs
const URLBEGINNING = "http://localhost:4000";
//const URLBEGINNING = "https://backend-energy-consumption.prosocockpit.com";
const apiUrls = {
  adminUrl: URLBEGINNING + "/api/login",
  adminLogoutUrl: URLBEGINNING + "/api/logout",
  adminControlUrl: URLBEGINNING + "/api/admin/control",
  deleteRowUrl: URLBEGINNING + "/api/energy/delete",
  fetchDataUrl: URLBEGINNING + "/api/energy/fetchTable",
  updateRowUrl: URLBEGINNING + "/api/energy/updateRow",
  fetchColumnNamesUrl: URLBEGINNING + "/api/admin/columnNames",
  addRowUrl: URLBEGINNING + "/api/admin/addRow",
  fetchExactMatchSerialNoUrl:
    URLBEGINNING + "/api/energy/fetchExactMatchSerialNo",
  fetchLanguageUrl: URLBEGINNING + "/api/language",
  evaporatorPanUrl: URLBEGINNING + "/api/admin/updateEvaporatorPan",
  testerNamesUrl: URLBEGINNING + "/api/testerNames",
  addNewTesterNameUrl: URLBEGINNING + "/api/testerNames/addNewTesterName",
  deleteTesterNameUrl: URLBEGINNING + "/api/testerNames/deleteTesterName",

};

// Export the URLs
module.exports = apiUrls;
