export const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const months = ['january', 'february', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    return {year, month, day, text: `${year}, ${month}, ${day}`};
}

export const formatTime = (date: Date) => {
    const hour = date.getHours();
    const minute = date.getMinutes();
    return {hour, minute, text: `${hour < 10 ? "0" : ""}${hour}:${minute < 10 ? "0" : ""}${minute}`};
}