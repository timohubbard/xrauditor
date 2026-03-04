export const SCHEMA_VERSION = "1.0";

export interface ProjectMeta {
    projectTitle: string;
    researcherName: string;
    institution: string;
    targetBadges: ("badge2" | "badge3")[];
}

export interface ProjectProfile {
    usesArtificialLocomotion: boolean;
    hasVirtualAvatar: boolean;
    hasVirtualHumanoids: boolean;
    hasObjectInteraction: boolean;
    usesEyeTracking: boolean;
    hasMultiStreamSensors: boolean;
    hasSixDofData: boolean;
    usesStandardBatteryInstruments: boolean;
    sessionLongerThan30Min: boolean;
    isMultiSite: boolean;
    isConfirmatory: boolean;
    collectsBiometricData: boolean;
    environmentCodeShareable: boolean;
    participantDataShareable: boolean;
    hasMultipleConditions: boolean;
}

export interface ChecklistItem {
    id: string;
    category: string;
    label: string;
    description: string;
    required: boolean; // true = always required; false = conditional
}

export interface GeneratedChecklist {
    badge2: ChecklistItem[];
    badge3: ChecklistItem[];
}

export type AuditAnswer = "yes" | "partial" | "no" | "na";
export type BadgeAuditStatus = "pass" | "conditional_pass" | "fail" | "pending";

export interface AuditItemResult {
    id: string;
    answer: AuditAnswer;
    notes?: string;
}

export interface AuditResults {
    auditedAt: string;
    badge2Status: BadgeAuditStatus;
    badge3Status: BadgeAuditStatus;
    items: AuditItemResult[];
}

export interface ProjectJson {
    schemaVersion: string;
    generatedAt: string;
    projectMeta: ProjectMeta;
    projectProfile: ProjectProfile;
    generatedChecklist: GeneratedChecklist;
    auditResults?: AuditResults;
}

export function validateProjectJson(data: any): data is ProjectJson {
    if (!data || typeof data !== "object") return false;
    if (data.schemaVersion !== SCHEMA_VERSION) return false;
    if (!data.generatedAt) return false;
    if (!data.projectMeta || typeof data.projectMeta !== "object") return false;
    if (!data.projectProfile || typeof data.projectProfile !== "object") return false;
    if (!data.generatedChecklist || typeof data.generatedChecklist !== "object") return false;
    return true;
}
