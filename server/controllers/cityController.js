import City from "../models/cityModel.js";
import fs from "fs";

export const removeAccents = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export async function importCityData() {
    try {
        const jsonData = JSON.parse(fs.readFileSync('./city_data.json'));
        const dataWithoutId = jsonData.map((city) => {
            const { id, name, ...rest } = city;
            rest.name = removeAccents(name)
            return rest;
        })
        await City.insertMany(dataWithoutId);
    } catch (error) {
        console.error('Error importing data:', error);
    }
};