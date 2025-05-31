import { NextResponse } from "next/server";
import { notion, DATABASE_IDS, getPlainText, getMultiSelect, getSelect, getUrl, getDate } from "@/lib/notion";
import type { NotionCertification } from "@/lib/notion";

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_IDS.CERTIFICATIONS,
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    const certifications: NotionCertification[] = response.results.map((page: any) => {
      const properties = page.properties;
      
      return {
        id: page.id,
        title: getPlainText(properties.Name.title),
        organization: getPlainText(properties.Organization.rich_text),
        date: getDate(properties.Date.date),
        description: getPlainText(properties.Description.rich_text),
        image: getUrl(properties["Image URL"].url),
        skills: getMultiSelect(properties.Skills.multi_select),
        verifyUrl: getUrl(properties["Verify URL"].url),
        status: getSelect(properties.Status.select) as "Active" | "Expired" | "In Progress",
      };
    });

    return NextResponse.json(certifications);
  } catch (error) {
    console.error("Error fetching certifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch certifications" },
      { status: 500 }
    );
  }
} 