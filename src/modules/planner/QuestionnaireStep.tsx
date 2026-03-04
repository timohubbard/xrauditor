"use client";

import { useState, useEffect } from "react";
import { ProjectProfileValues, WorkflowTemplate } from "@/data/schema";

interface Props {
    template: WorkflowTemplate;
    targetBadges: string[];
    initialData: ProjectProfileValues;
    onBack: () => void;
    onGenerate: (data: ProjectProfileValues) => void;
}

export default function QuestionnaireStep({ template, targetBadges, initialData, onBack, onGenerate }: Props) {
    const [data, setData] = useState<ProjectProfileValues>(initialData);

    const relevantFeatures = template.features.filter(f => !f.badgeId || targetBadges.includes(f.badgeId));

    // Initialize any missing feature keys to false safely
    useEffect(() => {
        setData((prev) => {
            const next = { ...prev };
            relevantFeatures.forEach(f => {
                if (next[f.id] === undefined) {
                    next[f.id] = false;
                }
            });
            return next;
        });
    }, [template.features, targetBadges]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        onGenerate(data);
    };

    const setField = (fieldId: string, value: boolean) => {
        setData((prev) => ({ ...prev, [fieldId]: value }));
    };

    const renderQuestions = () => {
        if (relevantFeatures.length === 0) {
            return (
                <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
                    This workflow template does not contain any conditional study features for your chosen target badges. You can proceed directly to checklist generation.
                </div>
            );
        }

        // Group features by Category
        const categories = Array.from(new Set(relevantFeatures.map(f => f.category || "General Questions")));

        return categories.map(category => (
            <section key={category}>
                <h3 className="text-xl font-bold text-brand-navy mb-4 border-b pb-2">{category}</h3>
                {relevantFeatures.filter(f => (f.category || "General Questions") === category).map(feature => (
                    <div key={feature.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                            <div className="mb-4 sm:mb-0 sm:pr-8">
                                <label htmlFor={feature.id} className="block text-base font-semibold text-gray-900 mb-1">
                                    {feature.label}
                                </label>
                                {feature.description && <p className="text-sm text-gray-600">{feature.description}</p>}
                            </div>
                            <div className="flex items-center space-x-4 shrink-0">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name={feature.id}
                                        className="h-5 w-5 text-brand-teal focus:ring-brand-teal"
                                        checked={data[feature.id] === true}
                                        onChange={() => setField(feature.id, true)}
                                        required
                                    />
                                    <span className="ml-2 font-medium">Yes</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name={feature.id}
                                        className="h-5 w-5 text-brand-amber focus:ring-brand-amber"
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
        ));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">

            {renderQuestions()}

            <div className="flex justify-between pt-4 border-t border-gray-200">
                <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex justify-center py-2 px-6 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal"
                >
                    Back
                </button>
                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-teal hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal"
                >
                    Generate Checklist
                </button>
            </div>
        </form>
    );
}
