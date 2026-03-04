export const SCHEMA_VERSION = "2.0";

// --- DYNAMIC WORKFLOW TEMPLATE ---

export interface WorkflowBadge {
    id: string; // e.g. "badge2"
    label: string; // e.g. "Badge 2 — Open Data"
}

export interface WorkflowFeature {
    id: string; // e.g. "usesArtificialLocomotion"
    category: string; // e.g. "Study Design"
    label: string; // e.g. "Does your study use artificial locomotion?"
    description?: string;
    badgeId?: string; // Optional ID of the Badge this belongs to
}

export interface WorkflowChecklistItem {
    id: string; // e.g. "b2-presence"
    badgeId: string; // ID of the Badge this belongs to
    category: string; // Display category string
    label: string;
    description: string;
    required: boolean;
    conditionalOnFeatureId?: string; // ID of the WorkflowFeature that triggers this
}

export interface WorkflowTemplate {
    templateName: string;
    version: string;
    badges: WorkflowBadge[];
    features: WorkflowFeature[];
    checklistItems: WorkflowChecklistItem[];
}

// --- PROJECT INSTANCE SCHEMA ---

export interface ProjectMeta {
    projectTitle: string;
    researcherName: string;
    institution: string;
    targetBadges: string[]; // Array of WorkflowBadge.id
}

export type ProjectProfileValues = Record<string, boolean>; // Maps WorkflowFeature.id -> boolean

export interface ChecklistItem {
    id: string;
    category: string;
    label: string;
    description: string;
    required: boolean;
}

// Maps badgeId (e.g. "badge2") to its active checklist items
export type GeneratedChecklist = Record<string, ChecklistItem[]>;

export type AuditAnswer = "yes" | "partial" | "no" | "na";
export type BadgeAuditStatus = "pass" | "conditional_pass" | "fail" | "pending";

export interface AuditItemResult {
    id: string; // specific ChecklistItem.id
    answer: AuditAnswer;
    notes?: string;
}

export interface AuditResults {
    auditedAt: string;
    badgeStatuses: Record<string, BadgeAuditStatus>; // Maps badgeId -> status
    items: AuditItemResult[];
}

export interface ProjectJson {
    schemaVersion: string;
    generatedAt: string;
    workflowTemplate: WorkflowTemplate; // Embed the rules used to generate this project
    projectMeta: ProjectMeta;
    projectProfile: ProjectProfileValues; // Replaces hardcoded booleans
    generatedChecklist: GeneratedChecklist;
    auditResults?: AuditResults;
}

export function validateProjectJson(data: any): data is ProjectJson {
    if (!data || typeof data !== "object") return false;
    if (data.schemaVersion !== SCHEMA_VERSION) return false;
    if (!data.workflowTemplate) return false;
    return true;
}

export function validateWorkflowTemplate(data: any): data is WorkflowTemplate {
    if (!data || typeof data !== "object") return false;
    if (!data.badges || !Array.isArray(data.badges)) return false;
    if (!data.features || !Array.isArray(data.features)) return false;
    if (!data.checklistItems || !Array.isArray(data.checklistItems)) return false;
    return true;
}
