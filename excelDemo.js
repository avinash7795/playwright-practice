//importing exceljs pacakge to class
const ExcelJs = require('exceljs');

//creating a function to write the values in excel workbook by taking searchtext, replacetext, change object and filepath
async function writeExcel(searchText, replaceText, change, filepath) {

    //creating object for ExcelJs class and accessing Workbook of excel file
    const workbook = new ExcelJs.Workbook();
    //reading path of the excel file
    await workbook.xlsx.readFile(filepath);
    //accessing first sheet of excel workbook
    const worksheet = workbook.getWorksheet('Sheet1');
    //calling readExcel() function with worksheet and searchtext as argument and storing the returned output object in a variable
    const output = await readExcel(worksheet, searchText);
    //getting cell location by getting row num from output object and col num by incrementing with change object value
    const cell = worksheet.getCell(output.row, output.col + change.colChange);
    //replacing required value in cell
    cell.value = replaceText;
    //writing replaced cell value to the excel file
    await workbook.xlsx.writeFile(filepath);
}

//creating readExcel() function by taking worksheet and searchText as arguments
async function readExcel(worksheet, searchText) {
    //creating a object with row and column number with default values
    let output = { row: -1, col: -1 };
    //accessing row by row using rownumber by eachRow function
    worksheet.eachRow((row, rowNumber) => {
        //accessing cell by cell on iterating through column number using eachCell function
        row.eachCell((cell, colNumber) => {
            //comparing cell value with required searchText value
            if (cell.value === searchText) {
                //storing rowNumber to row and colNumber to col in output object
                output.row = rowNumber;
                output.col = colNumber;
            }

        })

    })
    //returning output object with row and col numbers
    return output;
}

//calling writeExcel function
writeExcel("Mango", 350, { rowChange: 0, colChange: 2 }, "C:/Users/avinash.kunapareddy/Downloads/excelDownloadTest.xlsx");