import { WorkflowTemplate, ProjectProfileValues, GeneratedChecklist, ChecklistItem } from "./schema";

export function generateChecklist(
    template: WorkflowTemplate,
    profileValues: ProjectProfileValues,
    targetBadges: string[]
): GeneratedChecklist {
    const result: GeneratedChecklist = {};

    // Initialize empty arrays for targeted badges
    targetBadges.forEach((badgeId) => {
        result[badgeId] = [];
    });

    // Evaluate each checklist item in the template
    template.checklistItems.forEach((item) => {
        // Enforce specific pull-up assignment rule for HSE items
        let finalBadgeId = item.badgeId;
        if (item.originalBadgeId && targetBadges.includes(item.originalBadgeId)) {
            finalBadgeId = item.originalBadgeId;
        }

        // Skip if the user didn't target the badge this item belongs to
        if (!targetBadges.includes(finalBadgeId)) {
            return;
        }

        // Determine if the item is required based on its conditional link
        let isIncluded = item.required;

        if (!isIncluded && item.conditionalOnFeatureId) {
            // If the feature flag is true in the user's profile context, include it
            if (profileValues[item.conditionalOnFeatureId] === true) {
                isIncluded = true;
            }
        }

        if (isIncluded) {
            // Create a clean ChecklistItem without the workflow mapping engine metadata
            const cleanItem: ChecklistItem = {
                id: item.id,
                category: item.category,
                label: item.label,
                description: item.description,
                required: item.required,
            };

            result[finalBadgeId].push(cleanItem);
        }
    });

    return result;
}
