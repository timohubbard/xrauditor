import { WorkflowTemplate } from "@/data/schema";

export function exportWorkflowJsonAsBlob(template: WorkflowTemplate): void {
    const jsonString = JSON.stringify(template, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Clean string matching slug logic
    const safeName = template.templateName.replace(/[^a-z0-9]+/gi, '-').replace(/(^-|-$)/g, '').toLowerCase() || "custom-workflow";
    const filename = `${safeName}-template.json`;

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
