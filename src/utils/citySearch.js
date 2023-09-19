import cities from "../data/city_data.json";

function removeDiacritics(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

export function searchCities(query) {
    const normalizedQuery = removeDiacritics(query).toLowerCase();
    return cities.filter(city => {
        const normizedCityName = removeDiacritics(city.name).toLowerCase();
        return normizedCityName.includes(normalizedQuery);
    });
}