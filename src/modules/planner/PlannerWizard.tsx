"use client";

import { useState, useMemo } from "react";
import MetadataStep from "./MetadataStep";
import QuestionnaireStep from "./QuestionnaireStep";
import ChecklistView from "./ChecklistView";
import { ProjectMeta, ProjectProfileValues, SCHEMA_VERSION, WorkflowTemplate } from "@/data/schema";
import { generateChecklist } from "@/data/checklistLogic";
import { xrAuditorDefaultTemplate } from "@/data/defaultTemplate";
import { exportJsonAsBlob } from "@/utils/export";

export default function PlannerWizard() {
    const [template] = useState<WorkflowTemplate>(xrAuditorDefaultTemplate);

    const [meta, setMeta] = useState<ProjectMeta>({
        projectTitle: "",
        researcherName: "",
        institution: "",
        targetBadges: [],
    });

    const [profile, setProfile] = useState<ProjectProfileValues>({});

    const checklist = useMemo(() => {
        return generateChecklist(template, profile, meta.targetBadges);
    }, [template, profile, meta.targetBadges]);

    const fullProjectJson = {
        schemaVersion: SCHEMA_VERSION,
        generatedAt: new Date().toISOString(),
        workflowTemplate: template,
        projectMeta: meta,
        projectProfile: profile,
        generatedChecklist: checklist,
    };

    const handleDownload = () => {
        if (!meta.projectTitle || !meta.researcherName || meta.targetBadges.length === 0) {
            alert("Please complete the Project Information block and select at least one badge before exporting.");
            return;
        }
        exportJsonAsBlob(fullProjectJson);
        alert("Project saved. Load this file in the Audit module when your project is complete.");
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="mb-8 border-b border-gray-200 pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-brand-navy mb-2">Live Interactive Dashboard</h1>
                    <p className="text-gray-600 font-medium">Configure your study features below to instantly generate your compliance checklist.</p>
                </div>
                <button
                    onClick={handleDownload}
                    className="mt-4 sm:mt-0 inline-flex justify-center py-2.5 px-6 border border-transparent shadow-md text-sm font-bold rounded-lg text-white bg-brand-green hover:bg-emerald-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green whitespace-nowrap transition-all duration-200 ease-in-out"
                >
                    Export Project JSON
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative items-start">
                
                {/* Left Column: Editor & Inputs */}
                <div className="lg:col-span-6 xl:col-span-7 space-y-8 pb-10">
                    <div className="bg-white shadow sm:rounded-lg border border-gray-200 px-4 py-5 sm:p-6 sm:px-8 sm:py-8">
                        <MetadataStep
                            template={template}
                            data={meta}
                            onChange={setMeta}
                        />
                        
                        <QuestionnaireStep
                            template={template}
                            targetBadges={meta.targetBadges}
                            data={profile}
                            onChange={setProfile}
                        />
                        
                        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                            <p className="text-gray-500 mb-4 text-sm">Once you're satisfied with your answers, export your configuration to begin your project.</p>
                            <button
                                onClick={handleDownload}
                                className="inline-flex justify-center py-3 px-8 border border-transparent shadow-md text-base font-bold rounded-lg text-white bg-brand-green hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green transition-all"
                            >
                                Export Complete Project JSON
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Live Checklist (Sticky) */}
                <div className="lg:col-span-6 xl:col-span-5 h-full relative">
                    <ChecklistView
                        template={template}
                        checklist={checklist}
                        projectJson={fullProjectJson}
                    />
                </div>

            </div>
        </div>
    );
}
