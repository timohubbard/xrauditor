import { Document, Packer, Paragraph, TextRun, HeadingLevel, convertInchesToTwip } from "docx";
import { saveAs } from "file-saver";
import { ProjectJson } from "@/data/schema";
import { slugify } from "./slugify";

export const exportChecklistToWord = async (data: ProjectJson) => {
    if (!data.workflowTemplate) return;

    // Build paragraphs array
    const docChildren: any[] = [];

    // Title
    docChildren.push(
        new Paragraph({
            text: "Project Requirements Checklist",
            heading: HeadingLevel.TITLE,
            spacing: { after: 200 }
        })
    );

    // Metadata
    docChildren.push(
        new Paragraph({
            children: [
                new TextRun({ text: "Project Title: ", bold: true }),
                new TextRun(data.projectMeta.projectTitle),
            ]
        }),
        new Paragraph({
            children: [
                new TextRun({ text: "Researcher: ", bold: true }),
                new TextRun(data.projectMeta.researcherName),
            ]
        }),
        new Paragraph({
            children: [
                new TextRun({ text: "Institution: ", bold: true }),
                new TextRun(data.projectMeta.institution),
            ]
        }),
        new Paragraph({
            children: [
                new TextRun({ text: "Generated At: ", bold: true }),
                new TextRun(new Date(data.generatedAt).toLocaleString()),
            ],
            spacing: { after: 400 }
        })
    );

    // Loop through targeted badges
    data.workflowTemplate.badges.forEach((badge) => {
        if (!data.projectMeta.targetBadges.includes(badge.id)) return;

        const items = data.generatedChecklist[badge.id] || [];
        if (items.length === 0) return;

        docChildren.push(
            new Paragraph({
                text: `${badge.label} Requirements`,
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
            })
        );

        items.forEach((item) => {
            docChildren.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: `[ ] ${item.label}`, bold: true }),
                        new TextRun({ text: ` (${item.category} • ${item.required ? "Required" : "Conditional"})`, color: "666666", size: 20 }),
                    ],
                    spacing: { before: 200, after: 100 }
                })
            );

            docChildren.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: item.description, italics: true, color: "333333" }),
                    ],
                    indent: { left: convertInchesToTwip(0.25) },
                    spacing: { after: 100 }
                })
            );
        });
    });

    const doc = new Document({
        sections: [
            {
                properties: {},
                children: docChildren,
            },
        ],
    });

    const blob = await Packer.toBlob(doc);
    const filename = `${slugify(data.projectMeta.projectTitle || "project")}_checklist.docx`;
    saveAs(blob, filename);
};
