const Service = require('node-windows').Service;

const svc = new Service({
  name: 'proso_rec_app_file_upload_service',
  script: 'C:\\Users\\furkan.cakir\\Desktop\\FurkanPRS\\Kodlar\\refrigeratorEnergyConsumptionApp\\proso_rec_app_file_upload_service\\server.js'
});

svc.on('uninstall', function () {
  svc.uninstall();
});

svc.uninstall();
