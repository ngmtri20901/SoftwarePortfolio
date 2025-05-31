import { NextResponse } from "next/server";
import { notion, DATABASE_IDS, getPlainText, getMultiSelect, getSelect, getUrl, getDate } from "@/lib/notion";
import type { NotionCertification } from "@/lib/notion";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

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

    const certifications: NotionCertification[] = response.results
      .filter((page): page is PageObjectResponse => 'properties' in page)
      .map((page) => {
        const properties = page.properties;
        
        return {
          id: page.id,
          title: getPlainText(
            'title' in properties.Name ? properties.Name.title : []
          ),
          organization: getPlainText(
            'rich_text' in properties.Organization ? properties.Organization.rich_text : []
          ),
          date: getDate(
            'date' in properties.Date ? properties.Date.date : null
          ),
          description: getPlainText(
            'rich_text' in properties.Description ? properties.Description.rich_text : []
          ),
          image: getUrl(
            'url' in properties["Image URL"] ? properties["Image URL"].url : null
          ),
          skills: getMultiSelect(
            'multi_select' in properties.Skills ? properties.Skills.multi_select : []
          ),
          verifyUrl: getUrl(
            'url' in properties["Verify URL"] ? properties["Verify URL"].url : null
          ),
          status: getSelect(
            'select' in properties.Status ? properties.Status.select : null
          ) as "Active" | "Expired" | "In Progress",
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