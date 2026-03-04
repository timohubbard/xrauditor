"use client";

import { useRef } from "react";

interface Props {
    onUpload: (json: any) => void;
}

export default function AuditUpload({ onUpload }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                onUpload(json);
            } catch (err) {
                alert("Error parsing JSON file. Is it a valid JSON?");
            }
        };
        reader.readAsText(file);
        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="bg-white shadow sm:rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-4 py-16 sm:p-20 text-center flex flex-col items-center justify-center">
                <svg
                    className="mx-auto h-16 w-16 text-brand-teal mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                </svg>
                <h3 className="mt-2 text-xl font-medium text-brand-navy">Upload Project JSON File</h3>
                <p className="mt-2 text-sm text-gray-500 max-w-md">
                    Load the JSON file generated during the "Project Planner" phase to begin the final verification audit of your academic submission.
                </p>
                <div className="mt-8">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-navy hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy transition-colors"
                    >
                        Select Project File
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json,application/json"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>
            </div>
        </div>
    );
}
