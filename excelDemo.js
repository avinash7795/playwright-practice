//importing exceljs pacakge to class
const ExcelJs = require('exceljs');

//creating a function to print the values in excel file
async function excelTest() {
    //creating a object with row and column number with default values
    let output = { row: -1, col: -1 };
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
            //comparing cell value with required value 'Apple'
            if (cell.value === 'Banana') {
                //storing rowNumber to row and colNumber to col in output object
                output.row = rowNumber;
                output.col = colNumber;
            }

        })

    })
    //getting cell location
    const cell = worksheet.getCell(output.row, output.col);
    //replacing required value in cell
    cell.value = 'Republic';
    //writing replaced cell value to the excel file
    await workbook.xlsx.writeFile("C:/Users/avinash.kunapareddy/Downloads/excelDownloadTest.xlsx");
}

//calling excelTest function
excelTest();