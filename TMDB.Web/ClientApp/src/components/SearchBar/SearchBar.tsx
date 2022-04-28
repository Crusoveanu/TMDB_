import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';
import { ERoutes } from '../../entities/enums';
import { Search } from '@material-ui/icons';

function SearchBar({ placeholder, data }: { placeholder: any, data: any }) {

    const [filteredData, setFilteredData] = useState([]);
    const [searchInput, setsearchInput] = useState('');
    const navigate = useNavigate();

    const handleFilter = (event: any) => {
        const searchWord = event.target.value;
        setsearchInput(searchWord);
        const newFilter = data.filter((value: any) => {
            return value.original_title.toLowerCase().includes(searchWord.toLowerCase());
        });
        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    }

    async function getSearchResult(searchedWord: any) {
        navigate(`${ERoutes.SEARCHMOVIES}/${searchedWord}`)
    }

    const handleKeyPress = (event: any) => {
        //not allow search with # and $
        let result = event.target.value.replace(/#/g, "");
        result = result.replace(/&/g, "");
        if (event.keyCode == 13 && result) {

            getSearchResult(result);
        }
    }

    const handleClick = (event: any) => {
        //not allow search with # and $
        let result = searchInput.replace(/#/g, "");
        result = result.replace(/&/g, "");
        if (result)
            getSearchResult(result);
    }
    const base_url = "https://www.themoviedb.org/t/p/w220_and_h330_face/";
    return (
        <div className="search">
            <div className="searchInput">
                <input type="text" placeholder={placeholder} onChange={handleFilter} onKeyDown={handleKeyPress} />
                <Search className="SearchButton" onClick={handleClick}></Search>
            </div>
            {filteredData.length != 0 && (
                <div className="dataResult">
                    {filteredData.slice(0, 15).map((value: any, key: any) => {
                        return (
                            <a
                                key={value.id}
                                className="dataItem"
                                onClick={() => navigate(`${ERoutes.MOVIEDETAILS}`, { state: { movieId: value.id } })}>
                                <img style={{ width: 40, height: 70, marginLeft: 15 }} src={base_url + value.poster_path} />
                                <p>{value.original_title}</p>
                            </a>
                        )
                    })}
                </div>
            )
            }
        </div>
    );
}

export default SearchBar;