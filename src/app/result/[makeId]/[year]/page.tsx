'use client';
import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

interface VehicleModel {
  Model_ID: number;
  Model_Name: string;
  VehicleId?: string;
}

function ResultContent() {
  const params = useParams();
  const makeId = params.makeId as string;
  const year = params.year as string;

  const [vehicleModels, setVehicleModels] = useState<VehicleModel[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (makeId && year) {
      setIsLoading(true);
      axios
        .get(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
        )
        .then((response) => {
          const uniqueModels = response.data.Results.map((model: VehicleModel, index: number) => ({
            ...model,
            VehicleId: `${model.Model_ID}-${index}-${year}`,
          }));

          setVehicleModels(uniqueModels);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching vehicle models:', error);
          setError('Error fetching vehicle models.');
          setIsLoading(false);
        });
    }
  }, [makeId, year]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 min-h-screen flex items-center justify-center">
        <div className="text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 p-8 text-white"
         style={{ backgroundImage: 'url(\'/background.jpg\')' }}
    >
      <div className="w-full max-w-2xl mx-auto bg-white bg-opacity-20 p-6 rounded-xl shadow-xl backdrop-blur-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Vehicle Models for {makeId} ({year})</h1>
        {vehicleModels.length > 0 ? (
          <ul className="space-y-4">
            {vehicleModels.map((model) => (
              <li
                key={model.VehicleId}
                className="p-4 bg-white bg-opacity-10 rounded-xl border border-white hover:bg-opacity-20 transition-all"
              >
                {model.Model_Name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No models found for this make and year.</p>
        )}
      </div>
    </div>
  );
}

export default function Result() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
}
