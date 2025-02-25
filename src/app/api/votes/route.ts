import { NextRequest, NextResponse } from "next/server";

const BASE_API_URL = "https://seanofthe.dev/hoops-vs-beans-api";
const apiKey = process.env.API_KEY as string;
export async function GET() {
    
    try {
        const res = await fetch(`${BASE_API_URL}/VoteCount`, {
                headers: {
                        'X-Api-Key': apiKey,
                },
        });
        
        if (!res.ok) {
            console.error("Failed to fetch vote count:", res.statusText);
            throw new Error("Failed to fetch vote count");
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("GET error:", error);
        return NextResponse.json({ error: "Error fetching vote count" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();

        const option = body.voteOption?.toLowerCase();
        
        if (option !== "hoops" && option !== "beans") {
            console.error("Invalid vote option received:", option);
            return NextResponse.json({ error: "Invalid vote option" }, { status: 400 });
        }

        const res = await fetch(`${BASE_API_URL}/Vote/${option}`, {
            method: "PUT",
            headers: {
                'accept': '*/*',
                'X-Api-Key': apiKey
            },
        });

        if (!res.ok) {
            console.error("External API returned error:", res.statusText);
            throw new Error("Failed to submit vote");
        }

        const updatedVotes = await res.json();

        return NextResponse.json(updatedVotes);
    } catch (error) {
        console.error("PUT error:", error);
        return NextResponse.json({ error: "Error processing vote" }, { status: 500 });
    }
}
