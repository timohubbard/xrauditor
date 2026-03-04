"use client";

import { useState } from "react";
import { WorkflowTemplate, WorkflowBadge, WorkflowFeature } from "@/data/schema";

interface Props {
    template: WorkflowTemplate;
    onChange: (t: WorkflowTemplate) => void;
    onSave: () => void;
    onReset: () => void;
}

export default function BuilderEditor({ template, onChange, onSave, onReset }: Props) {
    const [activeTab, setActiveTab] = useState<"meta" | "badges" | "features" | "checklist">("meta");

    const handleMetaChange = (field: keyof WorkflowTemplate, val: string) => {
        onChange({ ...template, [field]: val });
    };

    const handleAddBadge = () => {
        const newBadgeId = prompt("Enter a unique Badge ID (e.g., 'badge4', 'gold-tier'):");
        if (!newBadgeId) return;

        if (template.badges.find(b => b.id === newBadgeId)) {
            alert("A badge with that ID already exists.");
            return;
        }

        const newBadges = [...template.badges, { id: newBadgeId, label: `New Badge (${newBadgeId})` }];
        onChange({ ...template, badges: newBadges });
    };

    const handleUpdateBadgeLabel = (id: string, newLabel: string) => {
        const newBadges = template.badges.map(b => b.id === id ? { ...b, label: newLabel } : b);
        onChange({ ...template, badges: newBadges });
    };

    const handleRemoveBadge = (id: string) => {
        if (confirm("Are you sure? This may orphan checklist items linked to this badge.")) {
            const newBadges = template.badges.filter(b => b.id !== id);
            onChange({ ...template, badges: newBadges });
        }
    };

    const handleAddFeature = () => {
        const newFeatureId = prompt("Enter a unique Feature ID (camelCase recommended, e.g., 'usesEyeTracking'):");
        if (!newFeatureId) return;

        if (template.features.find(f => f.id === newFeatureId)) {
            alert("A feature with that ID already exists.");
            return;
        }

        const newFeatures = [...template.features, {
            id: newFeatureId,
            category: "General",
            label: "New Question Label?"
        }];
        onChange({ ...template, features: newFeatures });
    };

    const handleUpdateFeature = (id: string, updates: Partial<WorkflowFeature>) => {
        const newFeatures = template.features.map(f => f.id === id ? { ...f, ...updates } : f);
        onChange({ ...template, features: newFeatures });
    };

    const handleRemoveFeature = (id: string) => {
        if (confirm("Remove this feature? Checklist items dependent on this feature will no longer trigger conditionally unless reassigned.")) {
            const newFeatures = template.features.filter(f => f.id !== id);
            onChange({ ...template, features: newFeatures });
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-gray-200 pb-5 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-brand-navy mb-1">Editor: {template.templateName}</h1>
                    <p className="text-sm text-gray-500">Modify the custom JSON structure of this workflow.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={onReset} className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Close Template
                    </button>
                    <button onClick={onSave} className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-green hover:bg-opacity-90">
                        Export JSON File
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Nav */}
                <div className="w-full md:w-64 shrink-0 space-y-1">
                    <button
                        onClick={() => setActiveTab("meta")}
                        className={`w-full text-left px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === "meta" ? "bg-brand-navy text-white shadow" : "text-gray-900 hover:bg-gray-100"}`}
                    >
                        Workflow Meta
                    </button>
                    <button
                        onClick={() => setActiveTab("badges")}
                        className={`w-full text-left px-4 py-3 text-sm font-medium rounded-md transition-colors flex justify-between ${activeTab === "badges" ? "bg-brand-navy text-white shadow" : "text-gray-900 hover:bg-gray-100"}`}
                    >
                        <span>Target Badges</span>
                        <span className="bg-white bg-opacity-20 text-xs px-2 py-0.5 rounded-full">{template.badges.length}</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("features")}
                        className={`w-full text-left px-4 py-3 text-sm font-medium rounded-md transition-colors flex justify-between ${activeTab === "features" ? "bg-brand-navy text-white shadow" : "text-gray-900 hover:bg-gray-100"}`}
                    >
                        <span>Study Features </span>
                        <span className="bg-white bg-opacity-20 text-xs px-2 py-0.5 rounded-full">{template.features.length}</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("checklist")}
                        className={`w-full text-left px-4 py-3 text-sm font-medium rounded-md transition-colors flex justify-between ${activeTab === "checklist" ? "bg-brand-navy text-white shadow" : "text-gray-900 hover:bg-gray-100"}`}
                    >
                        <span>Checklist Engine</span>
                        <span className="bg-white bg-opacity-20 text-xs px-2 py-0.5 rounded-full">{template.checklistItems.length}</span>
                    </button>
                </div>

                {/* Editor Main Content */}
                <div className="flex-grow bg-white border border-gray-200 shadow-sm rounded-lg p-6">

                    {activeTab === "meta" && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-900">Workflow Metadata</h2>
                            <div className="max-w-xl space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Template Name</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm p-2 border"
                                        value={template.templateName}
                                        onChange={(e) => handleMetaChange("templateName", e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Version</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm p-2 border"
                                        value={template.version}
                                        onChange={(e) => handleMetaChange("version", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "badges" && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold text-gray-900">Define Target Badges</h2>
                                <button onClick={handleAddBadge} className="text-sm bg-brand-teal text-white px-3 py-1.5 rounded-md hover:bg-opacity-90">
                                    + Add Badge
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mb-4">Badges represent the high level outputs a researcher is pursuing.</p>

                            <div className="space-y-3">
                                {template.badges.length === 0 && <p className="italic text-gray-500 text-sm">No badges defined.</p>}
                                {template.badges.map(badge => (
                                    <div key={badge.id} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 border border-gray-200 rounded-md bg-gray-50">
                                        <div className="w-48 shrink-0">
                                            <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">ID</span>
                                            <code className="block mt-1 bg-white border border-gray-200 px-2 py-1 rounded text-sm text-brand-navy font-mono break-all">{badge.id}</code>
                                        </div>
                                        <div className="flex-grow w-full">
                                            <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">Display Label</span>
                                            <input
                                                type="text"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm p-2 border bg-white"
                                                value={badge.label}
                                                onChange={(e) => handleUpdateBadgeLabel(badge.id, e.target.value)}
                                            />
                                        </div>
                                        <button onClick={() => handleRemoveBadge(badge.id)} className="text-red-600 hover:text-red-900 p-2 shrink-0">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "features" && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold text-gray-900">Define Study Features</h2>
                                <button onClick={handleAddFeature} className="text-sm bg-brand-teal text-white px-3 py-1.5 rounded-md hover:bg-opacity-90">
                                    + Add Feature
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mb-4">Features are rendered as Yes/No questions in the Planner Wizard Questionnaire.</p>

                            <div className="space-y-4">
                                {template.features.length === 0 && <p className="italic text-gray-500 text-sm">No features defined. Questionnaire will be skipped.</p>}
                                {template.features.map(feature => (
                                    <div key={feature.id} className="p-4 border border-gray-200 rounded-md bg-gray-50 space-y-4">
                                        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                                            <div>
                                                <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">Feature ID</span>
                                                <code className="block mt-1 bg-white border border-gray-200 px-2 py-1 rounded text-sm text-brand-navy font-mono break-all">{feature.id}</code>
                                            </div>
                                            <button onClick={() => handleRemoveFeature(feature.id)} className="text-red-600 hover:text-red-900">
                                                Remove Feature
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="sm:col-span-2">
                                                <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1">Question Banner Category</label>
                                                <input type="text" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm p-2 border" value={feature.category} onChange={(e) => handleUpdateFeature(feature.id, { category: e.target.value })} />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1">Main Label</label>
                                                <input type="text" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm p-2 border" value={feature.label} onChange={(e) => handleUpdateFeature(feature.id, { label: e.target.value })} />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1">Target Badge (Optional)</label>
                                                <select
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm p-2 border bg-white"
                                                    value={feature.badgeId || ""}
                                                    onChange={(e) => handleUpdateFeature(feature.id, { badgeId: e.target.value || undefined })}
                                                >
                                                    <option value="">None / General Feature</option>
                                                    {template.badges.map(b => <option key={b.id} value={b.id}>{b.label}</option>)}
                                                </select>
                                                <p className="mt-1 text-xs text-gray-500">If selected, this feature will only be asked if the user selects the associated target badge.</p>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1">Description (Optional)</label>
                                                <textarea rows={2} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm p-2 border" value={feature.description || ""} onChange={(e) => handleUpdateFeature(feature.id, { description: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "checklist" && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold text-gray-900">Define Framework Checklist</h2>
                                <button onClick={() => {
                                    const newId = prompt("Enter a unique Checklist Item ID (e.g. 'c1', 'data-presence'):");
                                    if (!newId) return;
                                    if (template.checklistItems.find(i => i.id === newId)) {
                                        alert("ID already in use.");
                                        return;
                                    }

                                    const newItem = {
                                        id: newId,
                                        badgeId: template.badges[0]?.id || "",
                                        category: "General",
                                        label: "New Checklist Item",
                                        description: "",
                                        required: true
                                    };
                                    onChange({ ...template, checklistItems: [...template.checklistItems, newItem] });
                                }} className="text-sm bg-brand-teal text-white px-3 py-1.5 rounded-md hover:bg-opacity-90">
                                    + Add Item
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mb-4">These items will be evaluated during the Audit flow based on user configurations.</p>

                            <div className="space-y-4">
                                {template.checklistItems.length === 0 && <p className="italic text-gray-500 text-sm">No checklist items defined.</p>}
                                {template.checklistItems.map(item => (
                                    <div key={item.id} className="p-4 border border-gray-200 rounded-md bg-gray-50 space-y-4 relative">
                                        <button
                                            onClick={() => {
                                                if (confirm("Remove this checklist item?")) {
                                                    onChange({ ...template, checklistItems: template.checklistItems.filter(i => i.id !== item.id) });
                                                }
                                            }}
                                            className="absolute top-4 right-4 text-red-600 hover:text-red-900 text-sm"
                                        >
                                            Remove
                                        </button>

                                        <div>
                                            <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">Item ID</span>
                                            <code className="block mt-1 bg-white border border-gray-200 px-2 py-1 rounded text-sm text-brand-navy font-mono break-all inline-block">{item.id}</code>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-200 pb-4">
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1">Target Badge</label>
                                                <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm p-2 border bg-white"
                                                    value={item.badgeId}
                                                    onChange={(e) => {
                                                        const updated = template.checklistItems.map(i => i.id === item.id ? { ...i, badgeId: e.target.value } : i);
                                                        onChange({ ...template, checklistItems: updated });
                                                    }}>
                                                    <option value="">Select a Badge...</option>
                                                    {template.badges.map(b => <option key={b.id} value={b.id}>{b.label}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1">Condition Trigger (Optional)</label>
                                                <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm p-2 border bg-white"
                                                    value={item.conditionalOnFeatureId || ""}
                                                    onChange={(e) => {
                                                        const val = e.target.value === "" ? undefined : e.target.value;
                                                        const updated = template.checklistItems.map(i => i.id === item.id ? { ...i, conditionalOnFeatureId: val, required: val ? false : i.required } : i);
                                                        onChange({ ...template, checklistItems: updated });
                                                    }}>
                                                    <option value="">Always Evaluated</option>
                                                    {template.features.map(f => <option key={f.id} value={f.id}>If Yes: {f.label}</option>)}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="sm:col-span-2">
                                                <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1">Checklist Category</label>
                                                <input type="text" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm p-2 border" value={item.category}
                                                    onChange={(e) => {
                                                        const updated = template.checklistItems.map(i => i.id === item.id ? { ...i, category: e.target.value } : i);
                                                        onChange({ ...template, checklistItems: updated });
                                                    }}
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1">Main Requirement Label</label>
                                                <input type="text" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm p-2 border" value={item.label}
                                                    onChange={(e) => {
                                                        const updated = template.checklistItems.map(i => i.id === item.id ? { ...i, label: e.target.value } : i);
                                                        onChange({ ...template, checklistItems: updated });
                                                    }}
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1">Detailed Description</label>
                                                <textarea rows={2} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm p-2 border" value={item.description}
                                                    onChange={(e) => {
                                                        const updated = template.checklistItems.map(i => i.id === item.id ? { ...i, description: e.target.value } : i);
                                                        onChange({ ...template, checklistItems: updated });
                                                    }}
                                                />
                                            </div>
                                            <div className="sm:col-span-2 flex items-center mt-2">
                                                <input type="checkbox" className="h-4 w-4 text-brand-teal rounded border-gray-300 focus:ring-brand-teal"
                                                    checked={item.required}
                                                    disabled={!!item.conditionalOnFeatureId}
                                                    onChange={(e) => {
                                                        const updated = template.checklistItems.map(i => i.id === item.id ? { ...i, required: e.target.checked } : i);
                                                        onChange({ ...template, checklistItems: updated });
                                                    }}
                                                />
                                                <span className={`ml-2 text-sm font-medium ${item.conditionalOnFeatureId ? "text-gray-400" : "text-gray-700"}`}>
                                                    Is this requirement absolutely required to pass the audit without conditions?
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
