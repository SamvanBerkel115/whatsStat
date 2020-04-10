document.addEventListener("DOMContentLoaded", function(event) { 
    Id('fileInput').onchange = function() {
        let textFile = Id('fileInput').files[0];
    
        const reader = new FileReader();
        reader.readAsText(textFile);
        reader.onload = processChatFile;
    }
});

processChatFile = function(evt) {
    let startTime = Date.now();

    let text = evt.target.result;
    let lines = text.split(/\r?\n/);

    let lineObjects = [];
    let lineObjectsIndex = -1;

    let usersMap = new Map();

    for (let i = 0; i < lines.length; i++) {
        let currentLine = lines[i];

        let dateSplit = currentLine.split(", ");
        let dateString = dateSplit[0];
        let dateMoment = moment(dateString);

        if (dateMoment.isValid() && dateSplit[1]) {
            console.log(dateSplit[0]);
            let timeSplit = dateSplit[1].split(' - ');
            let sender = timeSplit[1].split(": ")[0];

            if (!timeSplit[1].split(": ")[1]) {
                continue;
            }

            let lineObj = {
                date: dateMoment,
                time: timeSplit[0],
                sender: sender,
                message: timeSplit[1].split(": ")[1]
            }
            
            if (usersMap.has(sender)) {
                let messageList = usersMap.get(sender);
                messageList.push(lineObj)
                usersMap.set(sender, messageList);
            } else {
                usersMap.set(sender, [lineObj])
            }
            lineObjects.push(lineObj);

            lineObjectsIndex++;
        } else {
            lineObjects[lineObjectsIndex].message += ` ${currentLine}`;
        }
    }

    let endTime = Date.now();
    console.log(`Time taken: ${(endTime - startTime) / 1000} seconds.`)

    debugger;
}

Id = function(id) {
    return document.getElementById(id);
}