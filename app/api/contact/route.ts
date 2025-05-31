import { NextRequest, NextResponse } from "next/server";
import { notion, DATABASE_IDS } from "@/lib/notion";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullname, email, phone, subject, bestTimeToContact, heardAbout, message } = body;

    // Create new entry in Notion database
    const response = await notion.pages.create({
      parent: {
        database_id: DATABASE_IDS.CONTACT_SUBMISSIONS,
      },
      properties: {
        "Full Name": {
          title: [
            {
              text: {
                content: fullname,
              },
            },
          ],
        },
        "Email": {
          email: email,
        },
        "Phone": {
          phone_number: phone || null,
        },
        "Subject": {
          select: {
            name: subject,
          },
        },
        "Best Time to Contact": {
          select: {
            name: bestTimeToContact,
          },
        },
        "How They Heard About You": {
          select: {
            name: heardAbout,
          },
        },
        "Message": {
          rich_text: [
            {
              text: {
                content: message,
              },
            },
          ],
        },
        "Status": {
          select: {
            name: "New",
          },
        },
      },
    });

    return NextResponse.json({ 
      success: true, 
      id: response.id,
      message: "Contact form submitted successfully" 
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_IDS.CONTACT_SUBMISSIONS,
      sorts: [
        {
          property: "Submitted Date",
          direction: "descending",
        },
      ],
    });

    return NextResponse.json(response.results);
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact submissions" },
      { status: 500 }
    );
  }
} 