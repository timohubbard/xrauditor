"use client";

import { useState } from "react";

export default function GlossaryPanel() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div
                className={`bg-white shadow-2xl rounded-lg border border-gray-200 transition-all duration-300 ${isOpen ? "w-80 h-96 opacity-100 flex flex-col" : "w-0 h-0 opacity-0 overflow-hidden"
                    }`}
            >
                <div className="bg-brand-navy text-white p-3 font-semibold flex justify-between items-center rounded-t-lg">
                    <span>Domain Glossary</span>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-300 hover:text-white text-xl leading-none"
                    >
                        &times;
                    </button>
                </div>
                <div className="p-4 overflow-y-auto text-sm text-gray-700 space-y-4">
                    <p>
                        <strong>IPQ:</strong> Igroup Presence Questionnaire (measures presence; subscales:
                        General Presence, Spatial Presence, Involvement, Experienced Realism)
                    </p>
                    <p>
                        <strong>SUS:</strong> Slater-Usoh-Steed Presence Questionnaire (6-item presence scale;
                        distinct from System Usability Scale which shares the acronym)
                    </p>
                    <p>
                        <strong>SPES:</strong> Short Presence and Embodiment Scale
                    </p>
                    <p>
                        <strong>CSQ-VR:</strong> Cybersickness Questionnaire for Virtual Reality (subscales:
                        Nausea, Disorientation, Sopite-Related)
                    </p>
                    <p>
                        <strong>IVBO:</strong> Illusion of Virtual Body Ownership scale
                    </p>
                    <p>
                        <strong>VEQ:</strong> Virtual Embodiment Questionnaire
                    </p>
                    <p>
                        <strong>EQ:</strong> Embodiment Questionnaire (Bhatt et al.)
                    </p>
                    <p>
                        <strong>SPS:</strong> Social Presence Scale
                    </p>
                    <p>
                        <strong>Humanness Index:</strong> Scale for assessing perceived humanness of virtual
                        characters (used to measure uncanny valley effects)
                    </p>
                    <p>
                        <strong>6DoF:</strong> Six degrees of freedom: position (x, y, z) + rotation (pitch,
                        yaw, roll)
                    </p>
                    <p>
                        <strong>I-DT:</strong> Dispersion-Threshold fixation detection algorithm
                    </p>
                    <p>
                        <strong>I-VT:</strong> Velocity-Threshold fixation detection algorithm
                    </p>
                    <p>
                        <strong>AOI:</strong> Area of Interest (defined region used in gaze data analysis)
                    </p>
                    <p>
                        <strong>OpenXR:</strong> Cross-platform, royalty-free API standard for VR/AR
                        applications
                    </p>
                    <p>
                        <strong>OpenVR:</strong> Valve&apos;s open API for VR hardware (predecessor to OpenXR)
                    </p>
                    <p>
                        <strong>OSF:</strong> Open Science Framework (osf.io) — repository for pre-registration,
                        data, and materials
                    </p>
                    <p>
                        <strong>AsPredicted:</strong> Lightweight pre-registration platform (aspredicted.org)
                    </p>
                    <p>
                        <strong>DUA:</strong> Data Use Agreement (governs controlled-access data sharing)
                    </p>
                    <p>
                        <strong>GDPR:</strong> General Data Protection Regulation (EU data privacy law)
                    </p>
                    <p>
                        <strong>HIPAA:</strong> Health Insurance Portability and Accountability Act (US health
                        data law)
                    </p>
                </div>
            </div>

            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-brand-teal text-white shadow-lg rounded-full px-4 py-2 hover:bg-brand-navy transition-colors font-medium flex items-center"
                >
                    <span className="mr-2">?</span> Glossary Help
                </button>
            )}
        </div>
    );
}
