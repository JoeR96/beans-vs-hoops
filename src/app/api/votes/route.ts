import { NextRequest, NextResponse } from "next/server";

const BASE_API_URL = "https://seanofthe.dev/hoops-vs-beans-api";

export async function GET() {
  try {
    console.log(`Fetching vote counts from ${BASE_API_URL}/VoteCount`);

    const res = await fetch(`${BASE_API_URL}/VoteCount`);
    
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
    console.log("Received PUT request with body:", body);

    const option = body.voteOption?.toLowerCase();
    
    if (option !== "hoops" && option !== "beans") {
      console.error("Invalid vote option received:", option);
      return NextResponse.json({ error: "Invalid vote option" }, { status: 400 });
    }

    console.log(`Sending PUT request to API: ${BASE_API_URL}/Vote/${option}`);

    const res = await fetch(`${BASE_API_URL}/Vote/${option}`, {
      method: "PUT",
      headers: { "accept": "*/*" },
    });

    if (!res.ok) {
      console.error("External API returned error:", res.statusText);
      throw new Error("Failed to submit vote");
    }

    const updatedVotes = await res.json();
    console.log("Updated votes received:", updatedVotes);

    return NextResponse.json(updatedVotes);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: "Error processing vote" }, { status: 500 });
  }
}
