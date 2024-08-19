"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { commandIcon } from "@/app/utils/Icons";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { useGlobalContext, useGlobalContextUpdate } from "@/app/context/GlobalContext";

function SearchDialog() {
    const { geoList, inputValue, handleInput } = useGlobalContext();
    const { setActiveCityCoords } = useGlobalContextUpdate();
    const [hoveredIndex, setHoveredIndex] = useState<number>(0);
    const [isOpen, setIsOpen] = useState(false);

    const getClickedCoords = (lat: number, lon: number) => {
        // console.log("Setting coordinates:", lat, lon);
        setActiveCityCoords([lat, lon]);
        setIsOpen(false);
    };

    return (
        <div className="search-btn">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button 
                        variant="outline"
                        className="border inline-flex items-center justify-center text-sm font-medium hover:dark:bg-[#131313] hover:bg-slate-100 ease-in-out duration-200"
                        onClick={() => setIsOpen(true)}
                    > 
                        <p className="text-sm text-muted-foreground">Find location</p>
                        <div 
                            className="command dark:bg-[#262626] bg-slate-200 py-[2px] pl-[5px] pr-[7px] rounded-sm ml-[10rem] flex items-center gap-2">
                            {commandIcon}
                            <span className="text-[9px]">F</span>
                        </div>
                    </Button>
                </DialogTrigger>
                <DialogContent className="p-0" aria-describedby="search-dialog-description">
                    <DialogTitle className="sr-only">Search Dialog</DialogTitle>
                    <DialogDescription>
                        Use this dialog to search and select a location from the list.
                    </DialogDescription>
                    <Command className="rounded-lg border shadow-md">
                        <CommandInput
                            value={inputValue}
                            onChangeCapture={handleInput}
                            placeholder="Find location"
                        />
                        <ul className="px-3 pb-2">
                            <p className="p-2 text-sm text-muted-foreground">Suggestions</p>

                            {geoList?.length === 0 ||
                             (!geoList && <p>No results found</p>)}

                            {geoList && 
                                geoList.map(
                                    (
                                        item : { 
                                            name: string;
                                            country: string;
                                            state: string;
                                            lat: number;
                                            lon: number;
                                        },
                                        index: number
                                    ) => { 
                                    const { country, state, name } = item;
                                    return (
                                        <li
                                            key={index}
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            className={`py-3 px-2 text-sm rounded-sm cursor-pointer
                                                ${hoveredIndex === index ? "bg-accent" : ""}
                                            `}
                                            onClick={() => {
                                                getClickedCoords(item.lat, item.lon);
                                            }}
                                        >
                                            <p className="text">
                                                {name}, {state && state + ","} {country}
                                            </p>    
                                        </li>
                                    );
                                })}
                        </ul>
                    </Command>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default SearchDialog;
