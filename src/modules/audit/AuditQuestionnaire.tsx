"use client";

import { useState } from "react";
import { ProjectJson, AuditResults, AuditItemResult, AuditAnswer, BadgeAuditStatus } from "@/data/schema";

interface Props {
    projectJson: ProjectJson;
    onFinish: (results: AuditResults) => void;
}

export default function AuditQuestionnaire({ projectJson, onFinish }: Props) {
    const allItems = [
        ...(projectJson.projectMeta.targetBadges.includes("badge2") ? projectJson.generatedChecklist.badge2 : []),
        ...(projectJson.projectMeta.targetBadges.includes("badge3") ? projectJson.generatedChecklist.badge3 : [])
    ];

    const [answers, setAnswers] = useState<Record<string, AuditItemResult>>({});

    const handleAnswerChange = (id: string, answer: AuditAnswer) => {
        setAnswers(prev => ({
            ...prev,
            [id]: { ...prev[id], id, answer }
        }));
    };

    const handleNotesChange = (id: string, notes: string) => {
        setAnswers(prev => ({
            ...prev,
            [id]: { ...prev[id], id, notes }
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (Object.keys(answers).length < allItems.length) {
            alert("Please answer all questions before submitting.");
            return;
        }

        const items = Object.values(answers);

        const evaluateBadge = (badgeId: "badge2" | "badge3"): BadgeAuditStatus => {
            if (!projectJson.projectMeta.targetBadges.includes(badgeId)) return "pending";

            const badgeItems = projectJson.generatedChecklist[badgeId];
            if (badgeItems.length === 0) return "pass";

            let hasPartial = false;

            for (const item of badgeItems) {
                const result = answers[item.id];

                if (result.answer === "no") return "fail";

                if (result.answer === "partial") {
                    // If an Always Required item is partial, it's a fail.
                    if (item.required) return "fail";
                    hasPartial = true;
                }
            }

            return hasPartial ? "conditional_pass" : "pass";
        };

        const results: AuditResults = {
            auditedAt: new Date().toISOString(),
            badge2Status: evaluateBadge("badge2"),
            badge3Status: evaluateBadge("badge3"),
            items
        };

        window.scrollTo({ top: 0, behavior: "smooth" });
        onFinish(results);
    };

    const answeredCount = Object.keys(answers).length;
    const progressPercent = allItems.length > 0 ? Math.round((answeredCount / allItems.length) * 100) : 100;
    const isComplete = answeredCount === allItems.length;

    const renderGroup = (badgeName: string, items: any[]) => {
        if (items.length === 0) return null;

        // Group items by category to keep layout clean
        const categories = Array.from(new Set(items.map(i => i.category)));

        return (
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-brand-navy border-b border-gray-200 pb-2">{badgeName}</h3>
                {categories.map(category => (
                    <div key={category} className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-700">{category}</h4>
                        {items.filter(i => i.category === category).map(item => {
                            const ans = answers[item.id];
                            const showNotes = ans?.answer === "partial" || ans?.answer === "no";

                            return (
                                <div key={item.id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                                    <div className="mb-4">
                                        <p className="font-bold text-gray-900 mb-1">{item.label}</p>
                                        <p className="text-sm text-gray-600">Is this included in your submission?</p>
                                        <p className="text-xs text-gray-500 mt-1 italic">{item.description}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-3 mb-4">
                                        {(["yes", "partial", "no", "na"] as AuditAnswer[]).map(val => (
                                            <label key={val} className="flex items-center cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name={`audit-${item.id}`}
                                                    value={val}
                                                    checked={ans?.answer === val}
                                                    onChange={() => handleAnswerChange(item.id, val)}
                                                    className="h-4 w-4 text-brand-teal focus:ring-brand-teal"
                                                />
                                                <span className="ml-2 text-sm font-medium uppercase tracking-wider text-gray-700">{val}</span>
                                            </label>
                                        ))}
                                    </div>

                                    {showNotes && (
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <label htmlFor={`notes-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                                                Notes (optional): describe what is missing or why.
                                            </label>
                                            <textarea
                                                id={`notes-${item.id}`}
                                                rows={2}
                                                className="shadow-sm focus:ring-brand-teal focus:border-brand-teal block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                                value={ans?.notes || ""}
                                                onChange={(e) => handleNotesChange(item.id, e.target.value)}
                                                placeholder="E.g., Waiting on co-author to upload raw data..."
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Audit Progress</span>
                    <span className="text-sm font-bold text-brand-teal">{progressPercent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-brand-teal h-2.5 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
                {projectJson.projectMeta.targetBadges.includes("badge2") && renderGroup("Badge 2 — Open Data", projectJson.generatedChecklist.badge2)}
                {projectJson.projectMeta.targetBadges.includes("badge3") && renderGroup("Badge 3 — Open Analysis Code", projectJson.generatedChecklist.badge3)}

                <div className="pt-6 border-t border-gray-200 flex justify-end">
                    <button
                        type="submit"
                        disabled={!isComplete}
                        className={`inline-flex justify-center py-3 px-8 shadow-sm text-base font-medium rounded-md text-white transition-colors ${isComplete
                                ? "bg-brand-navy hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy"
                                : "bg-gray-300 cursor-not-allowed"
                            }`}
                    >
                        Generate Audit Report
                    </button>
                </div>
            </form>
        </div>
    );
}
