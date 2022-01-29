import './WreathForm.css'
import React, { useEffect, useState } from "react"
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import axios from 'axios'

function WreathForm() {
    const [enteredSize, setEnteredSize] = useState(15)
    const [enteredColor, setEnteredcolor] = useState([])
    const [enteredSeason, setEnteredseason] = useState('Season')
    const [enteredPrice, setEnteredprice] = useState('Price')


    // USE THE FOLLOWING TO LOAD COLORS AND SEASON DROPDOWNS
    // useEffect(() => {
    //     fetch("/wreaths/").then(res => {
    //         if (res.ok) {
    //             return res.json()
    //         }
    //     }).then(jsonRes => setWreaths(jsonRes.wreathsList))
    // })

    const colourOptions = [
        { value:'red', label: 'Red' }, 
        { value:'green', label: 'Green' }, 
        { value:'blue', label: 'Blue' }, 
    ]

    const animatedComponents = makeAnimated()

    const sizeChangeHandler = (event) => {
        setEnteredSize(event.target.value)
    }

    const colorChangeHandler = (event) => {
        setEnteredcolor(event.target.value)
    }

    const seasonChangeHandler = (event) => {
        setEnteredseason(event.target.value)
    }

    const priceChangeHandler = (event) => {
        setEnteredprice(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        console.log(input)
    }

    return (
        <form onSubmit={submitHandler} action=''>
            <div className='new-wreath__controls'>
                <div className='new-wreath__control'>
                    <label htmlFor=''>{enteredSize}</label> 
                    <input default='18' type='number' min='14' step='1' onChange={sizeChangeHandler} /> 
                </div>
                {/* <div className='new-wreath__control'>
                    <label htmlFor=''>{enteredColor}</label> 
                    <input type='text' onChange={colorChangeHandler} /> 
                </div> */}
                <Select className='colour_select'
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={colourOptions}
                />
                <div className='new-wreath__control'>
                    <label htmlFor=''>{enteredSeason}</label> 
                    <input type='text' onChange={seasonChangeHandler} /> 
                </div>
                <div className='new-wreath__control'>
                    <label htmlFor=''>{enteredPrice}</label> 
                    <input type='text' onChange={priceChangeHandler} /> 
                </div>
            </div>
            <div className='new-wreath__actions'>
                <button type='submit'>Add Wreath</button>
            </div>
        </form>
    )
}

export default WreathForm;