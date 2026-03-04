import { ProjectProfile, GeneratedChecklist, ChecklistItem } from "./schema";
import { BADGE_2_ITEMS, BADGE_3_ITEMS, ChecklistItemDefinition } from "./checklistItems";

export function generateChecklist(
    profile: ProjectProfile,
    targetBadges: ("badge2" | "badge3")[]
): GeneratedChecklist {
    const result: GeneratedChecklist = {
        badge2: [],
        badge3: [],
    };

    if (targetBadges.includes("badge2")) {
        result.badge2 = evaluateItems(BADGE_2_ITEMS, profile);
    }

    if (targetBadges.includes("badge3")) {
        result.badge3 = evaluateItems(BADGE_3_ITEMS, profile);
    }

    return result;
}

function evaluateItems(
    items: ChecklistItemDefinition[],
    profile: ProjectProfile
): ChecklistItem[] {
    return items
        .filter((item) => {
            if (item.required) return true;
            if (item.condition) return item.condition(profile);
            return false;
        })
        .map((item) => {
            // Return a clean ChecklistItem without the condition function
            // for safe JSON serialization.
            return {
                id: item.id,
                category: item.category,
                label: item.label,
                description: item.description,
                required: item.required,
            };
        });
}
