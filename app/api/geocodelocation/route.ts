import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const apiKey = process.env.REACT_APP_WEATHER_Key;
        const searchParams = req.nextUrl.searchParams;

        const lat = searchParams.get("lat");
        const lon = searchParams.get("lon");

        const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit={limit}&appid=${apiKey}`;

        if (!lat && lon) {
            return new Response("No geo location founded", { status: 400 });
        }

        const res = await axios.get(url);

        return NextResponse.json(res.data);
    } catch (error) {
        console.log("Error in getting geo data location");
        return new Response("Error in getting geo data location", { status: 500 });
    }
}