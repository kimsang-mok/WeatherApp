export function extractFiveHoursForcast(data) {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const numberOfHours = 5;
    let forecast = [];
    let startIndex = -1;

    for (let i = 0; i < data.list.length; i++) {
        const entry = data.list[i];
        const dt = entry.dt;
        const entryDate = new Date(dt * 1000);

        if (entryDate.getHours() === currentHour + 1) {
            startIndex = i;
            break;
        }
    }
    forecast = data.list.slice(startIndex, startIndex + numberOfHours);
    return forecast;
}