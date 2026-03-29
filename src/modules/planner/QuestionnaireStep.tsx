"use client";

import { useEffect } from "react";
import { ProjectProfileValues, WorkflowTemplate } from "@/data/schema";

interface Props {
    template: WorkflowTemplate;
    targetBadges: string[];
    data: ProjectProfileValues;
    onChange: (data: ProjectProfileValues) => void;
}

export default function QuestionnaireStep({ template, targetBadges, data, onChange }: Props) {
    const relevantFeatures = template.features.filter(f => !f.badgeId || targetBadges.includes(f.badgeId));

    // Initialize unconditionally required keys safely on load or structural change
    useEffect(() => {
        let changed = false;
        const next = { ...data };
        relevantFeatures.forEach(f => {
            if (next[f.id] === undefined) {
                next[f.id] = false;
                changed = true;
            }
        });
        if (changed) {
            onChange(next);
        }
    }, [template.features, targetBadges]);

    const setField = (fieldId: string, value: boolean) => {
        onChange({ ...data, [fieldId]: value });
    };

    if (relevantFeatures.length === 0) {
        if (targetBadges.includes("badge_hse") && targetBadges.length === 1) {
            return (
                <div className="p-8 text-center bg-brand-navy bg-opacity-5 rounded-lg border border-brand-navy border-opacity-10 mt-10">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Health, Safety, and Ethics Selected</h3>
                    <p className="text-gray-600">This module contains universal standards and does not require a custom questionnaire.</p>
                    <p className="mt-2 text-brand-teal font-semibold">Proceed down to review your compiled Checklist.</p>
                </div>
            );
        }

        return (
            <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-lg border border-gray-200 mt-6">
                Please select a framework badge above to begin dynamically answering your study feature questions.
            </div>
        );
    }

    // Group features by Category
    const categories = Array.from(new Set(relevantFeatures.map(f => f.category || "General Questions")));

    return (
        <div className="space-y-8 mt-10">
            <h2 className="text-xl font-semibold text-brand-navy border-b pb-2">2. Study Features Questionnaire</h2>
            {categories.map(category => (
                <section key={category}>
                    <h3 className="text-lg font-bold text-gray-700 mb-4">{category}</h3>
                    {relevantFeatures.filter(f => (f.category || "General Questions") === category).map(feature => (
                        <div key={feature.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-4 hover:border-brand-teal transition-colors duration-150">
                            <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start">
                                <div className="mb-4 xl:mb-0 xl:pr-8">
                                    <label htmlFor={feature.id} className="block text-base font-semibold text-gray-900 mb-1">
                                        {feature.label}
                                    </label>
                                    {feature.description && <p className="text-sm text-gray-600">{feature.description}</p>}
                                </div>
                                <div className="flex items-center space-x-4 shrink-0 mt-2 xl:mt-0">
                                    <label className="flex items-center cursor-pointer p-2 bg-white border border-gray-200 rounded-md hover:bg-brand-teal hover:border-brand-teal hover:text-white transition-colors group">
                                        <input
                                            type="radio"
                                            name={feature.id}
                                            className="h-4 w-4 text-brand-teal focus:ring-brand-teal rounded-full"
                                            checked={data[feature.id] === true}
                                            onChange={() => setField(feature.id, true)}
                                        />
                                        <span className="ml-2 font-medium">Yes</span>
                                    </label>
                                    <label className="flex items-center cursor-pointer p-2 bg-white border border-gray-200 rounded-md hover:bg-brand-amber hover:border-brand-amber hover:text-white transition-colors group">
                                        <input
                                            type="radio"
                                            name={feature.id}
                                            className="h-4 w-4 text-brand-amber focus:ring-brand-amber rounded-full"
                                            checked={data[feature.id] === false}
                                            onChange={() => setField(feature.id, false)}
                                        />
                                        <span className="ml-2 font-medium">No</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            ))}
        </div>
    );
}
