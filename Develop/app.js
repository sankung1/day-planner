let day = moment().format('MMMM Do YYYY');

const container = $("#calender-container")
$("#currentDay").text(day);

let hourOfTheDay = moment().hour();

let plans = localStorage.getItem("myStoredPlans");
if (!plans) {
    plans = ["", "", "", "", "", "", "", "", ""]
} else {
    plans = JSON.parse(plans);
}

// build calender based on the hours user spend at work
for (let workHour = 9; workHour <= 17; workHour++) {
    let index = workHour - 9;

    let rowDiv = $("<div class= 'row'>");

    // time div
    let timeDiv = $("<div class= 'hour col-sm-2'>");

    // element to contain time
    let timeSpan = $("<span class= 'time-block'>");

    //format hours 
    let currentHour = 0;
    let meridiem = "";
    if (workHour > 12) {
        currentHour = workHour - 12;
        meridiem = "pm";
    } else {
        currentHour = workHour;
        meridiem = "am";
    }

    // add the current hour and meridiem to the span text
    timeSpan.text(`${currentHour} ${meridiem}`);

    // append elemnts
    rowDiv.append(timeDiv);
    timeDiv.append(timeSpan);

    //create planner input text    
    let plannerInput = $("<textarea class = 'description col-sm-9'>").attr("id", `textIndex-${workHour}`);
    plannerInput.attr("type", "text");
    plannerInput.attr("index", index);
    plannerInput.val(plans[index]);

    // append created elemnts to row div
    rowDiv.append(plannerInput);

    // create save button elemnet
    saveButton = $("<button class= 'saveBtn col-sm-1'>").attr("id", `saveId-${workHour}`);
    saveButton.attr("type", "button")

    let saveButtonEl = $("<i>");
    saveButtonEl.attr("class", "far fa-save saveIcon");

    rowDiv.append(saveButton);
    saveButton.append(saveButtonEl);

    // getting time from moment.js to determine the color of the div element
    if (workHour < hourOfTheDay) {
        plannerInput.addClass("past");

    } else if (workHour > hourOfTheDay) {
        plannerInput.addClass("future");
    } else {
        plannerInput.addClass("present");
    }

    container.append(rowDiv);
}
//save added items to the day planner into the local storage
$(".saveBtn").on("click", function (event) {
    event.preventDefault();
    let inputEl = $(this).parent().find("textarea");
    let value = inputEl.val();
    let index = inputEl.attr("index")
    plans[index] = value;
    localStorage.setItem("myStoredPlans", JSON.stringify(plans));
})