"use client";

import { GeneratedChecklist, ProjectJson, WorkflowTemplate } from "@/data/schema";
import { useEffect, useRef } from "react";

interface Props {
    template: WorkflowTemplate;
    checklist: GeneratedChecklist;
    projectJson: ProjectJson;
}

export default function ChecklistView({ template, checklist, projectJson }: Props) {
    const getCategoryColor = (category: string) => {
        if (category === "Always Required" || category === "Core Requirements") return "bg-brand-navy text-white";
        if (category.includes("Locomotion")) return "bg-brand-amber text-white";
        if (category.includes("Avatar") || category.includes("Humanoids")) return "bg-purple-700 text-white";
        if (category.includes("Eye-Tracking")) return "bg-brand-teal text-white";
        if (category.includes("Standard")) return "bg-emerald-600 text-white";
        return "bg-gray-200 text-gray-800";
    };

    if (projectJson.projectMeta.targetBadges.length === 0) {
        return (
            <div className="bg-white shadow sm:rounded-lg border border-gray-200 p-8 text-center text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No Badges Selected</h3>
                <p>Select at least one workflow badge on the left to begin generating your custom requirements list.</p>
            </div>
        );
    }

    return (
        <div className="bg-white shadow sm:rounded-lg border border-gray-200 sticky top-6">
            <div className="px-4 py-5 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-brand-navy shrink-1">Live Checklist Preview</h2>
                        <p className="text-sm text-gray-500 mt-1">Updates automatically as you configure your project.</p>
                    </div>
                </div>

                <div className="space-y-8 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2">
                    {template.badges.map(badge => {
                        if (!projectJson.projectMeta.targetBadges.includes(badge.id)) {
                            return null;
                        }

                        const items = checklist[badge.id] || [];

                        return (
                            <section key={badge.id}>
                                <h3 className="text-xl font-bold text-brand-teal mb-4 border-b border-brand-teal pb-2">
                                    {badge.label} Requirements
                                </h3>
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <div key={item.id} className="p-4 border border-brand-blue/20 rounded-lg bg-blue-50/30 flex items-start transition-all duration-300">
                                            <div className="flex-shrink-0 mt-1 mr-4">
                                                <input type="checkbox" disabled className="h-5 w-5 text-gray-400 rounded border-gray-300 cursor-not-allowed opacity-50" />
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-3 mb-2 flex-wrap gap-y-2">
                                                    <span className="font-bold text-gray-900">{item.label}</span>
                                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(item.category)}`}>
                                                        {item.category}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {items.length === 0 && (
                                        <p className="text-gray-500 italic px-4">No checklist items generated.</p>
                                    )}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
