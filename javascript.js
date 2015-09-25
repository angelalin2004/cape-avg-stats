//var startTime = new Date().getTime();

var allRows = document.querySelectorAll("tbody tr");
console.log(allRows.length);
if (allRows.length != 0)
    main();

function main() {
    var rcmndClass = 0.0;	         // 6th cell, index 5
    var rcmndInstr = 0.0;	         // 7th cell, index 6
    var studyHrs = 0.0;            // 8th cell, index 7
    var avgGradeExp = 0.0;         // 9th cell, index 8
    var avgGradeRec = 0.0;         // 10th cell, index 9

    for ( var i = 0; i < allRows.length; i++) {
        var cells = allRows[i].querySelectorAll("td");
        
        // summation for numeric cells
        rcmndClass += parseFloat(cells[5].textContent.replace(/%/g, '').trim())*10;
        rcmndInstr += parseFloat(cells[6].textContent.replace(/%/g, '').trim())*10;
        studyHrs   += parseFloat(cells[7].textContent.replace(/%/g, '').trim())*10;

        // summation for grade cells
        var avgGradeExpStr = cells[8].textContent.trim();
        console.log(parseFloat(avgGradeExpStr.substring(avgGradeExpStr.indexOf("(")+1,avgGradeExpStr.indexOf(")"))));
        avgGradeExp += parseFloat(avgGradeExpStr.substring(avgGradeExpStr.indexOf("(")+1,avgGradeExpStr.indexOf(")")))*100;
        var avgGradeRecStr = cells[9].textContent.trim();
        avgGradeRec += parseFloat(avgGradeRecStr.substring(avgGradeRecStr.indexOf("(")+1,avgGradeRecStr.indexOf(")")))*100;
    }
    // multiply and divid by 10 or 100 to avoid error when adding floats
    rcmndClass = rcmndClass/10;
    console.log("rcmdClass Total: " + rcmndClass);
    rcmndClass = rcmndClass / (allRows.length);
    console.log("rcmdClass: " + rcmndClass);

    rcmndInstr = rcmndInstr/10;
    console.log("rcmndInstr Total: " + rcmndInstr);
    rcmndInstr = rcmndInstr / (allRows.length);
    console.log("rcmndInstr: " + rcmndInstr);

    studyHrs = studyHrs/10;
    console.log("studyHrs Total: " + studyHrs);
    studyHrs = studyHrs / (allRows.length);
    console.log("studyHrs: " + studyHrs);

    avgGradeExp = avgGradeExp/100;
    console.log("avgGradeExp Total: " + avgGradeExp);
    avgGradeExp = avgGradeExp / (allRows.length);
    console.log("avgGradeExp: " + avgGradeExp);

    avgGradeRec = avgGradeRec/100;
    console.log("avgGradeRec Total: " + avgGradeRec);
    avgGradeRec = avgGradeRec / (allRows.length);
    console.log("avgGradeRec: " + avgGradeRec);
}

// code to test the extension's performance
/*
var endTime = new Date().getTime();
console.log("Tumblr Posts Fix finished in " + (endTime-startTime) + "ms");
*/