"use client";

import { useState } from "react";
import MetadataStep from "./MetadataStep";
import QuestionnaireStep from "./QuestionnaireStep";
import ChecklistView from "./ChecklistView";
import { ProjectMeta, ProjectProfileValues, GeneratedChecklist, SCHEMA_VERSION, WorkflowTemplate } from "@/data/schema";
import { generateChecklist } from "@/data/checklistLogic";
import { xrAuditorDefaultTemplate } from "@/data/defaultTemplate";

export default function PlannerWizard() {
    const [step, setStep] = useState<1 | 2 | 3>(1);

    // In the future this could be loaded from local storage or passed via props
    const [template] = useState<WorkflowTemplate>(xrAuditorDefaultTemplate);

    const [meta, setMeta] = useState<ProjectMeta>({
        projectTitle: "",
        researcherName: "",
        institution: "",
        targetBadges: [],
    });

    const [profile, setProfile] = useState<ProjectProfileValues>({});
    const [checklist, setChecklist] = useState<GeneratedChecklist | null>(null);

    const handleNextToQuestionnaire = (newMeta: ProjectMeta) => {
        setMeta(newMeta);
        setStep(2);
    };

    const handleGenerate = (newProfile: ProjectProfileValues) => {
        setProfile(newProfile);
        const generated = generateChecklist(template, newProfile, meta.targetBadges);
        setChecklist(generated);
        setStep(3);
    };

    const fullProjectJson = checklist ? {
        schemaVersion: SCHEMA_VERSION,
        generatedAt: new Date().toISOString(),
        workflowTemplate: template,
        projectMeta: meta,
        projectProfile: profile,
        generatedChecklist: checklist,
    } : null;

    return (
        <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">

            {/* Stepper UI */}
            <div className="mb-8 border-b border-gray-200 pb-5">
                <h1 className="text-3xl font-bold text-brand-navy mb-2">Project Planner</h1>
                <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm font-medium">
                    <span className={`${step >= 1 ? 'text-brand-teal' : 'text-gray-400'}`}>1. Metadata</span>
                    <span className="text-gray-300">/</span>
                    <span className={`${step >= 2 ? 'text-brand-teal' : 'text-gray-400'}`}>2. Questionnaire</span>
                    <span className="text-gray-300">/</span>
                    <span className={`${step >= 3 ? 'text-brand-teal' : 'text-gray-400'}`}>3. Checklist</span>
                </div>
            </div>

            <div className="bg-white shadow sm:rounded-lg border border-gray-200">
                <div className="px-4 py-5 sm:p-6 sm:px-8 sm:py-8">
                    {step === 1 && (
                        <MetadataStep
                            template={template}
                            initialData={meta}
                            onNext={handleNextToQuestionnaire}
                        />
                    )}
                    {step === 2 && (
                        <QuestionnaireStep
                            template={template}
                            initialData={profile}
                            onBack={() => setStep(1)}
                            onGenerate={handleGenerate}
                        />
                    )}
                    {step === 3 && checklist && fullProjectJson && (
                        <ChecklistView
                            template={template}
                            checklist={checklist}
                            projectJson={fullProjectJson}
                            onBack={() => setStep(2)}
                        />
                    )}
                </div>
            </div>

        </div>
    );
}
