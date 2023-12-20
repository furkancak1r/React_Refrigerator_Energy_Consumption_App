// databaseConfig.js
// Windows ile giriş yapmak için user ve passworde gerek yok ama sql giriş doğrulaması isteniyorsa o zaman kullanılacak
const config = {
    server: "localhost",
    database: "EnergyConsumptionDb",
    //user: "sa",
    //password: "your_password",
    options: {
        trustedConnection: true,
    },
    driver: "msnodesqlv8",
};

export default config;

// -- EnergyConsumptionTable adında bir tablo oluştur
// USE EnergyConsumptionDb;

// CREATE TABLE EnergyConsumptionTable (
//     Id INT IDENTITY(1,1) PRIMARY KEY, -- Otomatik artan ID sütunu
//     ProductSerialNumber NVARCHAR(255),
//     TestResultKw DECIMAL(10, 3),
//     MinKw DECIMAL(10, 3),
//     MaxKw DECIMAL(10, 3),
//     Revision INT NOT NULL,
//     CreateDate DATETIME
// );

// -- EnergyConsumptionTable adında bir tablo oluştur
// USE EnergyConsumptionDb;
// CREATE TABLE EnergyConsumptionUsersTable (
// 	Username varchar(255),
// 	PasswordHashed TEXT,
// );


// USE EnergyConsumptionDb;
// INSERT INTO EnergyConsumptionTable (ProductSerialNumber, TestResultKw, MinKw, MaxKw, Revision, CreateDate)
// VALUES
// ('ABC123_61016_000001', 12.345, 10.000, 15.000, 1, '2023-10-10 09:00:00'),
// ('ABC123_61016_000002', 9.876, 8.000, 12.000, 2, '2023-10-10 09:15:00'),
// ('ABC123_61016_000003', 15.789, 14.000, 18.000, 3, '2023-10-10 09:30:00'),
// ('ABC123_61016_000001', 12.345, 10.000, 15.000, 2, '2023-10-10 09:00:00'),
// ('ABC123_61016_000002', 9.876, 8.000, 12.000, 3, '2023-10-10 09:15:00'),
// ('ABC123_61016_000003', 15.789, 14.000, 18.000, 4, '2023-10-10 09:30:00'),

// ('SS230752_61016_000001', 12.345, 10.000, 15.000, 1, '2023-10-10 09:00:00'),
// ('SS230752_61016_000002', 9.876, 8.000, 12.000, 2, '2023-10-10 09:15:00'),
// ('SS230752_61016_000003', 15.789, 14.000, 18.000, 3, '2023-10-10 09:30:00'),
// ('SS230752_61016_000004', 12.345, 10.000, 15.000, 4, '2023-10-10 09:00:00'),
// ('SS230752_61016_000005', 9.876, 84.000, 12.000, 5, '2023-10-10 09:15:00'),
// ('SS230752_61016_000006', 15.789, 145.000, 18.000, 6, '2023-10-10 09:30:00'),
// ('SS230752_61016_000007', 12.345, 10.000, 15.000, 7, '2023-10-10 09:00:00'),
// ('SS230752_61016_000008', 9.876, 6.000, 12.000, 8, '2023-10-10 09:15:00'),
// ('SS230752_61016_000009', 15.789, 17.000, 18.000, 9, '2023-10-10 09:30:00')
// DELETE FROM EnergyConsumptionTable;
// USE EnergyConsumptionDb;
// select * from EnergyConsumptionTable order by DateColumn, SystemTime,ID
// select * from EnergyConsumptionTable;
// DROP TABLE EnergyConsumptionTable;
// DROP TABLE LanguageTable;
// USE EnergyConsumptionDb;
// SELECT MAX(Revision) FROM EnergyConsumptionTable WHERE ProductSerialNumber = 'deneme'
// SELECT
// COLUMN_NAME
// FROM INFORMATION_SCHEMA.COLUMNS
// WHERE TABLE_NAME='EnergyConsumptionTable'

// USE EnergyConsumptionDb;
// SELECT ProductSerialNumber FROM EnergyConsumptionTable WHERE ProductSerialNumber LIKE '%abc%'

// USE EnergyConsumptionDb;
// SELECT * FROM EnergyConsumptionTable WHERE ProductSerialNumber LIKE 'ABC123%' AND Revision = (SELECT MAX(Revision) FROM EnergyConsumptionTable WHERE ProductSerialNumber = 'ABC123')


// USE EnergyConsumptionDb;
// SELECT t1.*
// FROM EnergyConsumptionTable t1
// WHERE t1.ProductSerialNumber LIKE 'ABC123%'
// AND t1.Revision = (SELECT MAX(t2.Revision) 
//                    FROM EnergyConsumptionTable t2
//                    WHERE t2.ProductSerialNumber = t1.ProductSerialNumber);


// CREATE TABLE EnergyConsumptionTable (
//     Id INT IDENTITY(1,1) PRIMARY KEY, -- Otomatik artan ID sütunu
//     ProductSerialNumber NVARCHAR(255),
//     TestResultKw DECIMAL(10, 3),
//     MinKw DECIMAL(10, 3),
//     MaxKw DECIMAL(10, 3),
//     Revision INT NOT NULL,
//     CreateDate DATETIME
// );

// SELECT PasswordHashed FROM EnergyConsumptionUsersTable WHERE Username = 'admin'
// SELECT * FROM EnergyConsumptionTable WHERE ProductSerialNumber = 'ABC123' AND Revision = (SELECT MAX(Revision) FROM EnergyConsumptionTable WHERE ProductSerialNumber = 'ABC123')

// USE EnergyConsumptionDb;
// CREATE TABLE EnergyConsumptionUsersTable (
// 	Username varchar(255),
// 	PasswordHashed TEXT,
// );

// USE EnergyConsumptionDb;
// INSERT INTO EnergyConsumptionUsersTable (Username,PasswordHashed) VALUES ('admin',
// '$2b$10$JDLiDfUrccu7734/wzXaS.NimUN3pa1xxk0p70EkGkRWPQ/gUt5W.');

// USE EnergyConsumptionDb;
// select * from EnergyConsumptionUsersTable;

// USE EnergyConsumptionDb;
// DELETE FROM EnergyConsumptionUsersTable;



// SELECT *
// FROM EnergyConsumptionTable
// WHERE SerialNo = 'SS230705_67037_000089'
// AND (DateColumn = (SELECT MAX(DateColumn) FROM EnergyConsumptionTable WHERE SerialNo = 'SS230705_67037_000089')
// AND SystemTime = (SELECT MAX(SystemTime) FROM EnergyConsumptionTable WHERE SerialNo = 'SS230705_67037_000089'))
// ORDER BY DateColumn DESC, SystemTime DESC;

 

// USE EnergyConsumptionDb;
// CREATE TABLE EnergyConsumptionTable (
//  IdForRow INT IDENTITY(1,1) PRIMARY KEY,
//     SerialNo nvarchar(64) NULL,
//     ID smallint NULL,
//     TIID smallint NULL,
//     TIName nvarchar(20) NULL,
//     ConditionSet float NULL,
//     ConditionOut float NULL,
//     ConditionFormat smallint NULL,
//     ConditionUnit nvarchar(5) NULL,
//     ResultMin float NULL,
//     ResultMax float NULL,
//     ResultConditionUnit nvarchar(5) NULL,
//     ResultValue float NULL,
//     ResultFormat int NULL,
//     ResultUnit nvarchar(5) NULL,
//     TestStateID int NULL,
//     TestState nvarchar(10) NULL,
//     TestTimeSet float NULL,
//     TestTime float NULL,
//     TestTimeFormat int NULL,
//     TestTimeUnit nvarchar(5) NULL,
//     [LineNo] smallint NULL,
// 	DateColumn nvarchar(10) NULL, 
// 	SystemTime nvarchar(255) NULL
// );

// SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, IS_NULLABLE
// FROM INFORMATION_SCHEMA.COLUMNS
// WHERE TABLE_NAME = 'EnergyConsumptionTable';

// USE EnergyConsumptionDb;
// DROP TABLE LanguageTable;

// select * from LanguageTable;
// USE EnergyConsumptionDb;
// CREATE TABLE LanguageTable (
//     Id INT IDENTITY(1,1) PRIMARY KEY,
//     [Language] NVARCHAR(255) COLLATE Arabic_100_CI_AI_SC_UTF8,
//     Header NVARCHAR(255) COLLATE Arabic_100_CI_AI_SC_UTF8,
//     Loading NVARCHAR(255) COLLATE Arabic_100_CI_AI_SC_UTF8,
//     DataNotFound NVARCHAR(255) COLLATE Arabic_100_CI_AI_SC_UTF8,
//     [Save] NVARCHAR(255) COLLATE Arabic_100_CI_AI_SC_UTF8,
//     Edit NVARCHAR(255) COLLATE Arabic_100_CI_AI_SC_UTF8,
//     [Delete] NVARCHAR(255) COLLATE Arabic_100_CI_AI_SC_UTF8,
//     ProductSerialNumber NVARCHAR(255) COLLATE Arabic_100_CI_AI_SC_UTF8,
//     TestedUnit NVARCHAR(255) COLLATE Arabic_100_CI_AI_SC_UTF8,
//     SetValue NVARCHAR(255) COLLATE Arabic_100_CI_AI_SC_UTF8,
//     Limits NVARCHAR(255) COLLATE Arabic_100_CI_AI_SC_UTF8,
//     TestResult NVARCHAR(255) COLLATE Arabic_100_CI_AI_SC_UTF8,
//     TestDuration NVARCHAR(255) COLLATE Arabic_100_CI_AI_SC_UTF8,
//     TestTime NVARCHAR(255) COLLATE Arabic_100_CI_AI_SC_UTF8,
// 	ToastLoginSuccess NVARCHAR(255) COLLATE Arabic_100_CI_AI_SC_UTF8,
//     ToastLoginError NVARCHAR(255) COLLATE Arabic_100_CI_AI_SC_UTF8,
// 	ToastLogOutSuccess NVARCHAR(255) COLLATE Arabic_100_CI_AI_SC_UTF8,
//     ToastLogOutError NVARCHAR(255) COLLATE Arabic_100_CI_AI_SC_UTF8,
// 	ToastDeleteRowSuccess NVARCHAR(255) COLLATE Arabic_100_CI_AI_SC_UTF8,
//     ToastDeleteRowError NVARCHAR(255) COLLATE Arabic_100_CI_AI_SC_UTF8,
// 	ToastUpdateRowSuccess NVARCHAR(255) COLLATE Arabic_100_CI_AI_SC_UTF8,
//     ToastUpdateRowError NVARCHAR(255) COLLATE Arabic_100_CI_AI_SC_UTF8,	
// 	ToastAddRowSuccess NVARCHAR(255) COLLATE Arabic_100_CI_AI_SC_UTF8,
//     ToastAddRowError NVARCHAR(255) COLLATE Arabic_100_CI_AI_SC_UTF8);

// USE EnergyConsumptionDb;
// INSERT INTO LanguageTable
//     ( [Language], Header, Loading, DataNotFound, [Save], Edit, [Delete], ProductSerialNumber, TestedUnit, SetValue, Limits, TestResult, TestDuration, TestTime,	ToastLoginSuccess,ToastLoginError,ToastLogOutSuccess,ToastLogOutError,ToastDeleteRowSuccess,ToastDeleteRowError,ToastUpdateRowSuccess,ToastUpdateRowError,ToastAddRowSuccess,ToastAddRowError
// )
// VALUES
//     ( 'Turkish', 'Dolap enerji tüketimini seri numarasıyla sorgula.', 'Yükleniyor..', 'Sonuç bulunamadı', 'Kaydet', 'Düzenle', 'Sil', 'Ürün Seri No', 'Test Edilen Birim', 'Set Değeri', 'Limitler', 'Test Sonucu', 'Test Süresi', 'Test Tarihi','Giriş başarılı yönlendirme işlemi yapılıyor.','Kullanıcı adı veya şifre hatalı!','Admin oturumu basariyla kapatildi!','Çıkış yapılırken hata!','Satır başarıyla silindi!','Satır silinirken bir hata oluştu!','Satır başarıyla güncellendi!','Satır güncellenirken bir hata oluştu!','Satır başarıyla eklendi!','Satır eklenirken bir hata oluştu!');


// -- English
// INSERT INTO LanguageTable
// ([Language], Header, Loading, DataNotFound, [Save], Edit, [Delete], ProductSerialNumber, TestedUnit, SetValue, Limits, TestResult, TestDuration, TestTime, ToastLoginSuccess, ToastLoginError, ToastLogOutSuccess, ToastLogOutError, ToastDeleteRowSuccess, ToastDeleteRowError, ToastUpdateRowSuccess, ToastUpdateRowError, ToastAddRowSuccess, ToastAddRowError)
// VALUES
// ('English', 'Query cabinet energy consumption with serial number', 'Loading...', 'No data found', 'Save', 'Edit', 'Delete', 'Product Serial Number', 'Tested Unit', 'Set Value', 'Limits', 'Test Result', 'Test Duration', 'Test Time', 'Login successful, redirecting...', 'Incorrect username or password!', 'Admin session successfully logged out!', 'Error logging out!', 'Row deleted successfully!', 'An error occurred while deleting row!', 'Row updated successfully!', 'An error occurred while updating row!', 'Row added successfully!', 'An error occurred while adding row!');

// -- German
// INSERT INTO LanguageTable
// ([Language], Header, Loading, DataNotFound, [Save], Edit, [Delete], ProductSerialNumber, TestedUnit, SetValue, Limits, TestResult, TestDuration, TestTime, ToastLoginSuccess, ToastLoginError, ToastLogOutSuccess, ToastLogOutError, ToastDeleteRowSuccess, ToastDeleteRowError, ToastUpdateRowSuccess, ToastUpdateRowError, ToastAddRowSuccess, ToastAddRowError)
// VALUES
// ('German', 'Abfrage des Energieverbrauchs des Schrankes mit Seriennummer', 'Laden...', 'Keine Daten gefunden', 'Speichern', 'Bearbeiten', 'Löschen', 'Produkt Seriennummer', 'Getestete Einheit', 'Wert festlegen', 'Grenzwerte', 'Testergebnis', 'Testdauer', 'Testzeit', 'Anmeldung erfolgreich, Weiterleitung...', 'Falscher Benutzername oder Passwort!', 'Admin-Sitzung erfolgreich abgemeldet!', 'Fehler beim Abmelden!', 'Zeile erfolgreich gelöscht!', 'Beim Löschen der Zeile ist ein Fehler aufgetreten!', 'Zeile erfolgreich aktualisiert!', 'Beim Aktualisieren der Zeile ist ein Fehler aufgetreten!', 'Zeile erfolgreich hinzugefügt!', 'Beim Hinzufügen der Zeile ist ein Fehler aufgetreten!');

// -- Arabic
// INSERT INTO LanguageTable
// ([Language], Header, Loading, DataNotFound, [Save], Edit, [Delete], ProductSerialNumber, TestedUnit, SetValue, Limits, TestResult, TestDuration, TestTime, ToastLoginSuccess, ToastLoginError, ToastLogOutSuccess, ToastLogOutError, ToastDeleteRowSuccess, ToastDeleteRowError, ToastUpdateRowSuccess, ToastUpdateRowError, ToastAddRowSuccess, ToastAddRowError)
// VALUES
// (N'Arabic', N'استعلام عن استهلاك الطاقة للخزانة برقم التسلسل', N'جاري التحميل...', N'لا توجد بيانات', N'حفظ', N'تعديل', N'حذف', N'رقم المنتج التسلسلي', N'وحدة الاختبار', N'قيمة محددة', N'الحدود', N'نتيجة الاختبار', N'مدة الاختبار', N'زمن الاختبار', N'تم تسجيل الدخول بنجاح، يتم إعادة التوجيه...', N'اسم المستخدم أو كلمة المرور غير صحيحة!', N'تم تسجيل الخروج من الجلسة بنجاح!', N'حدث خطأ أثناء تسجيل الخروج!', N'تم حذف الصف بنجاح!', N'حدث خطأ أثناء حذف الصف!', N'تم تحديث الصف بنجاح!', N'حدث خطأ أثناء تحديث الصف!', N'تمت إضافة الصف بنجاح!', N'حدث خطأ أثناء إضافة الصف!');
 
//  -- French
// INSERT INTO LanguageTable
// ([Language], Header, Loading, DataNotFound, [Save], Edit, [Delete], ProductSerialNumber, TestedUnit, SetValue, Limits, TestResult, TestDuration, TestTime, ToastLoginSuccess, ToastLoginError, ToastLogOutSuccess, ToastLogOutError, ToastDeleteRowSuccess, ToastDeleteRowError, ToastUpdateRowSuccess, ToastUpdateRowError, ToastAddRowSuccess, ToastAddRowError)
// VALUES
// ('French', 'Interroger la consommation d''énergie de l''armoire avec le numéro de série', 'Chargement...', 'Aucune donnée trouvée', 'Enregistrer', 'Modifier', 'Supprimer', 'Numéro de série du produit', 'Unité testée', 'Définir la valeur', 'Limites', 'Résultat du test', 'Durée du test', 'Heure du test', 'Connexion réussie, redirection en cours...', 'Nom d''utilisateur ou mot de passe incorrect !', 'Session administrateur déconnectée avec succès !', 'Erreur lors de la déconnexion !', 'Ligne supprimée avec succès !', 'Une erreur s''est produite lors de la suppression de la ligne !', 'Ligne mise à jour avec succès !', 'Une erreur s''est produite lors de la mise à jour de la ligne !', 'Ligne ajoutée avec succès !', 'Une erreur s''est produite lors de l''ajout de la ligne !');
