import { saveAs } from "file-saver";
import { ProjectJson } from "@/data/schema";
import { slugify } from "./slugify";

export const exportMarkdownTemplate = (data: ProjectJson) => {
    if (!data.workflowTemplate) return;

    let mdContent = `# ${data.projectMeta.projectTitle || "Project"} - Documentation Template\n\n`;
    mdContent += `**Researcher:** ${data.projectMeta.researcherName}\n`;
    mdContent += `**Institution:** ${data.projectMeta.institution}\n`;
    mdContent += `**Generated At:** ${new Date(data.generatedAt).toLocaleString()}\n\n`;
    mdContent += `---\n\n`;

    mdContent += `*This document is a generated template based on your specific VR/XR project profile. Fill in the requested details below to complete your documentation for open science repositories.*\n\n`;

    // Loop through targeted badges
    data.workflowTemplate.badges.forEach((badge) => {
        if (!data.projectMeta.targetBadges.includes(badge.id)) return;

        const items = data.generatedChecklist[badge.id] || [];
        if (items.length === 0) return;

        mdContent += `## ${badge.label} Requirements\n\n`;

        items.forEach((item) => {
            mdContent += `### ${item.label}\n`;
            mdContent += `*Requirement: ${item.description}*\n\n`;
            
            // Add fill-in-the-blank placeholder based on the requirement type
            mdContent += `> **[Please provide details or documentation for: ${item.label}]**\n\n`;
            mdContent += `<br/>\n\n`;
        });
        
        mdContent += `---\n\n`;
    });

    const blob = new Blob([mdContent], { type: "text/markdown;charset=utf-8" });
    const filename = `${slugify(data.projectMeta.projectTitle || "project")}_template.md`;
    saveAs(blob, filename);
};
