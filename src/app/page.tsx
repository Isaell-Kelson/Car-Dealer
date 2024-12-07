'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface VehicleMake {
  MakeId: number;
  MakeName: string;
}

export default function Home() {
  const [vehicleMakes, setVehicleMakes] = useState<VehicleMake[]>([]);
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')
      .then((response) => {
        setVehicleMakes(response.data.Results);
      })
      .catch((error) => console.error('Error fetching vehicle makes:', error));
  }, []);

  useEffect(() => {
    setIsButtonEnabled(!!selectedMake && !!selectedYear);
  }, [selectedMake, selectedYear]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => (2015 + i).toString());

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className="w-full max-w-md p-6 bg-white bg-opacity-10 rounded-lg shadow-lg backdrop-blur-lg">
        <h1 className="text-4xl font-extrabold text-center mb-8">Find Your Vehicle</h1>
        <div className="space-y-6">

          {/* Dropdown for Vehicle Makes */}
          <div>
            <label className="block text-sm font-medium mb-2">Select Vehicle Make</label>
            <select
              className="w-full p-3 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-400"
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
            >
              <option value="">Choose Make</option>
              {vehicleMakes.map((make) => (
                <option key={make.MakeId} value={make.MakeId}>
                  {make.MakeName}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown for Model Year */}
          <div>
            <label className="block text-sm font-medium mb-2">Select Model Year</label>
            <select
              className="w-full p-3 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-400"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">Choose Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Next Button */}
        <Link href={`/result/${selectedMake}/${selectedYear}`}>
          <button
            disabled={!isButtonEnabled}
            className={`w-full mt-8 p-3 rounded-lg text-lg font-bold transition-all ${
              isButtonEnabled
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}
