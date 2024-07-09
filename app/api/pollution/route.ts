import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const lat = 51.5074;
        const lon =  -0.1278;

        const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        const res = await axios.get(url);
        return NextResponse.json(res.data);
    } catch (error) {
        console.log("Error in getting pollution data", error);
        return new Response("Error in getting pollution data", { status: 500 });
    }
}