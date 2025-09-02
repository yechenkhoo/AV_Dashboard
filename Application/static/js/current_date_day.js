// Function to set current date and day
function setCurrentDateAndDay() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Get current date
    const now = new Date();
    const day = days[now.getDay()]; // Get the day of the week
    const date = now.getDate(); // Get the date
    const month = months[now.getMonth()]; // Get the month

    // Format the date and day
    const formattedDate = `${day} ${date} ${month}`;

    const titleElement = document.getElementById('current_day_date');
    if (titleElement) {
        titleElement.innerHTML = formattedDate;
    }
}

setCurrentDateAndDay();
