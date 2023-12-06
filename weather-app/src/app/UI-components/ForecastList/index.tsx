import React, { useRef, useState } from "react"
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useAppSelector } from "../../hooks";
import classNames from "classnames";
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb"
import {  FaTemperatureLow } from "react-icons/fa"
import { daysOfWeek } from "../../pages/FavoritePage";
import Loader from "../Loader";



const ForecastList = (props: { forecasts: Array<any>,isLoading:boolean }) => {
  const [isOnFahrenheit, setIsOnFahrenheit] = useState<boolean>(false)
  const [maxTemp, setMaxTemp] = useState<number>(0)
  const [minTemp, setMinTemp] = useState<number>(0)

  const [fiveDayForecast, setFiveDayForecast] = useState(
    (props.forecasts as any)?.DailyForecasts,
  )
  const theme = localStorage.getItem("theme")
  const theme2 = useAppSelector((state) => state.theme.theme) ||theme

  const forecastRef = useRef<any>(null);

  function convertFahrenheitToCelsius(fahrenheit:number) {
    const celsius = (fahrenheit - 32) * 5/9;
    return parseFloat(celsius as any).toFixed(1);

  }

  const handleTemperatureIndicatorSelect = (f:any) => {
    setIsOnFahrenheit(!isOnFahrenheit)
   
    const minTemp = convertFahrenheitToCelsius(Number(f.Temperature.Minimum.Value))
    const maxTemp = convertFahrenheitToCelsius(Number(f.Temperature.Maximum.Value))
    setMinTemp(Number(minTemp))
    setMaxTemp(Number(maxTemp))

    
  }
 

  return (
    <div className="p-4 py-4 mb-20">
      {props.isLoading && <Loader />}

    <h2 className="text-2xl mt-2 font-semibold mb-4">Daily Forecasts</h2>
    <div className="flex gap-6  overflow-x-auto py-2">
      {fiveDayForecast.map((forecast: any, index: number) => (
        <div
          key={index}
          className={classNames({
            "flex-none w-[20rem]  shadow bg-none rounded-lg font-bold m-2 p-4 transition-transform transform": true,
            "opacity-70 bg-white": theme === "light",
            "bg-gray-500 opacity-90": theme === "dark",
          })}
        >
          <div className="flex max-h-[2rem]  justify-between items-center">
            <h3 className="font-semibold">
              {daysOfWeek[new Date(forecast.Date).getDay()]}
            </h3>
            {isOnFahrenheit ? (
              <button
                onClick={() => handleTemperatureIndicatorSelect(forecast)}
                className={classNames({
                  "text-2xl rounded-full mt-1 duration-300 ease-in p-2 min-h-[2rem] transition-colors":true,
                  "  hover:text-gray-800 text-white hover:bg-gray-300":theme === "dark",
                  "  hover:text-gray-200 text-black hover:bg-gray-800":theme === "light",
              })}
              >
                <TbTemperatureCelsius className="mt-1 cursor-pointer" />
              </button>
            ) : (
              <button
                onClick={() => handleTemperatureIndicatorSelect(forecast)}
                className={classNames({
                  "text-2xl rounded-full mt-1 duration-300 ease-in p-2 min-h-[2rem] transition-colors":true,
                  "  hover:text-gray-800 text-white hover:bg-gray-300":theme === "dark",
                  "  hover:text-gray-200 text-black hover:bg-gray-800":theme === "light",
              })}
              >
                <TbTemperatureFahrenheit className="mt-1 cursor-pointer" />
              </button>
            )}
          </div>
          <br />
          <p>
            <strong>Day:</strong> {forecast.Day.IconPhrase}
            <br />
            <strong>Night:</strong> {forecast.Night.IconPhrase}
          </p>
          <span className="text-lg my-2 mt-2">
            {!isOnFahrenheit ? (
                <p>
                  <strong>Max Temp:</strong> {forecast.Temperature.Maximum.Value}°F
                <br />
                  <strong>Min Temp:</strong> {forecast.Temperature.Minimum.Value}°F
                </p>
            ) : (
              <span className="text-lg my-2 mt-2">
                <strong>Max Temp:</strong> {maxTemp}°C
                <br />
                <strong>Min Temp:</strong> {minTemp}°C
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  </div>

  )
}

export default ForecastList
