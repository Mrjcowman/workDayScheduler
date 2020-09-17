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
    return hour>12? (hour-12+"PM") : (hour+"AM");
}

// MAIN ========================================
populateHoursArray();
// renderHoursList();