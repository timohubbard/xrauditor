import { ProjectJson } from "../data/schema";
import { slugify } from "./slugify";

export function exportJsonAsBlob(data: ProjectJson): void {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const dateStr = new Date(data.generatedAt).toISOString().split("T")[0];
    const filename = `VR_Badge_Project_${slugify(
        data.projectMeta.projectTitle
    )}_${data.workflowTemplate?.version}_${dateStr}.json`;

    triggerDownload(url, filename);
}

export function exportReportAsText(data: ProjectJson): void {
    if (!data.auditResults || !data.workflowTemplate) return;

    const results = data.auditResults;
    const lines: string[] = [];

    lines.push(`=======================================================`);
    lines.push(` Open Science Badge - Audit Report`);
    lines.push(`=======================================================`);
    lines.push(``);
    lines.push(`Project Title: ${data.projectMeta.projectTitle}`);
    lines.push(`Researcher: ${data.projectMeta.researcherName}`);
    lines.push(`Institution: ${data.projectMeta.institution}`);
    lines.push(`Audit Date: ${new Date(results.auditedAt).toLocaleString()}`);
    lines.push(`Tool Version: ${data.workflowTemplate.version}`);
    lines.push(``);
    lines.push(`--- SUMMARY ---`);

    data.workflowTemplate.badges.forEach((badge) => {
        if (data.projectMeta.targetBadges.includes(badge.id)) {
            const status = results.badgeStatuses[badge.id] || "PENDING";
            lines.push(`${badge.label} Status: ${status.toUpperCase()}`);
        }
    });

    lines.push(``);
    lines.push(`--- DETAILED AUDIT ---`);

    // Flatten checklist items for lookup
    const flatChecklist = data.workflowTemplate.badges.flatMap(b => data.generatedChecklist[b.id] || []);

    results.items.forEach(auditItem => {
        // Find item context
        const reqItem = flatChecklist.find(i => i.id === auditItem.id);

        if (reqItem) {
            lines.push(`Requirement: ${reqItem.label} (${reqItem.category})`);
            lines.push(`Status: ${auditItem.answer.toUpperCase()}`);
            if (auditItem.notes) {
                lines.push(`Notes: ${auditItem.notes}`);
            }
            lines.push(``);
        }
    });

    const textString = lines.join("\n");
    const blob = new Blob([textString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const dateStr = new Date(results.auditedAt).toISOString().split("T")[0];
    const filename = `VR_Badge_AuditReport_${slugify(
        data.projectMeta.projectTitle
    )}_${dateStr}.txt`;

    triggerDownload(url, filename);
}

function triggerDownload(url: string, filename: string) {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
