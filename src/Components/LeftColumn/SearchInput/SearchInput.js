import React from 'react'
import './SearchInput.css'

const SearchInput = ({ }) => {
    function handleSearchSubmit(evt) {
        evt.preventDefault();

    }
    return (
        <>
            <form className="search__form" onSubmit={handleSearchSubmit}>

                    <input type="search" name="key" placeholder="Поиск..." className="search__input" autoComplete="off" required />
                    {/* <input type="submit" value=" " className="search__submit" /> */}

            </form>


        </>
    )
}
export default SearchInput