"use client";

import { useState, useMemo } from "react";
import MetadataStep from "./MetadataStep";
import QuestionnaireStep from "./QuestionnaireStep";
import ChecklistView from "./ChecklistView";
import { ProjectMeta, ProjectProfileValues, SCHEMA_VERSION, WorkflowTemplate } from "@/data/schema";
import { generateChecklist } from "@/data/checklistLogic";
import { xrAuditorDefaultTemplate } from "@/data/defaultTemplate";
import { exportJsonAsBlob } from "@/utils/export";
import { exportChecklistToWord } from "@/utils/exportChecklist";
import { pdf } from "@react-pdf/renderer";
import PdfProjectChecklist from "@/components/PdfProjectChecklist";
import { slugify } from "@/utils/slugify";
import { exportMarkdownTemplate } from "@/utils/exportTemplate";

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

    const isExportReady = meta.projectTitle && meta.researcherName && meta.targetBadges.length > 0;

    const handleDownloadJson = () => {
        if (!isExportReady) {
            alert("Please complete the Project Information block and select at least one badge before exporting.");
            return;
        }
        exportJsonAsBlob(fullProjectJson);
        alert("Project saved. Load this file in the Audit module when your project is complete.");
    };

    const handleExportWord = async () => {
        if (!isExportReady) {
            alert("Please complete the Project Information first.");
            return;
        }
        try {
            await exportChecklistToWord(fullProjectJson);
        } catch (err) {
            console.error("Word export failed:", err);
            alert("Failed to generate Word document.");
        }
    };

    const handleExportPdf = async () => {
        if (!isExportReady) {
            alert("Please complete the Project Information first.");
            return;
        }
        try {
            const doc = <PdfProjectChecklist data={fullProjectJson} />;
            const blob = await pdf(doc).toBlob();
            const url = URL.createObjectURL(blob);
            const filename = `${slugify(fullProjectJson.projectMeta.projectTitle || "project")}_checklist.pdf`;

            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error("PDF generation failed:", err);
            alert("Failed to generate PDF.");
        }
    };

    const handleExportMdTemplate = () => {
        if (!isExportReady) {
            alert("Please complete the Project Information first.");
            return;
        }
        exportMarkdownTemplate(fullProjectJson);
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="mb-8 border-b border-gray-200 pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-brand-navy mb-2">Live Interactive Dashboard</h1>
                    <p className="text-gray-600 font-medium">Configure your study features below to instantly generate your compliance checklist.</p>
                </div>
                <button
                    onClick={handleDownloadJson}
                    className="mt-4 sm:mt-0 inline-flex justify-center py-2.5 px-6 border border-transparent shadow-md text-sm font-bold rounded-lg text-white bg-brand-green hover:bg-emerald-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green whitespace-nowrap transition-all duration-200 ease-in-out"
                >
                    Save Project (JSON)
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
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Export Your Checklist</h3>
                            <p className="text-gray-500 mb-6 text-sm">Download your custom requirements list for documentation, or save the Project JSON to upload later for auditing.</p>
                            
                            <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
                                <button
                                    onClick={handleExportMdTemplate}
                                    className="inline-flex justify-center items-center py-3 px-6 border border-brand-purple shadow-sm text-sm font-bold rounded-lg text-fuchsia-700 bg-white hover:bg-fuchsia-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-purple transition-all"
                                >
                                    Download Template (.md)
                                </button>
                                <button
                                    onClick={handleExportWord}
                                    className="inline-flex justify-center items-center py-3 px-6 border border-brand-teal shadow-sm text-sm font-bold rounded-lg text-brand-teal bg-white hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal transition-all"
                                >
                                    Download Word (.docx)
                                </button>
                                <button
                                    onClick={handleExportPdf}
                                    className="inline-flex justify-center items-center py-3 px-6 border border-brand-navy shadow-sm text-sm font-bold rounded-lg text-brand-navy bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy transition-all"
                                >
                                    Download PDF (.pdf)
                                </button>
                                <button
                                    onClick={handleDownloadJson}
                                    className="inline-flex justify-center items-center py-3 px-6 border border-transparent shadow-md text-sm font-bold rounded-lg text-white bg-brand-green hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green transition-all"
                                >
                                    Save Project (.json)
                                </button>
                            </div>
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
