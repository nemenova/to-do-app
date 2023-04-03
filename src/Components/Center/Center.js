import React, { useContext, useState, useEffect } from 'react'
import './Center.css'
import { TreeContext } from '../../Contexts/TreeContext'
import Header from './Header/Header'
import ShortText from './ShortText/ShortText'
import LongText from './LongText/LongText'
import Checkbox from './Checkbox/Checkbox'
const Center = ({ callModal }) => {

    const { selectedNode, setSelectedNode } = useContext(TreeContext);
    // console.log(selectedNode)
    const [errorMessages, setErrorMessages] = useState([])
    const [hasChanges, setHasChanges] = useState(false)

    useEffect(() => {
        setErrorMessages([])
        setHasChanges(false)
    }, [selectedNode])

    // console.log(hasChanges)
    // console.log(errorMessages)
    console.log(selectedNode)

    const saveInfo = () => {
        setSelectedNode({ ...selectedNode })
        setHasChanges(false)
    }





    return (
        <>
            <section className='center'>
                <Header />
                <div className='center__container'>
                    {/* {selectedNode && selectedNode.value.fields && selectedNode.value.fields.map((field, index) => (
                        <CenterBlock field={field} key={index} callModal={callModal} setHasChanges={setHasChanges} />
                    ))} */}
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
                                <Checkbox setHasChanges={setHasChanges}/>
                            </div>
                        </>
                    }
                    {selectedNode && <div style={{ border: `${hasChanges ? '1px solid #EB455F' : '1px solid #2B3467'}`, color: `${hasChanges ? '#fff' : 'inherit'}`, borderRadius: 10, padding: 10, cursor: `${hasChanges ? 'pointer' : ''}`, width: 'min-content', alignSelf: 'center', backgroundColor: `${hasChanges ? '#EB455F' : 'transparent'}`, userSelect: 'none' }} onClick={() => saveInfo()}>Сохранить</div>}

                </div>
            </section>

        </>
    )
}
export default Center