import { NextResponse } from "next/server";
import { notion, DATABASE_IDS, getPlainText, getMultiSelect, getSelect, getUrl, getCheckbox } from "@/lib/notion";
import type { NotionProject } from "@/lib/notion";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

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

    const projects: NotionProject[] = response.results
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
          image: getUrl(
            'url' in properties["Image URL"] ? properties["Image URL"].url : null
          ),
          tags: getMultiSelect(
            'multi_select' in properties.Tags ? properties.Tags.multi_select : []
          ),
          demoUrl: getUrl(
            'url' in properties["Demo URL"] ? properties["Demo URL"].url : null
          ),
          githubUrl: getUrl(
            'url' in properties["GitHub URL"] ? properties["GitHub URL"].url : null
          ),
          figmaUrl: getUrl(
            'url' in properties["Figma URL"] ? properties["Figma URL"].url : null
          ),
          type: getSelect(
            'select' in properties["Project Type"] ? properties["Project Type"].select : null
          ) as "uiux" | "business" | "development" | "testing",
          featured: getCheckbox(
            'checkbox' in properties.Featured ? properties.Featured.checkbox : false
          ),
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