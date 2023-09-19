export function extractFiveDayForcast(data) {
    const forecast = data.slice(0, 5);
    return forecast;
}