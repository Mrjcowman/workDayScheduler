const container = $(".container");
const today = moment().format('MMMM Do YYYY');

const checkMarkSVG = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg>';

let hours = {};

const startHour = 9;
const endHour = 18;

// Populate hours array
const populateHoursArray = ()=>{
    hours = JSON.parse(localStorage.getItem(today));
    if(hours){
        console.log("Hours Array populated with persistent data");
        return;
    }

    hours = {};
    
    forEachHourInDay(hour=>{
        hours[formatHour(hour)] = "";
    })    
    
    console.log("Hours Array initialized");
}    

// Render the textfields in the list
const renderHoursList = ()=>{
    console.log("Rendering!");
    let thisHour = moment().hour();
    forEachHourInDay(hour=>{
        let thisField = $("."+formatHour(hour)+" textArea");
        thisField.val(hours[formatHour(hour)]);

        thisField.removeClass("past present future");
        if(hour<thisHour){
            thisField.addClass("past");
        }else if(hour>thisHour){
            thisField.addClass("future");            
        }else{
            thisField.addClass("present");            
        }
    })
}

// Push the hours info to the local storage
const updateLocalStorage = ()=>{
    console.log("Saving!");

    localStorage.setItem(today, JSON.stringify(hours));

}

// Handle clicks on elements
const handleInputBlur = event=>{
    let thisInput = $(event.target);
    let newTarget = $(event.relatedTarget);

    if(newTarget[0] == thisInput.parent().find("button")[0]) return;

    renderHoursList();
}    

const handleSaveClick = event=>{
    let thisButton = $(event.target);
    let thisHour = thisButton.parent().attr("data-hour");
    let inputData = thisButton.parent().find("textarea").val();

    hours[formatHour(thisHour)] = inputData;
    updateLocalStorage();
    renderHoursList();    
}    

// Generate List of hours
const generateHoursList = ()=>{
    container.html("");
    let thisHour = moment().hour();

    forEachHourInDay(hour=>{
        let thisRow = $("<div>").addClass("row time-block "+formatHour(hour)).attr("data-hour", hour);
        thisRow.append($("<p>").addClass("hour col-1").text(formatHour(hour)));
        thisRow.append($("<textarea>").addClass("col-10"));

        thisRow.append($("<button>").addClass("saveBtn col-1").html(checkMarkSVG)); 

        container.append(thisRow);

        thisRow.find("textarea").on("blur", event=>{
            handleInputBlur(event);
        })

        thisRow.find("button").on("click", event=>{
            event.preventDefault();
            handleSaveClick(event);
        })
    })

    renderHoursList();
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
generateHoursList();