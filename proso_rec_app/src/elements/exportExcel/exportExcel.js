import XLSX from "xlsx-js-style";
import { toast } from "react-toastify";

export default function ExportExcel(data, serialNumber, loginInfo) {
  if (data) {
    if (loginInfo === "testtakimi") {
      // Verileri tarihe göre sırala
      data.sort(function (a, b) {
        const dateA = new Date(a.DateColumn);
        const dateB = new Date(b.DateColumn);
        return dateB - dateA;
      });

      // En son tarihe ait verileri seç
      const maxDate = new Date(data[0].DateColumn);
      const maxTestTimeRows = data.filter((item) => {
        const itemDate = new Date(item.DateColumn);
        return itemDate.getTime() === maxDate.getTime();
      });

      if (maxTestTimeRows && maxTestTimeRows.length !== data.length) {
        // "data" dizisini en son tarihe ait verilerle güncelle
        data = maxTestTimeRows;
        toast.info("Sadece en son tarihe ait kolonlar indirildi.", {
          position: "top-left",
        });
      }
    }

    const headerFont = { bold: true };
    const cellStyle = {
      alignment: { vertical: "center", horizontal: "center" },
      border: {
        top: { style: "thin", color: "000000" },
        left: { style: "thin", color: "000000" },
        bottom: { style: "thin", color: "000000" },
        right: { style: "thin", color: "000000" },
      },
      font: { bold: false },
    };

    const getDate = (isoDateString) => {
      const isoDate = new Date(isoDateString);

      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
        timeZone: "Europe/Istanbul",
      };

      const formattedDate = isoDate.toLocaleString("tr-TR", options);
      return formattedDate;
    };
    const serialNo = data[0].SerialNo;
    const headers = [
      "Product Serial Number",
      serialNo,
      "Tested Time",
      getDate(data[0].DateColumn),
      ...(data.every((item) => item.EvaporatorPan)
        ? ["Evap. Pan Checked"]
        : []),
    ];

    const headers2 = [
      "Tested Unit",
      "Set Value",
      "Limits",
      "Test Result",
      "Test Duration",
    ];

    const body = data.map((item) => {
      const row = [
        item.TIName,
        `${item.ConditionSet} ${item.ConditionUnit}`,
        `${item.ResultMin}~${item.ResultMax} ${item.ResultConditionUnit}`,
        `${item.ResultValue.toFixed(2)} ${item.ResultUnit}`,
        `${item.TestTimeSet} ${item.TestTimeUnit}`,
      ];

      return row;
    });

    // Calculate column widths
    function fitToColumn(data) {
      // Her sütunun en fazla karakter sayısını bulun
      return data[1].map((a, i) => ({
        wch:
          Math.max(...data.map((a2) => (a2[i] ? a2[i].toString().length : 0))) *
          1.1,
      }));
    }

    // Satır yüksekliğini hesaplayan fonksiyon
    // function fitToRow(data) {
    //   // Her satırın en fazla karakter sayısını bulun
    //   return data.map((a) => ({
    //     hpx: Math.max(...a.map((a2) => (a2 ? a2.toString().length : 0))) * 1.2,
    //   }));
    // }
    // const rowHeights = fitToRow([headers, headers2, ...body]);
    const colWidths = fitToColumn([headers, headers2, ...body]);
    // Calculate row heights

    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.aoa_to_sheet([headers, headers2, ...body]);

    const range = {
      s: { r: 0, c: 0 },
      e: { r: body.length +1, c: body[0].length - 1 },
    };

    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_address = { c: C, r: R };
        const cell_ref = XLSX.utils.encode_cell(cell_address);
        let cell = worksheet[cell_ref];
        if (!cell) cell = worksheet[cell_ref] = { t: "s", v: "" };
        if (R === 0 || R === 1) {
          // If it's the header row, apply the headerFont style
          cell.s = { ...cellStyle, font: headerFont };
        } else {
          // For data rows, apply the regular cellStyle
          cell.s = cellStyle;
        }
      }
    }

    worksheet["!ref"] = XLSX.utils.encode_range(range);

    // Set column widths
    worksheet["!cols"] = colWidths;

    // Set row heights
    worksheet["!rows"] = [20, 20, 20, 20, 20, 20, 20];

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Energy Consumption Data"
    );

    XLSX.writeFile(workbook, `${serialNumber}.xlsx`);
  }
}
