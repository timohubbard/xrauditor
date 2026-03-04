import { WorkflowTemplate } from "./schema";

export const xrAuditorDefaultTemplate: WorkflowTemplate = {
    templateName: "VR/XR Open Science Framework",
    version: "1.0",
    badges: [
        { id: "badge2", label: "Badge 2 — Open Data" },
        { id: "badge3", label: "Badge 3 — Open Analysis Code" },
    ],
    features: [
        // SECTION A
        {
            id: "usesArtificialLocomotion",
            category: "SECTION A — Study Design",
            label: "Does your study use artificial locomotion?",
            description: "(e.g., teleportation, joystick, continuous movement — anything other than the participant physically walking)"
        },
        {
            id: "hasVirtualAvatar",
            category: "SECTION A — Study Design",
            label: "Does your study include a virtual body or avatar that participants control or embody?",
        },
        {
            id: "hasVirtualHumanoids",
            category: "SECTION A — Study Design",
            label: "Does your study include virtual humanoid characters, NPCs, or virtual agents?",
            description: "(Other than the participant's own avatar)"
        },
        {
            id: "hasObjectInteraction",
            category: "SECTION A — Study Design",
            label: "Does your study involve participants interacting with virtual objects?",
            description: "(Grabbing, manipulating, using controllers or hand-tracking)"
        },
        {
            id: "usesEyeTracking",
            category: "SECTION A — Study Design",
            label: "Does your study use eye-tracking hardware?",
        },
        {
            id: "hasMultiStreamSensors",
            category: "SECTION A — Study Design",
            label: "Will you record data from more than one sensor stream simultaneously?",
            description: "(e.g., HMD motion + physiological signals, or HMD + eye-tracker)"
        },
        {
            id: "hasSixDofData",
            category: "SECTION A — Study Design",
            label: "Will you record 6DoF head or controller motion data (position + rotation)?",
        },
        {
            id: "usesStandardBatteryInstruments",
            category: "SECTION A — Study Design",
            label: "Will you administer any of the standard battery instruments?",
            description: "(IPQ, SUS, SPES, CSQ-VR, IVBO, VEQ, EQ, SPS, Humanness Index)"
        },
        // SECTION B
        {
            id: "sessionLongerThan30Min",
            category: "SECTION B — Procedural",
            label: "Will any sessions last longer than 30 minutes?",
        },
        {
            id: "isMultiSite",
            category: "SECTION B — Procedural",
            label: "Is this a multi-site or multi-lab study?"
        },
        // SECTION C
        {
            id: "isConfirmatory",
            category: "SECTION C — Ethics & Sharing",
            label: "Is your study confirmatory / hypothesis-driven (as opposed to exploratory)?"
        },
        {
            id: "collectsBiometricData",
            category: "SECTION C — Ethics & Sharing",
            label: "Will you collect biometric or otherwise identifiable data?",
            description: "(e.g., eye movement, physiological signals, facial capture)"
        },
        {
            id: "environmentCodeShareable",
            category: "SECTION C — Ethics & Sharing",
            label: "Is your VR environment code shareable without IP restrictions?"
        },
        {
            id: "participantDataShareable",
            category: "SECTION C — Ethics & Sharing",
            label: "Can your participant data be shared openly (no consent or ethics restrictions)?"
        },
        {
            id: "hasMultipleConditions",
            category: "SECTION C — Ethics & Sharing",
            label: "Does your study use multiple conditions or a longitudinal design?"
        }
    ],
    checklistItems: [
        // BADGE 2
        {
            id: "b2-presence",
            badgeId: "badge2",
            category: "Always Required",
            label: "Presence measure",
            description: "Administer IPQ, SUS (Slater-Usoh-Steed), or SPES. Share raw scores and subscale values.",
            required: true,
        },
        {
            id: "b2-familiarity",
            badgeId: "badge2",
            category: "Always Required",
            label: "VR Familiarity scale",
            description: "Administer the 2-item VR familiarity self-rating (prior experience + frequency of use) and share responses.",
            required: true,
        },
        {
            id: "b2-csqvr",
            badgeId: "badge2",
            category: "Locomotion",
            label: "CSQ-VR cybersickness data",
            description: "Share CSQ-VR scores: Nausea, Disorientation, and Sopite-Related subscales plus total weighted score. Document locomotion type (teleportation / continuous / redirected walking) and researcher comfort rating (Comfortable / Moderate / Intense).",
            required: false,
            conditionalOnFeatureId: "usesArtificialLocomotion"
        },
        {
            id: "b2-embodiment",
            badgeId: "badge2",
            category: "Avatar",
            label: "Body ownership and agency data",
            description: "Share responses from IVBO, VEQ, or EQ (at least one required). Document dominant hand configuration and avatar embodiment setup.",
            required: false,
            conditionalOnFeatureId: "hasVirtualAvatar"
        },
        {
            id: "b2-social",
            badgeId: "badge2",
            category: "Humanoids",
            label: "Social presence data",
            description: "Share SPS (Social Presence Scale) scores. If uncanny valley was assessed, share Humanness Index responses. Document whether humanoids were autonomous, researcher-controlled, or pre-scripted.",
            required: false,
            conditionalOnFeatureId: "hasVirtualHumanoids"
        },
        {
            id: "b2-usability",
            badgeId: "badge2",
            category: "Object Interaction",
            label: "Usability data",
            description: "Share SUS (System Usability Scale) scores. Specify the interaction mode: controller / hand-tracking / gaze / hybrid.",
            required: false,
            conditionalOnFeatureId: "hasObjectInteraction"
        },
        {
            id: "b2-gaze",
            badgeId: "badge2",
            category: "Eye-Tracking",
            label: "Gaze and calibration data",
            description: "Share: calibration quality metric (must be < 1° mean error), fixation data (algorithm: I-DT or I-VT with all parameter values), AOI mapping, dwell-time and saccade extraction outputs. Flag if foveated rendering was active (potential confound).",
            required: false,
            conditionalOnFeatureId: "usesEyeTracking"
        },

        // BADGE 3
        {
            id: "b3-reproduce",
            badgeId: "badge3",
            category: "Always Required",
            label: "Master reproduce script",
            description: "Share a single script (reproduce_all.R or run_pipeline.py) that runs the full analysis pipeline on the shared dataset and reproduces all results reported in the manuscript.",
            required: true,
        },
        {
            id: "b3-exclusions",
            badgeId: "badge3",
            category: "Always Required",
            label: "VR exclusion criteria code",
            description: "Share code implementing exclusion logic for: HMD removal events, virtual boundary breaches, sickness dropout, and tracking loss. Include frame-rate log processing for performance quality checks.",
            required: true,
        },
        {
            id: "b3-sync",
            badgeId: "badge3",
            category: "Multi-Stream Data",
            label: "Timestamp synchronisation code",
            description: "Share code that aligns all sensor streams (HMD motion, eye-tracker, controller events, physiological signals) to a single reference clock with drift correction. Document original sampling rates (Hz) per stream, resampling algorithm used, and anti-aliasing filter applied.",
            required: false,
            conditionalOnFeatureId: "hasMultiStreamSensors"
        },
        {
            id: "b3-motion",
            badgeId: "badge3",
            category: "6DoF Motion",
            label: "Motion cleaning and kinematics pipeline",
            description: "Share code for: position (x, y, z) and rotation (quaternion or Euler) cleaning — including outlier rejection, gap-filling, and coordinate-system transform. Share derived kinematic metrics: angular velocity, path length, sway RMS, with all threshold values stated.",
            required: false,
            conditionalOnFeatureId: "hasSixDofData"
        },
        {
            id: "b3-scoring",
            badgeId: "badge3",
            category: "Instruments",
            label: "Instrument scoring scripts",
            description: "Share scoring scripts for every battery instrument used. At minimum: IPQ subscales (General Presence / Spatial Presence / Involvement / Experienced Realism) with reverse-coded items clearly marked. Apply the same standard to IVBO, VEQ, SPS, Humanness Index, and any other instrument administered.",
            required: false,
            conditionalOnFeatureId: "usesStandardBatteryInstruments"
        },
        {
            id: "b3-csqvr-code",
            badgeId: "badge3",
            category: "Cybersickness / Locomotion",
            label: "CSQ-VR scoring and locomotion parsing code",
            description: "Share code for: CSQ-VR subscale computation (Nausea / Disorientation / Sopite) and total weighted score. If continuous monitoring was used, include onset-timing extraction. Share locomotion parsing code for: teleportation events, speed, path tortuosity, and time-in-zone from engine logs.",
            required: false,
            conditionalOnFeatureId: "usesArtificialLocomotion"
        },
        {
            id: "b3-gaze-pipeline",
            badgeId: "badge3",
            category: "Eye-Tracking",
            label: "Full gaze analysis pipeline",
            description: "Share code for: calibration quality control (< 1° threshold enforcement), fixation detection (I-DT or I-VT with all parameter values stated), AOI mapping, dwell-time and saccade extraction, and foveated-rendering validity check (flagging trials where foveated rendering may have distorted gaze data).",
            required: false,
            conditionalOnFeatureId: "usesEyeTracking"
        }
    ]
};
