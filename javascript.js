//var startTime = new Date().getTime();

var rcmndClass = 0.0;            // 6th cell, index 5
var rcmndInstr = 0.0;            // 7th cell, index 6
var studyHrs = 0.0;            // 8th cell, index 7
var avgGradeExp = 0.0;         // 9th cell, index 8
var avgGradeRec = 0.0;         // 10th cell, index 9

var allRows = document.querySelectorAll("tbody tr");
console.log(allRows.length);
if (allRows.length != 0)
    main();

function main() {
    getAvgs();
    displayAvgs();
}

function getAvgs() {
    for ( var i = 0; i < allRows.length; i++) {
        var cells = allRows[i].querySelectorAll("td");
        
        // summation for numeric cells
        rcmndClass += parseFloat(cells[5].textContent.replace(/%/g, '').trim())*10;
        rcmndInstr += parseFloat(cells[6].textContent.replace(/%/g, '').trim())*10;
        studyHrs   += parseFloat(cells[7].textContent.replace(/%/g, '').trim())*10;

        // summation for grade cells
        var avgGradeExpStr = cells[8].textContent.trim();
        //console.log(parseFloat(avgGradeExpStr.substring(avgGradeExpStr.indexOf("(")+1,avgGradeExpStr.indexOf(")"))));
        avgGradeExp += parseFloat(avgGradeExpStr.substring(
            avgGradeExpStr.indexOf("(")+1,avgGradeExpStr.indexOf(")")))*100;
        var avgGradeRecStr = cells[9].textContent.trim();
        avgGradeRec += parseFloat(avgGradeRecStr.substring(
            avgGradeRecStr.indexOf("(")+1,avgGradeRecStr.indexOf(")")))*100;
    }
    // multiply and divid by 10 or 100 to avoid error when adding floats
    rcmndClass = rcmndClass/10;
    console.log("Total rcmdClass: " + rcmndClass);
    rcmndClass = rcmndClass / (allRows.length);
    console.log("rcmdClass: " + rcmndClass);

    rcmndInstr = rcmndInstr/10;
    console.log("Total rcmndInstr: " + rcmndInstr);
    rcmndInstr = rcmndInstr / (allRows.length);
    console.log("rcmndInstr: " + rcmndInstr);

    studyHrs = studyHrs/10;
    console.log("Total studyHrs: " + studyHrs);
    studyHrs = studyHrs / (allRows.length);
    console.log("studyHrs: " + studyHrs);

    avgGradeExp = avgGradeExp/100;
    console.log("Total avgGradeExp: " + avgGradeExp);
    avgGradeExp = avgGradeExp / (allRows.length);
    var avgLetterGradeExp = getLetterGrade(avgGradeExp);
    console.log("avgGradeExp: " + avgLetterGradeExp + " (" + avgGradeExp + ")");

    avgGradeRec = avgGradeRec/100;
    console.log("Total avgGradeRec: " + avgGradeRec);
    avgGradeRec = avgGradeRec / (allRows.length);
    var avgLetterGradeRec = getLetterGrade(avgGradeRec);
    console.log("avgGradeRec: " + avgLetterGradeRec + " (" + avgGradeRec + ")");
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
    avgRow.id = "avgRow";
    if (document.querySelectorAll("tbody").item(0).childElementCount % 2 != 0)   // odd rows
        avgRow.className = "even";
    else                                    // even rows
        avgRow.className = "odd";
    var newTbody = document.createElement("tbody");
    document.querySelectorAll("table").item(0).appendChild(newTbody);
    newTbody.appendChild(avgRow);

}

// code to test the extension's performance
/*
var endTime = new Date().getTime();
console.log("Cape Avg Stats finished in " + (endTime-startTime) + "ms");
*/