import { NextResponse } from "next/server";
import { notion, DATABASE_IDS, getPlainText, getMultiSelect, getSelect } from "@/lib/notion";
import type { NotionTool } from "@/lib/notion";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_IDS.TOOLS,
      sorts: [
        {
          property: "Category",
          direction: "ascending",
        },
      ],
    });

    const tools: NotionTool[] = response.results
      .filter((page): page is PageObjectResponse => 'properties' in page)
      .map((page) => {
        const properties = page.properties;
        
        return {
          id: page.id,
          title: getPlainText(
            'title' in properties.Name ? properties.Name.title : []
          ),
          description: getPlainText(
            'rich_text' in properties.Description ? properties.Description.rich_text : []
          ),
          category: getSelect(
            'select' in properties.Category ? properties.Category.select : null
          ) as "Frontend" | "Backend" | "Database" | "DevOps" | "Design" | "Languages",
          items: getMultiSelect(
            'multi_select' in properties.Items ? properties.Items.multi_select : []
          ),
          icon: getPlainText(
            'rich_text' in properties.Icon ? properties.Icon.rich_text : []
          ),
          proficiency: getSelect(
            'select' in properties.Proficiency ? properties.Proficiency.select : null
          ) as "Beginner" | "Intermediate" | "Advanced" | "Expert",
        };
      });

    return NextResponse.json(tools);
  } catch (error) {
    console.error("Error fetching tools:", error);
    return NextResponse.json(
      { error: "Failed to fetch tools" },
      { status: 500 }
    );
  }
} 