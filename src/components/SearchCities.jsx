import React, { useState, useEffect } from 'react';
import { searchCities } from '../utils/citySearch';
import { Search } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../styles/searchCities.scss';
import debounce from 'lodash/debounce';

function SearchCities({ getCoordinate }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (searchTerm) {
            debouncedSearchCities(searchTerm);
        } else {
            setResults([]);
        }
    }, [searchTerm]);
    
    // add debounce to prevent the function from being called too many times 
    const debouncedSearchCities = debounce((term) => {
        setIsLoading(true);
        const foundCities = searchCities(term);
        const formattedResults = foundCities.slice(0, 10).map(city => ({
            title: city.name,
            description: city.country_name,
            lon: city.coord.lon,
            lat: city.coord.lat,
            key: city.id
        }));
        setResults(formattedResults);
        setIsLoading(false);
    }, 500);

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