"use client";

import { GeneratedChecklist, ProjectJson } from "@/data/schema";
import { exportJsonAsBlob } from "@/utils/export";

interface Props {
    checklist: GeneratedChecklist;
    projectJson: ProjectJson;
    onBack: () => void;
}

export default function ChecklistView({ checklist, projectJson, onBack }: Props) {
    const handleDownload = () => {
        exportJsonAsBlob(projectJson);
        alert("Project saved. Load this file in the Audit module when your project is complete.");
    };

    const getCategoryColor = (category: string) => {
        if (category === "Always Required") return "bg-brand-navy text-white";
        if (category.includes("Locomotion")) return "bg-brand-amber text-white";
        if (category.includes("Avatar") || category.includes("Humanoids")) return "bg-purple-700 text-white";
        if (category.includes("Eye-Tracking")) return "bg-brand-teal text-white";
        return "bg-gray-200 text-gray-800";
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-4 gap-4 w-full">
                <h2 className="text-2xl font-bold text-brand-navy shrink-1">Your Personalised Checklist</h2>
                <div className="w-full sm:w-auto flex shrink-0 justify-start sm:justify-end">
                    <button
                        onClick={handleDownload}
                        className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-green hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green whitespace-nowrap"
                    >
                        Download Project JSON
                    </button>
                </div>
            </div>

            {projectJson.projectMeta.targetBadges.includes("badge2") && (
                <section>
                    <h3 className="text-xl font-bold text-brand-teal mb-4 border-b border-brand-teal pb-2">
                        Badge 2 — Open Data Requirements
                    </h3>
                    <div className="space-y-4">
                        {checklist.badge2.map((item) => (
                            <div key={item.id} className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm flex items-start">
                                <div className="flex-shrink-0 mt-1 mr-4">
                                    <input type="checkbox" className="h-5 w-5 text-brand-teal rounded border-gray-300 focus:ring-brand-teal cursor-pointer" />
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
                        {checklist.badge2.length === 0 && (
                            <p className="text-gray-500 italic px-4">No checklist items generated.</p>
                        )}
                    </div>
                </section>
            )}

            {projectJson.projectMeta.targetBadges.includes("badge3") && (
                <section>
                    <h3 className="text-xl font-bold text-brand-green mb-4 border-b border-brand-green pb-2">
                        Badge 3 — Open Analysis Code Requirements
                    </h3>
                    <div className="space-y-4">
                        {checklist.badge3.map((item) => (
                            <div key={item.id} className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm flex items-start">
                                <div className="flex-shrink-0 mt-1 mr-4">
                                    <input type="checkbox" className="h-5 w-5 text-brand-green rounded border-gray-300 focus:ring-brand-green cursor-pointer" />
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
                        {checklist.badge3.length === 0 && (
                            <p className="text-gray-500 italic px-4">No checklist items generated.</p>
                        )}
                    </div>
                </section>
            )}

            <div className="pt-6">
                <button
                    onClick={onBack}
                    className="inline-flex justify-center py-2 px-6 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal"
                >
                    Back to Questionnaire
                </button>
            </div>
        </div>
    );
}
