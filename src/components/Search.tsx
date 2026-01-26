import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';

interface SearchProps {
    onSearch: (city: string) => void;
    isLoading: boolean;
}

function Search({ onSearch, isLoading }: SearchProps) {
    const [inputValue, setInputValue] = useState('');

    const handleSearch = () => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue) {
            onSearch(trimmedValue);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="SearchEngine">
            <input
                type="text"
                placeholder="enter city name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
            />
            <button
                onClick={handleSearch}
                disabled={isLoading || !inputValue.trim()}
            >
                {isLoading ? (
                    <span className="loading-spinner"></span>
                ) : (
                    <SearchIcon size={20} />
                )}
            </button>
        </div>
    );
}

export default Search;
