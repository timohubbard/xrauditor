"use client";

import { useState } from "react";
import { ProjectProfile } from "@/data/schema";

interface Props {
    initialData: ProjectProfile;
    onBack: () => void;
    onGenerate: (data: ProjectProfile) => void;
}

export default function QuestionnaireStep({ initialData, onBack, onGenerate }: Props) {
    const [data, setData] = useState<ProjectProfile>(initialData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        onGenerate(data);
    };

    const setField = (field: keyof ProjectProfile, value: boolean) => {
        setData((prev) => ({ ...prev, [field]: value }));
    };

    const Question = ({
        id,
        label,
        description,
        field
    }: {
        id: string;
        label: string;
        description?: string;
        field: keyof ProjectProfile;
    }) => (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                <div className="mb-4 sm:mb-0 sm:pr-8">
                    <label htmlFor={id} className="block text-base font-semibold text-gray-900 mb-1">
                        {label}
                    </label>
                    {description && <p className="text-sm text-gray-600">{description}</p>}
                </div>
                <div className="flex items-center space-x-4 shrink-0">
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name={id}
                            className="h-5 w-5 text-brand-teal focus:ring-brand-teal"
                            checked={data[field] === true}
                            onChange={() => setField(field, true)}
                            required
                        />
                        <span className="ml-2 font-medium">Yes</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name={id}
                            className="h-5 w-5 text-brand-amber focus:ring-brand-amber"
                            checked={data[field] === false}
                            onChange={() => setField(field, false)}
                        />
                        <span className="ml-2 font-medium">No</span>
                    </label>
                </div>
            </div>
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-8">

            <section>
                <h3 className="text-xl font-bold text-brand-navy mb-4 border-b pb-2">SECTION A — Study Design</h3>
                <Question
                    id="q1"
                    field="usesArtificialLocomotion"
                    label="Does your study use artificial locomotion?"
                    description="(e.g., teleportation, joystick, continuous movement — anything other than the participant physically walking)"
                />
                <Question
                    id="q2"
                    field="hasVirtualAvatar"
                    label="Does your study include a virtual body or avatar that participants control or embody?"
                />
                <Question
                    id="q3"
                    field="hasVirtualHumanoids"
                    label="Does your study include virtual humanoid characters, NPCs, or virtual agents?"
                    description="(Other than the participant's own avatar)"
                />
                <Question
                    id="q4"
                    field="hasObjectInteraction"
                    label="Does your study involve participants interacting with virtual objects?"
                    description="(Grabbing, manipulating, using controllers or hand-tracking)"
                />
                <Question
                    id="q5"
                    field="usesEyeTracking"
                    label="Does your study use eye-tracking hardware?"
                />
                <Question
                    id="q6"
                    field="hasMultiStreamSensors"
                    label="Will you record data from more than one sensor stream simultaneously?"
                    description="(e.g., HMD motion + physiological signals, or HMD + eye-tracker)"
                />
                <Question
                    id="q7"
                    field="hasSixDofData"
                    label="Will you record 6DoF head or controller motion data (position + rotation)?"
                />
                <Question
                    id="q8"
                    field="usesStandardBatteryInstruments"
                    label="Will you administer any of the standard battery instruments?"
                    description="(IPQ, SUS, SPES, CSQ-VR, IVBO, VEQ, EQ, SPS, Humanness Index)"
                />
            </section>

            <section>
                <h3 className="text-xl font-bold text-brand-navy mb-4 border-b pb-2">SECTION B — Procedural</h3>
                <Question
                    id="q9"
                    field="sessionLongerThan30Min"
                    label="Will any sessions last longer than 30 minutes?"
                />
                <Question
                    id="q10"
                    field="isMultiSite"
                    label="Is this a multi-site or multi-lab study?"
                />
            </section>

            <section>
                <h3 className="text-xl font-bold text-brand-navy mb-4 border-b pb-2">SECTION C — Ethics & Sharing</h3>
                <Question
                    id="q11"
                    field="isConfirmatory"
                    label="Is your study confirmatory / hypothesis-driven (as opposed to exploratory)?"
                />
                <Question
                    id="q12"
                    field="collectsBiometricData"
                    label="Will you collect biometric or otherwise identifiable data?"
                    description="(e.g., eye movement, physiological signals, facial capture)"
                />
                <Question
                    id="q13"
                    field="environmentCodeShareable"
                    label="Is your VR environment code shareable without IP restrictions?"
                />
                <Question
                    id="q14"
                    field="participantDataShareable"
                    label="Can your participant data be shared openly (no consent or ethics restrictions)?"
                />
                <Question
                    id="q15"
                    field="hasMultipleConditions"
                    label="Does your study use multiple conditions or a longitudinal design?"
                />
            </section>

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
