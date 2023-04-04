import React, { useContext, useState, useEffect } from 'react'
import './Center.css'
import { TreeContext } from '../../Contexts/TreeContext'
import Header from './Header/Header'
import ShortText from './ShortText/ShortText'
import LongText from './LongText/LongText'
import Checkbox from './Checkbox/Checkbox'
import Button from '../Button/Button'

const Center = () => {
    const { selectedNode, setSelectedNode } = useContext(TreeContext);
    const [hasChanges, setHasChanges] = useState(false)

    useEffect(() => {
        setHasChanges(false)
    }, [selectedNode])

    const saveInfo = () => {
        selectedNode.value.name = selectedNode.value.unsavedName
        selectedNode.value.description = selectedNode.value.unsavedDescription
        selectedNode.value.isDone = selectedNode.value.unsavedIsDone

        setSelectedNode({ ...selectedNode })
        setHasChanges(false)
    }

    return (
        <>
            <section className='center'>
                <Header />
                <div className='center__container'>
                    {selectedNode &&
                        <>
                            <div className='center__block'>
                                <h3 className='center__title'>Name</h3>
                                <ShortText setHasChanges={setHasChanges} />

                            </div>
                            <div className='center__block'>
                                <h3 className='center__title'>Description</h3>
                                <LongText setHasChanges={setHasChanges} />
                            </div>
                            <div className='center__block'>
                                <h3 className='center__title'>Mark as done</h3>
                                <Checkbox setHasChanges={setHasChanges} />
                            </div>
                        </>
                    }
                    {selectedNode && <Button buttonText={'Save'} onClickAction={saveInfo} isActive={hasChanges}/>}
                </div>
            </section>

        </>
    )
}
export default Center