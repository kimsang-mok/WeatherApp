export function unixTimestampToHour(unixTimestamp, timezoneOffset) {
    const timestampInSeconds = unixTimestamp + timezoneOffset;
    const hours = Math.floor(timestampInSeconds / 3600);

    // determine whether it's AM or PM
    const period = hours % 24 < 12 ? 'am' : 'pm';

    // convert 24-hour time to 12-hour time
    const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
    const timeString = `${formattedHour} ${period}`;

    return timeString;
}