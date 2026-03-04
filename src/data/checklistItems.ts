import { ChecklistItem, ProjectProfile } from "./schema";

export type ChecklistItemDefinition = ChecklistItem & {
    condition?: (profile: ProjectProfile) => boolean;
};

export const BADGE_2_ITEMS: ChecklistItemDefinition[] = [
    {
        id: "b2-presence",
        category: "Always Required",
        label: "Presence measure",
        description: "Administer IPQ, SUS (Slater-Usoh-Steed), or SPES. Share raw scores and subscale values.",
        required: true,
    },
    {
        id: "b2-familiarity",
        category: "Always Required",
        label: "VR Familiarity scale",
        description: "Administer the 2-item VR familiarity self-rating (prior experience + frequency of use) and share responses.",
        required: true,
    },
    {
        id: "b2-csqvr",
        category: "Locomotion",
        label: "CSQ-VR cybersickness data",
        description: "Share CSQ-VR scores: Nausea, Disorientation, and Sopite-Related subscales plus total weighted score. Document locomotion type (teleportation / continuous / redirected walking) and researcher comfort rating (Comfortable / Moderate / Intense).",
        required: false,
        condition: (profile) => profile.usesArtificialLocomotion,
    },
    {
        id: "b2-embodiment",
        category: "Avatar",
        label: "Body ownership and agency data",
        description: "Share responses from IVBO, VEQ, or EQ (at least one required). Document dominant hand configuration and avatar embodiment setup.",
        required: false,
        condition: (profile) => profile.hasVirtualAvatar,
    },
    {
        id: "b2-social",
        category: "Humanoids",
        label: "Social presence data",
        description: "Share SPS (Social Presence Scale) scores. If uncanny valley was assessed, share Humanness Index responses. Document whether humanoids were autonomous, researcher-controlled, or pre-scripted.",
        required: false,
        condition: (profile) => profile.hasVirtualHumanoids,
    },
    {
        id: "b2-usability",
        category: "Object Interaction",
        label: "Usability data",
        description: "Share SUS (System Usability Scale) scores. Specify the interaction mode: controller / hand-tracking / gaze / hybrid.",
        required: false,
        condition: (profile) => profile.hasObjectInteraction,
    },
    {
        id: "b2-gaze",
        category: "Eye-Tracking",
        label: "Gaze and calibration data",
        description: "Share: calibration quality metric (must be < 1° mean error), fixation data (algorithm: I-DT or I-VT with all parameter values), AOI mapping, dwell-time and saccade extraction outputs. Flag if foveated rendering was active (potential confound).",
        required: false,
        condition: (profile) => profile.usesEyeTracking,
    },
];

export const BADGE_3_ITEMS: ChecklistItemDefinition[] = [
    {
        id: "b3-reproduce",
        category: "Always Required",
        label: "Master reproduce script",
        description: "Share a single script (reproduce_all.R or run_pipeline.py) that runs the full analysis pipeline on the shared dataset and reproduces all results reported in the manuscript.",
        required: true,
    },
    {
        id: "b3-exclusions",
        category: "Always Required",
        label: "VR exclusion criteria code",
        description: "Share code implementing exclusion logic for: HMD removal events, virtual boundary breaches, sickness dropout, and tracking loss. Include frame-rate log processing for performance quality checks.",
        required: true,
    },
    {
        id: "b3-sync",
        category: "Multi-Stream Data",
        label: "Timestamp synchronisation code",
        description: "Share code that aligns all sensor streams (HMD motion, eye-tracker, controller events, physiological signals) to a single reference clock with drift correction. Document original sampling rates (Hz) per stream, resampling algorithm used, and anti-aliasing filter applied.",
        required: false,
        condition: (profile) => profile.hasMultiStreamSensors,
    },
    {
        id: "b3-motion",
        category: "6DoF Motion",
        label: "Motion cleaning and kinematics pipeline",
        description: "Share code for: position (x, y, z) and rotation (quaternion or Euler) cleaning — including outlier rejection, gap-filling, and coordinate-system transform. Share derived kinematic metrics: angular velocity, path length, sway RMS, with all threshold values stated.",
        required: false,
        condition: (profile) => profile.hasSixDofData,
    },
    {
        id: "b3-scoring",
        category: "Instruments",
        label: "Instrument scoring scripts",
        description: "Share scoring scripts for every battery instrument used. At minimum: IPQ subscales (General Presence / Spatial Presence / Involvement / Experienced Realism) with reverse-coded items clearly marked. Apply the same standard to IVBO, VEQ, SPS, Humanness Index, and any other instrument administered.",
        required: false,
        condition: (profile) => profile.usesStandardBatteryInstruments,
    },
    {
        id: "b3-csqvr-code",
        category: "Cybersickness / Locomotion",
        label: "CSQ-VR scoring and locomotion parsing code",
        description: "Share code for: CSQ-VR subscale computation (Nausea / Disorientation / Sopite) and total weighted score. If continuous monitoring was used, include onset-timing extraction. Share locomotion parsing code for: teleportation events, speed, path tortuosity, and time-in-zone from engine logs.",
        required: false,
        condition: (profile) => profile.usesArtificialLocomotion,
    },
    {
        id: "b3-gaze-pipeline",
        category: "Eye-Tracking",
        label: "Full gaze analysis pipeline",
        description: "Share code for: calibration quality control (< 1° threshold enforcement), fixation detection (I-DT or I-VT with all parameter values stated), AOI mapping, dwell-time and saccade extraction, and foveated-rendering validity check (flagging trials where foveated rendering may have distorted gaze data).",
        required: false,
        condition: (profile) => profile.usesEyeTracking,
    },
];
