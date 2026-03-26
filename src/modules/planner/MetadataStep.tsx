"use client";

import { ProjectMeta, WorkflowTemplate } from "@/data/schema";

interface Props {
    template: WorkflowTemplate;
    data: ProjectMeta;
    onChange: (data: ProjectMeta) => void;
}

export default function MetadataStep({ template, data, onChange }: Props) {
    const handleCheckbox = (badgeId: string) => {
        const current = new Set(data.targetBadges);
        if (current.has(badgeId)) {
            current.delete(badgeId);
        } else {
            current.add(badgeId);
        }
        onChange({ ...data, targetBadges: Array.from(current) });
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-brand-navy border-b pb-2">1. Project Information</h2>

            <div>
                <label htmlFor="projectTitle" className="block text-sm font-medium text-gray-700">Project Title</label>
                <input
                    type="text"
                    id="projectTitle"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm px-4 py-2 border"
                    value={data.projectTitle}
                    onChange={(e) => onChange({ ...data, projectTitle: e.target.value })}
                />
            </div>

            <div>
                <label htmlFor="researcherName" className="block text-sm font-medium text-gray-700">Researcher Name(s)</label>
                <input
                    type="text"
                    id="researcherName"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm px-4 py-2 border"
                    value={data.researcherName}
                    onChange={(e) => onChange({ ...data, researcherName: e.target.value })}
                />
            </div>

            <div>
                <label htmlFor="institution" className="block text-sm font-medium text-gray-700">Institution</label>
                <input
                    type="text"
                    id="institution"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm px-4 py-2 border"
                    value={data.institution}
                    onChange={(e) => onChange({ ...data, institution: e.target.value })}
                />
            </div>

            <div>
                <span className="block text-sm font-medium text-gray-700 mb-2">Target Workflow Framework Badges</span>
                <div className="space-y-2">
                    {template.badges.map(badge => (
                        <label key={badge.id} className="flex items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                            <input
                                type="checkbox"
                                className="h-4 w-4 text-brand-teal border-gray-300 rounded focus:ring-brand-teal"
                                checked={data.targetBadges.includes(badge.id)}
                                onChange={() => handleCheckbox(badge.id)}
                            />
                            <span className="ml-3 font-medium text-gray-900">{badge.label}</span>
                        </label>
                    ))}
                    {template.badges.length === 0 && (
                        <p className="text-sm text-gray-500 italic px-2">This workflow template does not define any badges.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
