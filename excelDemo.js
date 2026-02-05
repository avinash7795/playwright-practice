//importing exceljs pacakge to class
const ExcelJs = require('exceljs');

//creating a function to print the values in excel file
async function excelTest() {
    //creating object for ExcelJs class and accessing Workbook of excel file
    const workbook = new ExcelJs.Workbook();
    //reading path of the excel file
    await workbook.xlsx.readFile("C:/Users/avinash.kunapareddy/Downloads/excelDownloadTest.xlsx");
    //accessing first sheet of excel workbook
    const worksheet = workbook.getWorksheet('Sheet1');
    //accessing row by row using rownumber by eachRow function
    worksheet.eachRow((row, rowNumber) => {
        //accessing cell by cell on iterating through column number using eachCell function
        row.eachCell((cell, colNumber) => {
            //printing the values of each cell
            console.log(cell.value);

        })

    })
}

//calling excelTest function
excelTest();