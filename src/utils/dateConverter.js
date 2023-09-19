function formatDayOfWeek(date) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();

    if (date.getDate() === today.getDate()) {
        return 'Today';
    } else {
        return daysOfWeek[date.getDay()];
    }
}

export function formatAllDaysOfWeek(forecastData) {
    return forecastData.map((forecastItem) => {
        const timestamp = forecastItem.dt;
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
        return formatDayOfWeek(date);
    });
}