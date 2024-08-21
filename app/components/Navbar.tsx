"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { githubIcon } from '../utils/Icons';
import ThemeDropdown from './ThemeDropdown/ThemeDropdown';
import SearchDialog from './SearchDialog/SearchDialog';
import { useGlobalContext } from '../context/GlobalContext';
import { locate, locateFixed } from '@/app/utils/Icons';
import {  Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

function Navbar() {
    const router = useRouter();
    const { state, alertMessage, alertType } = useGlobalContext();
    const { handleLocationRequest, loadingLocation } = useGlobalContext();
    
    return (
      <div className="relative w-full py-4 flex items-center justify-between">
        {alertMessage && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4"> 
                <Alert variant={alertType} className="bg-black/90 text-white m-2 rounded-lg shadow-lg">
                    <AlertTitle className='md:font-bold'>{alertType.charAt(0).toUpperCase() + alertType.slice(1)}:</AlertTitle>
                    <AlertDescription>{alertMessage}</AlertDescription>
                </Alert>
            </div>
        )}
        <div className="left"></div>
            <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
                <SearchDialog />
                <div className="btn-group flex items-center gap-2">
                    <ThemeDropdown />
                    <Button 
                        className="source-code flex items-center gap-2"
                        onClick={() => {router.push("https://www.github.com");}}
                    >
                        {githubIcon} GitHub
                    </Button>
                    <Button 
                        className="source-code flex items-center gap-2"
                        onClick={handleLocationRequest}
                        disabled={loadingLocation}
                    >
                        {loadingLocation ? locateFixed : locate} My Location
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
