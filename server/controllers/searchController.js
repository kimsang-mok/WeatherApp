import City from "../models/cityModel.js";
import { removeAccents } from "../utils/removeDiacritic.js";

export const searchByName = async (req, res) => {
    const searchTerm = removeAccents(req.query.q);
    try {
        const results = await City.aggregate([
            {
                $match: {
                    "name": {
                        $regex: new RegExp(searchTerm, 'i')
                    }
                }
            },
        ]);

        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};
