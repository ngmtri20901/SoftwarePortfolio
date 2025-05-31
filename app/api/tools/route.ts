import { NextResponse } from "next/server";
import { notion, DATABASE_IDS, getPlainText, getMultiSelect, getSelect } from "@/lib/notion";
import type { NotionTool } from "@/lib/notion";

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

    const tools: NotionTool[] = response.results.map((page: any) => {
      const properties = page.properties;
      
      return {
        id: page.id,
        title: getPlainText(properties.Name.title),
        description: getPlainText(properties.Description.rich_text),
        category: getSelect(properties.Category.select) as "Frontend" | "Backend" | "Database" | "DevOps" | "Design" | "Languages",
        items: getMultiSelect(properties.Items.multi_select),
        icon: getPlainText(properties.Icon.rich_text),
        proficiency: getSelect(properties.Proficiency.select) as "Beginner" | "Intermediate" | "Advanced" | "Expert",
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