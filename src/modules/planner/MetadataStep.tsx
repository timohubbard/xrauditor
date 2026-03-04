"use client";

import { useState } from "react";
import { ProjectMeta, WorkflowTemplate } from "@/data/schema";

interface Props {
    template: WorkflowTemplate;
    initialData: ProjectMeta;
    onNext: (data: ProjectMeta) => void;
}

export default function MetadataStep({ template, initialData, onNext }: Props) {
    const [data, setData] = useState<ProjectMeta>(initialData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (data.targetBadges.length === 0) {
            alert("Please select at least one target badge.");
            return;
        }
        onNext(data);
    };

    const handleCheckbox = (badgeId: string) => {
        setData((prev) => {
            const current = new Set(prev.targetBadges);
            if (current.has(badgeId)) {
                current.delete(badgeId);
            } else {
                current.add(badgeId);
            }
            return { ...prev, targetBadges: Array.from(current) };
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl font-semibold text-brand-navy">Project Information</h2>

            <div>
                <label htmlFor="projectTitle" className="block text-sm font-medium text-gray-700">Project Title</label>
                <input
                    type="text"
                    id="projectTitle"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm px-4 py-2 border"
                    value={data.projectTitle}
                    onChange={(e) => setData({ ...data, projectTitle: e.target.value })}
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
                    onChange={(e) => setData({ ...data, researcherName: e.target.value })}
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
                    onChange={(e) => setData({ ...data, institution: e.target.value })}
                />
            </div>

            <div>
                <span className="block text-sm font-medium text-gray-700 mb-2">Target Badges</span>
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

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-navy hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy"
                >
                    Next Step
                </button>
            </div>
        </form>
    );
}
