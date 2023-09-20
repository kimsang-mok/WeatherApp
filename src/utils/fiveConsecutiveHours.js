export function extractFiveHoursForcast(data) {
    const forecast = data.list.slice(0, 5)
    return forecast;
}