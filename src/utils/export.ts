import { ProjectJson } from "../data/schema";
import { slugify } from "./slugify";

export function exportJsonAsBlob(data: ProjectJson): void {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const dateStr = new Date(data.generatedAt).toISOString().split("T")[0];
    const filename = `VR_Badge_Project_${slugify(
        data.projectMeta.projectTitle
    )}_${dateStr}.json`;

    triggerDownload(url, filename);
}

export function exportReportAsText(data: ProjectJson): void {
    if (!data.auditResults) return;

    const results = data.auditResults;
    const lines: string[] = [];

    lines.push(`=======================================================`);
    lines.push(` VR/XR Open Science Badge - Audit Report`);
    lines.push(`=======================================================`);
    lines.push(``);
    lines.push(`Project Title: ${data.projectMeta.projectTitle}`);
    lines.push(`Researcher: ${data.projectMeta.researcherName}`);
    lines.push(`Institution: ${data.projectMeta.institution}`);
    lines.push(`Audit Date: ${new Date(results.auditedAt).toLocaleString()}`);
    lines.push(``);
    lines.push(`--- SUMMARY ---`);

    if (data.projectMeta.targetBadges.includes("badge2")) {
        lines.push(`Badge 2 (Open Data) Status: ${results.badge2Status.toUpperCase()}`);
    }
    if (data.projectMeta.targetBadges.includes("badge3")) {
        lines.push(`Badge 3 (Open Analysis Code) Status: ${results.badge3Status.toUpperCase()}`);
    }
    lines.push(``);
    lines.push(`--- DETAILED AUDIT ---`);

    results.items.forEach(auditItem => {
        // Find item context
        const reqItem =
            data.generatedChecklist.badge2.find(i => i.id === auditItem.id) ||
            data.generatedChecklist.badge3.find(i => i.id === auditItem.id);

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
