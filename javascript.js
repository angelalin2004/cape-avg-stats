//var startTime = new Date().getTime();

var rcmndClass = 0.0;            // 6th cell, index 5
var rcmndInstr = 0.0;            // 7th cell, index 6
var studyHrs = 0.0;            // 8th cell, index 7
var avgGradeExp = 0.0;         // 9th cell, index 8
var avgGradeRec = 0.0;         // 10th cell, index 9

var justAdded = false;
var skippedRow = 0;
var avgGradeExpRows = 0;
var avgGradeRecRows = 0;

var allRows = document.querySelectorAll("tbody tr");
if (allRows.length != 0)
    main();
/*
$(document).bind("DOMSubtreeModified", function() {
    if (!justAdded) {
        allRows = document.querySelectorAll("tbody tr");
        if (allRows.length != 0)
            main();
    }
    else {
        justAdded = false;
    }
});
*/

function main() {
    getAvgs(3);  // 1 to add all possible, 2 to set N/A to expected grade, 3 to ignore the row
    displayAvgs();
    justAdded = true;
}

function getAvgs(method) {
    for ( var i = 0; i < allRows.length; i++) {
        var cells = allRows[i].querySelectorAll("td");
        
        // skip this row if it was for a summer session
        if ((cells[2].textContent.trim().charAt(0) == 'S') &&
            !(cells[2].textContent.trim().substring(0,2) == "SP")) {
            //console.log("Skipped row " + i + ": " + cells[2].textContent.trim());
            skippedRow++;
            continue;
        }

        // summation for numeric cells
        rcmndClass += parseFloat(cells[5].textContent.replace(/%/g, '').trim())*10;
        rcmndInstr += parseFloat(cells[6].textContent.replace(/%/g, '').trim())*10;
        studyHrs   += parseFloat(cells[7].textContent.replace(/%/g, '').trim())*10;

        // summation for grade cells
        var avgGradeExpStr = cells[8].textContent.trim();
        if (avgGradeExpStr.indexOf("(") != -1) {
            avgGradeExp += parseFloat(avgGradeExpStr.substring(
                avgGradeExpStr.indexOf("(")+1,avgGradeExpStr.indexOf(")")))*100;
            avgGradeExpRows++;
        }
        var avgGradeRecStr = cells[9].textContent.trim();
        if (method == 1) {
            if (avgGradeRecStr.indexOf("(") != -1) {
                avgGradeRec += parseFloat(avgGradeRecStr.substring(
                    avgGradeRecStr.indexOf("(")+1,avgGradeRecStr.indexOf(")")))*100;
                avgGradeRecRows++;
            }
        }
        else if (method == 2) {
            if (avgGradeRecStr.indexOf("(") == -1)
                avgGradeRec += parseFloat(avgGradeExpStr.substring(
                    avgGradeExpStr.indexOf("(")+1,avgGradeExpStr.indexOf(")")))*100;
            else
                avgGradeRec += parseFloat(avgGradeRecStr.substring(
                    avgGradeRecStr.indexOf("(")+1,avgGradeRecStr.indexOf(")")))*100;
            avgGradeRecRows++;
        }
        else if (method == 3) {
            if (avgGradeRecStr.indexOf("(") == -1) {
                avgGradeExp -= parseFloat(avgGradeExpStr.substring(
                    avgGradeExpStr.indexOf("(")+1,avgGradeExpStr.indexOf(")")))*100;
                avgGradeExpRows--;
            }
            else {
                avgGradeRec += parseFloat(avgGradeRecStr.substring(
                    avgGradeRecStr.indexOf("(")+1,avgGradeRecStr.indexOf(")")))*100;
                avgGradeRecRows++;
            }
        }
    }
    // multiply and divid by 10 or 100 to avoid error when adding floats
    rcmndClass = rcmndClass/10;
    console.log("Total rcmdClass: " + rcmndClass);
    rcmndClass = rcmndClass / (allRows.length - skippedRow);
    console.log("rcmdClass: " + rcmndClass);

    rcmndInstr = rcmndInstr/10;
    console.log("Total rcmndInstr: " + rcmndInstr);
    rcmndInstr = rcmndInstr / (allRows.length - skippedRow);
    console.log("rcmndInstr: " + rcmndInstr);

    studyHrs = studyHrs/10;
    console.log("Total studyHrs: " + studyHrs);
    studyHrs = studyHrs / (allRows.length - skippedRow);
    console.log("studyHrs: " + studyHrs);

    avgGradeExp = avgGradeExp/100;
    console.log("Total avgGradeExp: " + avgGradeExp);
    avgGradeExp = avgGradeExp / (avgGradeExpRows);
    var avgLetterGradeExp = getLetterGrade(avgGradeExp);
    console.log("avgGradeExp: " + avgLetterGradeExp + " (" + avgGradeExp + ")");

    avgGradeRec = avgGradeRec/100;
    console.log("Total avgGradeRec: " + avgGradeRec);
    avgGradeRec = avgGradeRec / (avgGradeRecRows);
    var avgLetterGradeRec = getLetterGrade(avgGradeRec);
    console.log("avgGradeRec: " + avgLetterGradeRec + " (" + avgGradeRec + ")");

    /* rounding and stylistic additions */
    // round to 1 decimal place and add % sign
    rcmndClass = Math.round(rcmndClass * 10) / 10;
    rcmndClass = rcmndClass + " %";
    rcmndInstr = Math.round(rcmndInstr * 10) / 10;
    rcmndInstr = rcmndInstr + " %";
    // round to 2 decimal places
    studyHrs = Math.round(studyHrs * 100) / 100;
    // round to 2 decimal places and add letter grade
    avgGradeExp = Math.round(avgGradeExp * 100) / 100;
    avgGradeExp = avgLetterGradeExp + " (" + avgGradeExp + ")";
    avgGradeRec = Math.round(avgGradeRec * 100) / 100;
    avgGradeRec = avgLetterGradeRec + " (" + avgGradeRec + ")";
}

function getLetterGrade (x) {
    // numbers from:
    // http://blink.ucsd.edu/instructors/academic-info/grades/system.html
    if (x <= 1.0)
        return "F";
    else if ((1.0 < x) && (x <= 1.7))
        return "D";
    else if ((1.7 < x) && (x <= 2.0))
        return "C-";
    else if ((2.0 < x) && (x <= 2.3))
        return "C";
    else if ((2.3 < x) && (x <= 2.7))
        return "C+";
    else if ((2.7 < x) && (x <= 3.0))
        return "B-";
    else if ((3.0 < x) && (x <= 3.3))
        return "B";
    else if ((3.3 < x) && (x <= 3.7))
        return "B+";
    else if ((3.7 < x) && (x < 4.0))
        return "A-";
    else if ((4.0 < x) && (x <= 4.0))
        return "A";
    else
        return;
}

function displayAvgs() {
    var avgRow = document.createElement("tr");
    var tbody = document.querySelectorAll("tbody").item(0);
    if (tbody.childElementCount % 2 != 0)   // odd rows
        avgRow.className = "even";
    else                                    // even rows
        avgRow.className = "odd";
    avgRow.id = "avgRow";
    tbody.appendChild(avgRow);
    avgRow.innerHTML = "<tr class='odd'><td>Column<br>Average</td><td></td>" + 
        "<td></td><td align='right'></td><td align='right'></td>" +
        "<td align='right'>" + rcmndClass + "</td><td align='right'>" + 
        rcmndInstr + "</td><td align='right'>" + studyHrs + 
        "</td><td align='right'>" + avgGradeExp + "</td><td align='right'>" + 
        avgGradeRec + "</td></tr>";
}

// code to test the extension's performance
/*
var endTime = new Date().getTime();
console.log("Cape Avg Stats finished in " + (endTime-startTime) + "ms");
*/