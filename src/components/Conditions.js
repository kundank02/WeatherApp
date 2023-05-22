import React from 'react'

function Conditions(props) {
    return (
        <div className=" extra-data text-center justify-center flex mt-[100px] gap-8">
            <div className="humidity">
                <h3 className="extra-data-title text-xl font-thin opacity-50">Humidity</h3>
                <p className='text-3xl'>{props.humidity}%</p>
            </div>
            <div className="wind-speed">
                <h3 className="extra-data-title text-xl font-thin opacity-50">Wind Speed</h3>
                <p className='text-3xl'>{props.windSpeed} Km/h</p>
            </div>
            
        </div>
    )
}

export default Conditions;