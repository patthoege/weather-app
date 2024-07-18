import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const searchParams = req.nextUrl.searchParams;

        const city = searchParams.get("search");

        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

        if (!city) {
            return new Response("No city provided", { status: 400 });
        }

        const res = await axios.get(url);

        return NextResponse.json(res.data);
    } catch (error) {
        console.log("Error in getting geo data");
        return new Response("Error in getting geo data", { status: 500 });
    }
}