document.addEventListener("DOMContentLoaded", function(event) { 
    Id('fileInput').onchange = function() {
        let textFile = Id('fileInput').files[0];
    
        const reader = new FileReader();
        reader.readAsText(textFile);
        reader.onload = processChatFile;
    }
});

processChatFile = function(evt) {
    let text = evt.target.result;
    let lines = text.split(/\r?\n/);

    let lineObjects = [];
    let lineObjectsIndex = 0;

    for (let i = 0; i < lines.length; i++) {
        let currentLine = lines[i];
        debugger

        let date = currentLine.substring(0, 7);

        let moment = moment(date);

        if (moment.isValid()) {
            let time = currentLine.substring(9, 14)
            let sender = currentLine.substring(17).split(": ")[0];
            let message = currentLine.substring(17).split(": ")[1];

            let lineObj = {
                date: date,
                time: time,
                sender: sender,
                message: message
            }
            
            lineObjects.push(lineObj);
            lineObjectsIndex++;
        } else {
            lineObjects[lineObjectsIndex].message += currentLine;
        }
    }

    debugger;
}

Id = function(id) {
    return document.getElementById(id);
}