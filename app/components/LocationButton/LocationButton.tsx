'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/app/context/GlobalContext";
import { locate, locateFixed } from '@/app/utils/Icons';


const LocationButton: React.FC = () => {
    const { handleLocationRequest, loadingLocation } = useGlobalContext();

    return (
        <div className="flex items-center gap-2">
        <Button 
            className="source-code flex items-center gap-2"
            onClick={handleLocationRequest}
            disabled={loadingLocation}
        >
          {loadingLocation ? locateFixed : locate}
           My Location
        </Button>
        {loadingLocation && (
            <span className="text-sm text-gray-600">Searching my location...</span>
        )}
    </div>
    );
};

export default LocationButton;
