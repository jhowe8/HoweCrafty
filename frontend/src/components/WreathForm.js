import './WreathForm.css'
import React, { useEffect, useState } from "react"
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { colourOptions, seasonOptions, holidayOptions } from './WreathFormOptions'
import axios from 'axios'

function WreathForm() {
    const [enteredMinSize, setEnteredMinSize] = useState(14)
    const minSizeChangeHandler = (event) => setEnteredMinSize(event.target.value)

    const [enteredMaxSize, setEnteredMaxSize] = useState(20)
    const maxSizeChangeHandler = (event) => setEnteredMaxSize(event.target.value)

    const [enteredMinPrice, setEnteredMinPrice] = useState(15)
    const minPriceChangeHandler = (event) => setEnteredMinPrice(event.target.value)

    const [enteredMaxPrice, setEnteredMaxPrice] = useState(45)
    const maxPriceChangeHandler = (event) => setEnteredMaxPrice(event.target.value)

    const [enteredColors, setEnteredcolors] = useState([])
    const colorChangeHandler = (selectedColors) => {
        setEnteredcolors(selectedColors)
    };

    const [enteredSeasons, setEnteredSeasons] = useState([])
    const seasonChangeHandler = (selectedSeasons) => {
        setEnteredSeasons(selectedSeasons)
    };

    const [enteredHolidays, setEnteredHolidays] = useState([])
    const holidayChangeHandler = (selectedHolidays) => {
        setEnteredHolidays(selectedHolidays)
    };

    const [wreaths, setWreaths] = useState([])

    const animatedComponents = makeAnimated()

    const submitHandler = (event) => {
        event.preventDefault()
        const colorValues = []
        for (let color_index in enteredColors) {
            colorValues.push(enteredColors[color_index].value)
        }

        const seasonValues = []
        for (let season_index in enteredSeasons) {
            seasonValues.push(enteredSeasons[season_index].value)
        }

        const holidayValues = []
        for (let holiday_index in enteredHolidays) {
            holidayValues.push(enteredHolidays[holiday_index].value)
        }

        const searchCriteria = {
            "minPrice": Number(enteredMinPrice),
            "maxPrice": Number(enteredMaxPrice),
            "minSize": Number(enteredMinSize),
            "maxSize": Number(enteredMaxSize),
            "colors": colorValues,
            "timesOfTheYear": seasonValues.concat(holidayValues)
        }

        console.log(searchCriteria)
        axios.post('http://localhost:3001/api/filterWreaths/', searchCriteria)
            .then(res => {
                const wreaths = res.data
                setWreaths(wreaths)
                console.log(wreaths)
            })
        

    }

    return (
        <div>
        <form onSubmit={submitHandler} action=''>
            <div className='new-wreath__controls'>
                <div className='new-wreath__control'>
                    <label htmlFor=''>Enter min size</label>
                    <input default={enteredMinSize} type='number' min='14' max={enteredMaxSize} step='1' onChange={minSizeChangeHandler} />
                </div>
                <div className='new-wreath__control'>
                    <label htmlFor=''>Enter max size</label>
                    <input default={enteredMaxSize} type='number' min={enteredMinSize} max='24' step='1' onChange={maxSizeChangeHandler} />
                </div>
                <div className='new-wreath__control'>
                    <label htmlFor=''>Enter min price</label>
                    <input default={enteredMinPrice} type='number' min='15' max={enteredMaxPrice} step='1' onChange={minPriceChangeHandler} />
                </div>
                <div className='new-wreath__control'>
                    <label htmlFor=''>Enter max price</label>
                    <input default={enteredMaxPrice} type='number' min={enteredMinPrice} max='45' step='1' onChange={maxPriceChangeHandler} />
                </div>
                <div><h4>Select Color(s)</h4></div>
                <Select className='multi_option_select'
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    value={enteredColors}
                    onChange={colorChangeHandler}
                    options={colourOptions}
                />
                <div><h4>Select Season(s)</h4></div>
                <Select className='multi_option_select'
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    value={enteredSeasons}
                    onChange={seasonChangeHandler}
                    options={seasonOptions}
                />
                <div><h4>Select Holiday(s)</h4></div>
                <Select className='multi_option_select'
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    value={enteredHolidays}
                    onChange={holidayChangeHandler}
                    options={holidayOptions}
                />
            </div>
            <div className='new-wreath__actions'>
                <button type='submit'>Search Wreaths</button>
            </div>
        </form>
        <div>
        {
            wreaths
            .map(wreath =>
                <div>
                {wreath.title}
                <img src={wreath.pictureurl[0]} alt={wreath.title} width="150" height="200"/>
                </div>
            )
        }
        </div>
        </div>
    )
}

export default WreathForm;