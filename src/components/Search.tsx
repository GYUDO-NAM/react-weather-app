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
        <div className="search-container">
            <div className="search-input-wrapper">
                <input
                    type="text"
                    className="search-input"
                    placeholder="도시 이름을 입력하세요 (예: Seoul, Tokyo)"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                />
                <button
                    className="search-button"
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
        </div>
    );
}

export default Search;
