import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {

        const apiKey = process.env.OPENWEATHER_API_KEY;
        const lat =  48.1351;
        const lon =  11.5820;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        
        const res = await axios.get(url);
        return NextResponse.json(res.data);
    } catch (error) {
        console.log("Error fetchn forecast data");

        return new Response("Error fetching forecast data", { status: 500 });
    }
}
