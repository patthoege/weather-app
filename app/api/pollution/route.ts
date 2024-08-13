import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const apiKey = process.env.REACT_APP_WEATHER_Key;
       
        const searchParams = req.nextUrl.searchParams;
        const lat = searchParams.get("lat");
        const lon = searchParams.get("lon");

        const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        const res = await axios.get(url);
        return NextResponse.json(res.data);
    } catch (error) {
        console.log("Error in getting pollution data", error);
        return new Response("Error in getting pollution data", { status: 500 });
    }
}