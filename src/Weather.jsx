import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "307581f1b0ee43a7fc1d80e50629b10b";

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await axios.get(url);
      setData(response.data);
      setError("");
    } catch (err) {
      setError("Invalid city or API key error");
      setData(null);
    }
  };

  return (
    <div
    className="min-h-screen flex justify-center items-center"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1501630834273-4b5604d2ee31')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    
    <div className="p-6 max-w-md mx-auto mt-10 bg-purple-200 shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-2 text-center text-purple-800">Weather Report</h1>
      <p className="text-center text-purple-800 mb-4 font-bold">I can give you a weather report about your city</p>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter city..."
          className="bg-purple-200 border p-2 flex-1 rounded border-white"
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={getWeather}
          className="bg-purple-800 text-white px-4 py-2 rounded"
        >
          Get Report
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {data && (
        <div className="mt-4 text-white text-center">
          <h2 className="text-xl font-semibold">{data.name}</h2>
          <p className="text-lg flex justify-center gap-1"><p className="text-black font-bold ">temperature:</p>{data.main.temp}°C</p>
          <p className="flex justify-center gap-1"><p className="text-black font-bold ">Discription:</p> {data.weather[0].description}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default Weather;
