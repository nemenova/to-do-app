import React, { useState, useEffect, useContext } from 'react'
import './LeftColumn.css'
import LeftColumnHeader from './LeftColumnHeader'
import LeftColumnList from './LeftColumnList'
import SearchInput from './SearchInput/SearchInput'
import { TreeContext } from '../../Contexts/TreeContext'
import Button from '../Button/Button'
const LeftColumn = ({ setRequest, request}) => {

    const [isMenuOpened, setIsMenuOpened] = useState(false)
    const [fakeValue, setFakeValue] = useState(0);

    const { tree, setTree, selectedNode } = useContext(TreeContext);

    const closeMenu = () => {
        if (isMenuOpened) {
            setIsMenuOpened(false)
        }
    }

    useEffect(() => {
        setFakeValue(fakeValue + 1)
    }, [selectedNode])

    const addTask = () => {
        console.log('calling add task record')
        tree.MainNode.AddChild('task')
        setTree({ ...tree })
    }
    return (
        <>
            <div className='LeftColumn__container' onClick={closeMenu}>
                <LeftColumnHeader tree={tree} />
                <div className='LeftColumn__content'>
                    <LeftColumnList
                        currentTreeList={tree.MainNode}

                        buttonId={tree.MainNode.id}
                        path={`${1}`} />
                    <Button onClickAction={addTask} buttonText={'Add Task'} />
                    <SearchInput setRequest={setRequest} request={request}/>
                </div>
            </div>

        </>
    )
}
export default LeftColumn