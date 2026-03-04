"use client";

import { useState } from "react";
import { WorkflowTemplate, validateWorkflowTemplate } from "@/data/schema";
import { xrAuditorDefaultTemplate } from "@/data/defaultTemplate";
import { exportWorkflowJsonAsBlob } from "@/utils/exportWorkflow";
import BuilderEditor from "./BuilderEditor";

export default function BuilderLanding() {
    const [template, setTemplate] = useState<WorkflowTemplate | null>(null);

    const startEmpty = () => {
        setTemplate({
            templateName: "My Custom Workflow",
            version: "1.0",
            badges: [],
            features: [],
            checklistItems: []
        });
    };

    const startFromDefault = () => {
        // Deep clone to avoid mutating the constant reference
        setTemplate(JSON.parse(JSON.stringify(xrAuditorDefaultTemplate)));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                if (validateWorkflowTemplate(json)) {
                    setTemplate(json);
                } else {
                    alert("Invalid Workflow Template file.");
                }
            } catch (err) {
                alert("Error parsing JSON file. Please ensure it is a valid format.");
            }
        };
        reader.readAsText(file);
    };

    const handleSave = () => {
        if (template) {
            exportWorkflowJsonAsBlob(template);
        }
    };

    if (template) {
        return (
            <BuilderEditor
                template={template}
                onChange={setTemplate}
                onSave={handleSave}
                onReset={() => setTemplate(null)}
            />
        );
    }

    return (
        <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-brand-navy sm:text-4xl">Workflow Builder</h1>
                <p className="mt-4 text-lg text-gray-600">
                    Design your own custom badging framework. Define badges, conditional study features,
                    and exact checklist requirements. Export as JSON to be used by others.
                </p>
            </div>

            <div className="bg-white shadow sm:rounded-lg overflow-hidden border border-gray-200">
                <div className="px-4 py-5 sm:p-6 p-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-200">
                        <div className="p-6 border border-gray-200 rounded-lg flex flex-col items-center text-center hover:border-brand-teal transition-colors">
                            <div className="h-12 w-12 rounded-full bg-brand-teal bg-opacity-10 flex items-center justify-center mb-4">
                                <svg className="h-6 w-6 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Blank Template</h3>
                            <p className="text-sm text-gray-500 mb-6 flex-grow">Start completely fresh with zero badges or rules.</p>
                            <button onClick={startEmpty} className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-teal hover:bg-opacity-90">
                                Create Blank
                            </button>
                        </div>

                        <div className="p-6 border border-gray-200 rounded-lg flex flex-col items-center text-center hover:border-brand-navy transition-colors">
                            <div className="h-12 w-12 rounded-full bg-brand-navy bg-opacity-10 flex items-center justify-center mb-4">
                                <svg className="h-6 w-6 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16V8a2 2 0 012-2h4a2 2 0 012 2v8m-6-4h4" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">VR/XR Open Science</h3>
                            <p className="text-sm text-gray-500 mb-6 flex-grow">Clone the primary Open Science Badge Framework to modify it.</p>
                            <button onClick={startFromDefault} className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-navy hover:bg-opacity-90">
                                Clone Default
                            </button>
                        </div>
                    </div>

                    <div className="pt-8 text-center">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Or Load Existing Template</h3>
                        <label className="cursor-pointer inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-teal transition-colors w-full sm:w-auto justify-center">
                            <span>Select File.json</span>
                            <input
                                type="file"
                                accept=".json"
                                className="sr-only"
                                onChange={handleFileUpload}
                            />
                        </label>
                        <p className="mt-2 text-sm text-gray-500">Only valid WorkflowTemplate JSON files accepted.</p>
                    </div>

                </div>
            </div>
        </div>
    );
}
