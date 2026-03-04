"use client";

import { ProjectJson, BadgeAuditStatus } from "@/data/schema";
import { exportJsonAsBlob, exportReportAsText } from "@/utils/export";

interface Props {
    projectJson: ProjectJson;
}

export default function AuditReportView({ projectJson }: Props) {
    const handleExportJson = () => {
        exportJsonAsBlob(projectJson);
    };

    const handleExportPdf = () => {
        exportReportAsText(projectJson);
    };

    const getStatusColor = (status: BadgeAuditStatus) => {
        switch (status) {
            case "pass": return "bg-brand-green text-white";
            case "conditional_pass": return "bg-brand-amber text-white";
            case "fail": return "bg-red-700 text-white";
            default: return "bg-gray-300 text-gray-800";
        }
    };

    const getStatusLabel = (status: BadgeAuditStatus) => {
        switch (status) {
            case "pass": return "PASS";
            case "conditional_pass": return "CONDITIONAL PASS";
            case "fail": return "FAIL";
            default: return "PENDING";
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-white px-6 py-5 border-l-4 border-brand-navy shadow-sm rounded-r-lg">
                <h2 className="text-xl font-bold text-brand-navy mb-2">Audit Complete</h2>
                <p className="text-gray-600 text-sm mb-4">
                    Your self-audit for <span className="font-semibold">{projectJson.projectMeta.projectTitle}</span> is complete.
                    Review the status banners below and download the final signed-off reports for your submission.
                </p>
                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={handleExportJson}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                        Download Audit Report (JSON)
                    </button>
                    <button
                        onClick={handleExportPdf}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-navy hover:bg-opacity-90 transition-colors"
                    >
                        Download Audit Report (Plain Text)
                    </button>
                </div>
            </div>

            {projectJson.workflowTemplate.badges.map(badge => {
                if (!projectJson.projectMeta.targetBadges.includes(badge.id) || !projectJson.auditResults) {
                    return null;
                }

                const badgeStatus = projectJson.auditResults.badgeStatuses[badge.id];
                const items = projectJson.generatedChecklist[badge.id] || [];

                return (
                    <section key={badge.id} className="bg-white overflow-hidden shadow sm:rounded-lg border border-gray-200">
                        <div className={`px-4 py-5 sm:px-6 ${getStatusColor(badgeStatus)}`}>
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg leading-6 font-bold">{badge.label}</h3>
                                <span className="px-3 py-1 rounded-full bg-white bg-opacity-20 font-bold tracking-wider text-sm">
                                    {getStatusLabel(badgeStatus)}
                                </span>
                            </div>
                            {badgeStatus === "conditional_pass" && (
                                <p className="mt-2 text-sm text-white text-opacity-90">
                                    Warning: Some conditional items are missing. This will be flagged for reviewer attention.
                                </p>
                            )}
                            {badgeStatus === "fail" && (
                                <p className="mt-2 text-sm text-white text-opacity-90">
                                    Failed: One or more required items are completely missing from your submission.
                                </p>
                            )}
                        </div>
                        <div className="border-t border-gray-200">
                            <dl>
                                {items.map((item, idx) => {
                                    const ans = projectJson.auditResults!.items.find(i => i.id === item.id);
                                    return (
                                        <div key={item.id} className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6`}>
                                            <dt className="text-sm font-medium text-gray-900 sm:col-span-1">
                                                {item.label}
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <span className="font-bold uppercase tracking-wider text-brand-navy">{ans?.answer}</span>
                                                </div>
                                                {ans?.notes && <p className="text-gray-500 italic mt-1 text-sm overflow-hidden break-words">Notes: {ans.notes}</p>}
                                            </dd>
                                        </div>
                                    );
                                })}
                            </dl>
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
