import React, { useState, useEffect, useRef } from 'react';
import { searchCities } from '../utils/citySearch';
import { Search } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../styles/SearchCities.scss';
import debounce from 'lodash/debounce';

function SearchCities({ getCoordinate }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const debouncedSearchCitiesRef = useRef(null)

    useEffect(() => {
        debouncedSearchCitiesRef.current = debounce(async (term) => {
            try {
                setIsLoading(true);
                const foundCities = await searchCities(term);
                const formattedResults = await foundCities?.slice(0, 10).map(city => ({
                    title: city.name,
                    description: city.country_name,
                    lon: city.coord.lon,
                    lat: city.coord.lat,
                    key: city._id
                }));
                setResults(formattedResults);
                setIsLoading(false);
            } catch (error) {
                console.error("Error searching cities:", error);
            }
        }, 500);

    }, []);

    // add debounce to prevent the function from being called too many times 
    useEffect(() => {
        if (searchTerm) {
            /* cancel any previous debounce action (so that a slower but later request doesn't overtake a newer but faster request) */
            if (debouncedSearchCitiesRef.current) {
                debouncedSearchCitiesRef.current.cancel();
            }
            // call the new debounced action with the updated searchTerm
            debouncedSearchCitiesRef.current(searchTerm);
        }
    }, [searchTerm]);

    const handleResultSelect = (e, { result }) => {
        const { lat, lon } = result;
        getCoordinate(lat, lon);
        setSearchTerm("");
    };

    const handleSearchChange = (e, { value }) => {
        setSearchTerm(value);
    };

    return (
        <div className="search-container">
            <Search
                loading={isLoading}
                onResultSelect={handleResultSelect}
                onSearchChange={handleSearchChange}
                results={results}
                value={searchTerm}
                placeholder="Search city..."
            />
        </div>
    );
}

export default SearchCities;