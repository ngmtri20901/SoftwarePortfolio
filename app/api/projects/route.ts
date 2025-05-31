import { NextResponse } from "next/server";
import { notion, DATABASE_IDS, getPlainText, getMultiSelect, getSelect, getUrl, getCheckbox } from "@/lib/notion";
import type { NotionProject } from "@/lib/notion";

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_IDS.PROJECTS,
      sorts: [
        {
          property: "Featured",
          direction: "descending",
        },
      ],
    });

    const projects: NotionProject[] = response.results.map((page: any) => {
      const properties = page.properties;
      
      return {
        id: page.id,
        title: getPlainText(properties.Name.title),
        description: getPlainText(properties.Description.rich_text),
        image: getUrl(properties["Image URL"].url),
        tags: getMultiSelect(properties.Tags.multi_select),
        demoUrl: getUrl(properties["Demo URL"].url),
        githubUrl: getUrl(properties["GitHub URL"].url),
        figmaUrl: getUrl(properties["Figma URL"].url),
        type: getSelect(properties["Project Type"].select) as "uiux" | "business" | "development" | "testing",
        featured: getCheckbox(properties.Featured.checkbox),
      };
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
} 