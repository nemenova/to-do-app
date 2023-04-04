import React, { useContext, useState, useEffect } from 'react'
import './SearchInput.css'
import { TreeContext } from '../../../Contexts/TreeContext'


const SearchInput = ({ setRequest, request }) => {
    const { tree, setSelectedNode } = useContext(TreeContext);
    const [result, setResult] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)

    function handleSearchSubmit(evt) {
        evt.preventDefault();
        const searchResult = tree.MainNode.FindTask(request)
        setResult(searchResult)
        if (searchResult.length < 1) {
            setIsEmpty(true)
        }
    }

    useEffect(() => {
        if (request) {
            const searchResult = tree.MainNode.FindTask(request)
            setResult(searchResult)
        }
    }, [])

    return (
        <>
            <form className="search__form" onSubmit={handleSearchSubmit}>

                <input type="search" name="key" placeholder="Search..." className="search__input" autoComplete="off" value={request} onChange={(e) => setRequest(e.target.value)} />
                <input type="submit" value="Go!" className="search__submit" />

            </form>
            {result.length > 0 &&
                <div className='searchResults'>
                    Search results
                    <div className='searchResults__cleanResults' onClick={() => { setResult([]); setRequest('') }}>+</div>

                    {result.map((task, index) => (
                        <div className='searchResults__container' key={index} >
                            <div className='searchResults__foundTask' onClick={() => setSelectedNode(task)} >{task.value.name}
                                {task.value.isDone && <div className='searchResults__foundStatus'>done ✅</div>}</div>
                        </div>
                    ))}
                </div>
            }
            {isEmpty &&
                <div className='searchResults'>
                    Search results
                    <div className='searchResults__cleanResults' onClick={() => { setRequest(''); setIsEmpty(false) }}>+</div>

                    <div className='searchResults__foundTask' >Sorry, nothing is found</div>
                </div>
            }
        </>
    )
}
export default SearchInput