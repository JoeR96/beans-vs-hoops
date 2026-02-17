import { NextRequest, NextResponse } from "next/server";

const BASE_API_URL = "https://seanofthe.dev/hoops-vs-beans-api";
const apiKey = process.env.API_KEY;

export async function GET() {
    if (!apiKey) {
        return NextResponse.json({ error: "API key is not configured" }, { status: 401 });
    }

    try {
        const res = await fetch(`${BASE_API_URL}/VoteCount`, {
                headers: {
                        'X-Api-Key': apiKey,
                },
        });

        if (!res.ok) {
            console.error("Failed to fetch vote count:", res.statusText);
            return NextResponse.json({ error: "Failed to fetch vote count" }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("GET error:", error);
        return NextResponse.json({ error: "Error fetching vote count" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    if (!apiKey) {
        return NextResponse.json({ error: "API key is not configured" }, { status: 401 });
    }

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
            return NextResponse.json({ error: "Failed to submit vote" }, { status: res.status });
        }

        const updatedVotes = await res.json();

        return NextResponse.json(updatedVotes);
    } catch (error) {
        console.error("PUT error:", error);
        return NextResponse.json({ error: "Error processing vote" }, { status: 500 });
    }
}
