import City from "../models/cityModel.js";
import { removeAccents } from "./cityController.js";

export const searchByName = async (req, res) => {
    const searchTerm = req.query.q;
    try {
        const results = await City.find({
            "name": {
                $regex: removeAccents(searchTerm),
                $options: 'i'
            }
        });

        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};
