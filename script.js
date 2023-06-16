// Object for displaying label text
var formLabel = {
    minCol: 'Starting Column Value',
    maxCol: 'Ending Column Value',
    minRow: 'Starting Row Value',
    maxRow: 'Ending Row Value',
}
// input array for mapping to formLabel object. Much like an enumerated value.
var inputArray = ['minCol', 'maxCol', 'minRow', 'maxRow'];
// When page loads display label contents
window.onload = () => {
    document.getElementById('minColLabel').innerHTML = formLabel.minCol;
    document.getElementById('maxColLabel').innerHTML = formLabel.maxCol;
    document.getElementById('minRowLabel').innerHTML = formLabel.minRow;
    document.getElementById('maxRowLabel').innerHTML = formLabel.maxRow;
}
// Used this to practice jquery. Hides error msgs
$(document).ready(() => {
    $('#minColValid').hide();
    $('#maxColValid').hide();
    $('#minRowValid').hide();
    $('#maxRowValid').hide();
})
// Input validation function to check for start > end or invalid inputs
function validateInput(rowStart, rowEnd, colStart, colEnd) {
    // input values object. valid checks for empty or nil value, value holds the parsed number
    let inputValues = {
        minCol: {
            value: colStart,
            valid: (colStart != '' && colStart != null && !isNaN(colStart))
        },
        maxCol: {
            value: colEnd,
            valid: (colEnd != '' && colEnd != null && !isNaN(colEnd))
        },
        minRow: {
            value: rowStart,
            valid: (rowStart != '' && rowStart != null && !isNaN(rowStart))
        },
        maxRow: {
            value: rowEnd,
            valid: (rowEnd != '' && rowEnd != null && !isNaN(rowEnd))
        }
    };
    // Iterate through string array and use the mapped value of each item in array to map to object inputValues
    for (let i of inputArray) {
        if (!inputValues[i].valid) {
            $(`#${i}Valid`).html('**value cannot be empty');
            $(`#${i}Valid`).show();
        } else {
            $(`#${i}Valid`).html('');
            $(`#${i}Valid`).hide();
        }
    }
    // check for max > min
    if (inputValues['minCol'].value > inputValues['maxCol'].value) {
        $(`#maxColValid`).html('**value cannot be less than minimum.');
        $(`#maxColValid`).show();
        inputValues['maxCol'].valid = false;
    }
    if (inputValues['minRow'].value > inputValues['maxRow'].value) {
        $(`#maxRowValid`).html('**value cannot be less than minimum.');
        $(`#maxRowValid`).show();
        inputValues['maxRow'].valid = false;
    }
    // if all max/min objects are valid, then proceed with table generation
    return (inputValues.maxCol.valid && inputValues.minCol.valid && inputValues.maxRow.valid && inputValues.minRow.valid);
}
function genTable(e) {
    // get value of each input
    const rowStart = document.getElementById('minRow').value;
    const rowEnd = document.getElementById('maxRow').value;
    const colStart = document.getElementById('minCol').value;
    const colEnd = document.getElementById('maxCol').value;
    // validate it by passing parsed number(Int) to validateInput function
    if (!validateInput(parseInt(rowStart), parseInt(rowEnd), parseInt(colStart), parseInt(colEnd))) {
        // if false, nothing happens in this function
        e.preventDefault();
    } else {
        // else check for present table, remove if present
        var presentTable = document.getElementById('results');
        if (presentTable) {
            presentTable.remove();
        }
        // create table with id='results'
        let table = document.createElement('table');
        table.id = 'results';
        // bootstrap classes
        table.className = 'col-xs-12 col-sm-6 col-md-8';
        // create and append tbody
        let tbody = document.createElement('tbody');
        table.appendChild(tbody);
        // append table to 'content' div in html
        document.getElementById('content').appendChild(table);
        // create column header row
        let colHead = document.createElement('tr');
        let emptyCell = document.createElement('th');
        // empty first header (top left)
        emptyCell.innerHTML = ' ';
        emptyCell.id = 'ommited';
        colHead.appendChild(emptyCell);
        // Iterate from start -> end, appending header with column header to row
        for (let colVal = parseInt(colStart); colVal <= parseInt(colEnd); colVal++) {
            let colCell = document.createElement('th');
            colCell.innerHTML = colVal;
            colHead.appendChild(colCell);
        }
        // add column header row
        tbody.appendChild(colHead);
        // now create table body and row header for every row until i = rowEnd
        for (let i = parseInt(rowStart); i <= parseInt(rowEnd); i++) {
            let rowValue = document.createElement('tr');
            let rowHead = document.createElement('th');
            rowHead.innerHTML = i;
            // append row header
            rowValue.appendChild(rowHead);
            // get multiplication results for every cell in table
            for (let j = parseInt(colStart); j <= parseInt(colEnd); j++) {
                let tableCell = document.createElement('td');
                tableCell.innerHTML = j * i;
                rowValue.appendChild(tableCell);
            }
            // append whole row to tbody
            tbody.appendChild(rowValue);
        }
        // done
        e.preventDefault();
    }
}