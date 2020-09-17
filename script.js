const container = $(".container");
const today = moment().format('MMMM Do YYYY');

let hours = [];

const startHour = 9;
const endHour = 17;

// Populate hours array
const populateHoursArray = ()=>{
    let localStoredHours = JSON.parse(localStorage.getItem("hours"));
    if(localStoredHours){
        if(localStoredHours[today]){
            hours = localStoredHours[today];
            console.log("Hours Array populated with persistent data");
            return;
        }
    }

    forEachHourInDay(hour=>{
        hours.push({"time": formatHour(hour), "event": ""});
    })

    console.log("Hours Array initialized");
}

// TODO: Render List of hours
const renderHoursList = ()=>{
    container.html("");
    let thisHour = moment().hour();

    forEachHourInDay(hour=>{
        let thisRow = $("<div>").addClass("row time-block").attr("id", hour+"hrRow");
        thisRow.append($("<p>").addClass("hour col-1").text(formatHour(hour)));
        thisRow.append($("<textarea>").addClass("col-10"));
        thisRow.append($("<button>").addClass("saveBtn col-1").html('<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg>'));
        
        if(hour<thisHour){
            thisRow.find("textarea").addClass("past");
        }else if(hour>thisHour){
            thisRow.find("textarea").addClass("present");
        }else{
            thisRow.find("textarea").addClass("future");
        }

        container.append(thisRow);

    })
}

// Performs the callback function for each hour of the day
// Accepts a parameter in the callback function which will pass
// the current index of the loop
const forEachHourInDay = (callback)=>{
    for(let hour=startHour; hour<endHour; hour++){
        callback(hour);
    }
}

// Format plain military-time hour as 12-hour text
const formatHour = (hour)=>{
    if(hour>23) throw new Error("Hour out of bounds! Hour given: "+hour);
    return hour>12? (hour-12+"PM") : hour==12? "12PM" : (hour+"AM");
}

// MAIN ========================================
populateHoursArray();
renderHoursList();