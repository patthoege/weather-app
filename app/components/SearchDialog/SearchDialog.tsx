"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { commandIcon } from "@/app/utils/Icons";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { useGlobalContext } from "@/app/context/GlobalContext";

function SearchDialog() {
    const { geoList, inputValue, handlerInput } = useGlobalContext();
    const [ hoveredIndex, setHoveredIndex ] = useState<number>(0);
    return (
        <div className="search-btn">
            <Dialog>
                <DialogTrigger asChild>
                    <Button 
                        variant="outline"
                        className="border inline-flex items-center justify-center text-sm font-medium hover:dark:bg-[#131313] hover:bg-slate-100 ease-in-out duration-200"
                    > 
                        <p className="text-sm text-muted-foreground">Search here...</p>
                        <div 
                            className="command dark:bg-[#262626] bg-slate-200 py-[2px] pl-[5px] pr-[7px] rounded-sm ml-[10rem] flex items-center gap-2">
                            {commandIcon}
                            <span className="text-[9px]">F</span>
                        </div>
                    </Button>
                </DialogTrigger>
                <DialogContent className="p-0" aria-describedby="search-dialog-description">
                <DialogTitle className="sr-only">Search Dialog</DialogTitle>
                    <Command className="rounded-lg border shadow-md">
                        <CommandInput
                            value={inputValue}
                            onChangeCapture={handlerInput}
                            placeholder="Type a command or search..."
                        />
                        <CommandList className="px-3 pb-2">
                            <CommandItem className="p-2 text-sm text-muted-foreground"></CommandItem>
                            {geoList.length === 0  && <CommandItem className="p-2 text-sm text-muted-foreground">No results found.</CommandItem>}

                            {geoList.map((item : { name: string; country: string; state: string }, index: number) => { 
                                const { name, country, state } = item;
                                return (
                                    <CommandItem
                                        key={index}
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        className={`py-3 px-2 text-sm rounded-sm cursor-default
                                            ${hoveredIndex === index ? "bg-accent" : ""}
                                        `}
                                    >
                                        <p className="text">
                                            {name}, {country}, {state}
                                        </p>
                                    </CommandItem>
                                );
                            })}
                        </CommandList>
                    </Command>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default SearchDialog;
