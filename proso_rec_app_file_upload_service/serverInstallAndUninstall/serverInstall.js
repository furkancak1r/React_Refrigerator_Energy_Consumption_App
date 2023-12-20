var Service = require('node-windows').Service;
var svc = new Service({
 name:'proso_rec_app_file_upload_service',
 description: 'Mdb dosyalarını servera gönderir.',
 script: 'C:\\Users\\furkan.cakir\\Desktop\\FurkanPRS\\Kodlar\\refrigeratorEnergyConsumptionApp\\proso_rec_app_file_upload_service\\server.js',
 startType: 'auto'
});

svc.on('install',function(){
 svc.start();
});

svc.install();
