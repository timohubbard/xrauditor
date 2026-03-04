import { WorkflowTemplate } from "./schema";

export const xrAuditorDefaultTemplate: WorkflowTemplate = {
    templateName: "VR/XR Open Science Framework",
    version: "2.0.0",
    badges: [
        { id: "pillar1", label: "Pillar 1: Interoperability" },
        { id: "pillar2", label: "Pillar 2: Procedural Standardisation" },
        { id: "pillar3", label: "Pillar 3: Data Sharing" }
    ],
    features: [
        // Pillar 1 Features
        {
            id: "usesStandardEngine",
            category: "Platform & Infrastructure",
            label: "Are you using a standard VR/XR engine (e.g., Unity, Unreal Engine)?",
            badgeId: "pillar1"
        },
        {
            id: "usesCustomEngine",
            category: "Platform & Infrastructure",
            label: "Are you using a custom or proprietary platform instead of a standard engine?",
            badgeId: "pillar1"
        },
        {
            id: "usesExistingAssets",
            category: "Platform & Infrastructure",
            label: "Are you using existing VR assets or environments (e.g., Asset Store, Marketplace)?",
            badgeId: "pillar1"
        },
        {
            id: "createsCustomAssets",
            category: "Platform & Infrastructure",
            label: "Are you creating custom VR assets or environment code for this study?",
            badgeId: "pillar1"
        },
        {
            id: "hasIpBarriers",
            category: "Platform & Infrastructure",
            label: "Do intellectual property (IP) barriers prevent full sharing of the environment?",
            badgeId: "pillar1"
        },

        // Pillar 2 Features
        {
            id: "usesArtificialLocomotion",
            category: "Safety & Procedural Setup",
            label: "Does your study use artificial locomotion (teleportation, continuous, redirected walking)?",
            badgeId: "pillar2"
        },
        {
            id: "sessionLongerThan30Min",
            category: "Safety & Procedural Setup",
            label: "Will any VR sessions last longer than 30 minutes?",
            badgeId: "pillar2"
        },
        {
            id: "includesHumanoids",
            category: "Safety & Procedural Setup",
            label: "Does the study include humanoid avatars or virtual agents?",
            badgeId: "pillar2"
        },
        {
            id: "involvesHighRiskPops",
            category: "Safety & Procedural Setup",
            label: "Does the study involve high-risk populations or clinical samples?",
            badgeId: "pillar2"
        },
        {
            id: "isMultiSite",
            category: "Safety & Procedural Setup",
            label: "Is this a multi-site or multi-lab study?",
            badgeId: "pillar2"
        },

        // Pillar 3 Features
        {
            id: "isConfirmatory",
            category: "Ethics, Pre-registration & Data Repositories",
            label: "Is your study confirmatory / hypothesis-driven (as opposed to exploratory)?",
            badgeId: "pillar3"
        },
        {
            id: "collectsBiometricData",
            category: "Ethics, Pre-registration & Data Repositories",
            label: "Will you collect biometric or otherwise identifiable data (eye movement, physiology, etc.)?",
            badgeId: "pillar3"
        },
        {
            id: "environmentCodeShareable",
            category: "Ethics, Pre-registration & Data Repositories",
            label: "Is your VR environment code shareable without IP restrictions?",
            badgeId: "pillar3"
        },
        {
            id: "participantDataShareable",
            category: "Ethics, Pre-registration & Data Repositories",
            label: "Can your participant data be shared openly (no consent or ethics restrictions)?",
            badgeId: "pillar3"
        },
        {
            id: "hasMultipleConditions",
            category: "Ethics, Pre-registration & Data Repositories",
            label: "Does your study use multiple conditions or a longitudinal design?",
            badgeId: "pillar3"
        }
    ],
    checklistItems: [
        // --- PILLAR 1: INTEROPERABILITY ---
        {
            id: "p1-req-openxr",
            badgeId: "pillar1",
            category: "Core Requirements",
            label: "OpenXR/OpenVR API Compliance",
            description: "All environments must target OpenXR or OpenVR API. Document SDK version.",
            required: true
        },
        {
            id: "p1-req-engine",
            badgeId: "pillar1",
            category: "Core Requirements",
            label: "Engine Version",
            description: "Unity 2022.3 LTS or Unreal Engine 5.x (or later) required for interoperability compliance.",
            required: true
        },
        // Conditional: usesStandardEngine
        {
            id: "p1-std-api",
            badgeId: "pillar1",
            category: "Standard Engine",
            label: "Confirm API Targeting",
            description: "Confirm OpenXR or OpenVR API targeting and document SDK version.",
            required: false,
            conditionalOnFeatureId: "usesStandardEngine"
        },
        {
            id: "p1-std-hw",
            badgeId: "pillar1",
            category: "Standard Engine",
            label: "Verify Hardware Minimum Specs",
            description: "Verify hardware meets minimum spec: 90 Hz+ refresh rate, 6DoF tracking, IPD adjustment, and Guardian/Chaperone virtual boundary support.",
            required: false,
            conditionalOnFeatureId: "usesStandardEngine"
        },
        // Conditional: usesCustomEngine
        {
            id: "p1-cust-doc",
            badgeId: "pillar1",
            category: "Custom Engine",
            label: "Provide Documentation Substitute",
            description: "Full technical spec covering rendering pipeline, tracking system, and API hooks.",
            required: false,
            conditionalOnFeatureId: "usesCustomEngine"
        },
        {
            id: "p1-cust-just",
            badgeId: "pillar1",
            category: "Custom Engine",
            label: "Justify Deviation",
            description: "Justify deviation from standard interoperability guidelines.",
            required: false,
            conditionalOnFeatureId: "usesCustomEngine"
        },
        {
            id: "p1-cust-up",
            badgeId: "pillar1",
            category: "Custom Engine",
            label: "Upload Documentation",
            description: "Upload documentation to OSF or GitHub alongside the project.",
            required: false,
            conditionalOnFeatureId: "usesCustomEngine"
        },
        // Conditional: usesExistingAssets
        {
            id: "p1-ex-eula",
            badgeId: "pillar1",
            category: "Existing Assets",
            label: "Audit Asset EULAs",
            description: "Audit all asset EULAs (Unity Asset Store / Unreal Marketplace / Sketchfab).",
            required: false,
            conditionalOnFeatureId: "usesExistingAssets"
        },
        {
            id: "p1-ex-perm",
            badgeId: "pillar1",
            category: "Existing Assets",
            label: "Confirm Research Use",
            description: "Confirm research use is permitted under each license.",
            required: false,
            conditionalOnFeatureId: "usesExistingAssets"
        },
        {
            id: "p1-ex-exp",
            badgeId: "pillar1",
            category: "Existing Assets",
            label: "Export Open Formats",
            description: "Export assets in open formats (FBX / OBJ / glTF) where possible for shareability.",
            required: false,
            conditionalOnFeatureId: "usesExistingAssets"
        },
        // Conditional: createsCustomAssets
        {
            id: "p1-new-lic",
            badgeId: "pillar1",
            category: "Custom Assets",
            label: "Apply MIT/CC-BY 4.0 License",
            description: "Apply MIT or CC BY 4.0 license to all custom assets and environment code.",
            required: false,
            conditionalOnFeatureId: "createsCustomAssets"
        },
        {
            id: "p1-new-share",
            badgeId: "pillar1",
            category: "Custom Assets",
            label: "Share Open Format",
            description: "Share in open format.",
            required: false,
            conditionalOnFeatureId: "createsCustomAssets"
        },
        {
            id: "p1-new-git",
            badgeId: "pillar1",
            category: "Custom Assets",
            label: "Commit Environment Code",
            description: "Commit environment code to GitHub with semantic versioning before data collection begins.",
            required: false,
            conditionalOnFeatureId: "createsCustomAssets"
        },
        // Conditional: hasIpBarriers
        {
            id: "p1-ip-doc",
            badgeId: "pillar1",
            category: "IP Barriers",
            label: "Provide Documentation Substitute",
            description: "Written description of the environment sufficient to reconstruct it, open placeholder assets, and build instructions.",
            required: false,
            conditionalOnFeatureId: "hasIpBarriers"
        },
        {
            id: "p1-ip-req",
            badgeId: "pillar1",
            category: "IP Barriers",
            label: "Note Restrictions",
            description: "Note all restrictions clearly in the project README and OSF page.",
            required: false,
            conditionalOnFeatureId: "hasIpBarriers"
        },

        // --- PILLAR 2: PROCEDURAL STANDARDISATION ---
        {
            id: "p2-req-screen",
            badgeId: "pillar2",
            category: "Core Requirements",
            label: "Contraindication Screening",
            description: "Screen all participants for epilepsy, vestibular disorders, severe motion sickness, and pregnancy before participation.",
            required: true
        },
        {
            id: "p2-req-batt",
            badgeId: "pillar2",
            category: "Core Requirements",
            label: "Standard Battery",
            description: "Administer a presence measure (IPQ, SUS Slater-Usoh-Steed, or SPES) plus a VR Familiarity 2-item scale in every study.",
            required: true
        },
        // Conditional: usesArtificialLocomotion
        {
            id: "p2-loc-csq",
            badgeId: "pillar2",
            category: "Artificial Locomotion",
            label: "Administer CSQ-VR",
            description: "Administer CSQ-VR (Cybersickness Questionnaire for VR) before and after the session, capturing Nausea, Disorientation, and Sopite subscales.",
            required: false,
            conditionalOnFeatureId: "usesArtificialLocomotion"
        },
        {
            id: "p2-loc-log",
            badgeId: "pillar2",
            category: "Artificial Locomotion",
            label: "Log Locomotion Type",
            description: "Log the locomotion type used (teleportation / continuous / redirected walking).",
            required: false,
            conditionalOnFeatureId: "usesArtificialLocomotion"
        },
        {
            id: "p2-loc-rate",
            badgeId: "pillar2",
            category: "Artificial Locomotion",
            label: "Rate Comfort Level",
            description: "Researcher rates comfort level (Comfortable / Moderate / Intense) at 5-minute intervals.",
            required: false,
            conditionalOnFeatureId: "usesArtificialLocomotion"
        },
        // Conditional: sessionLongerThan30Min
        {
            id: "p2-time-break",
            badgeId: "pillar2",
            category: "Long Sessions",
            label: "Mandatory Breaks",
            description: "Schedule mandatory breaks every 20–30 minutes.",
            required: false,
            conditionalOnFeatureId: "sessionLongerThan30Min"
        },
        {
            id: "p2-time-csq",
            badgeId: "pillar2",
            category: "Long Sessions",
            label: "Re-administer CSQ-VR",
            description: "Re-administer CSQ-VR after each break.",
            required: false,
            conditionalOnFeatureId: "sessionLongerThan30Min"
        },
        {
            id: "p2-time-mon",
            badgeId: "pillar2",
            category: "Long Sessions",
            label: "Monitor Discomfort",
            description: "Researcher monitors for signs of discomfort: pallor, sweating, postural instability.",
            required: false,
            conditionalOnFeatureId: "sessionLongerThan30Min"
        },
        {
            id: "p2-time-log",
            badgeId: "pillar2",
            category: "Long Sessions",
            label: "Document Breaks",
            description: "Document break timing and any adverse events in the session log.",
            required: false,
            conditionalOnFeatureId: "sessionLongerThan30Min"
        },
        // Conditional: includesHumanoids
        {
            id: "p2-hum-idx",
            badgeId: "pillar2",
            category: "Humanoid Avatars",
            label: "Humanness Index",
            description: "Measure the Humanness Index if photorealistic humanoids are used (uncanny valley assessment).",
            required: false,
            conditionalOnFeatureId: "includesHumanoids"
        },
        {
            id: "p2-hum-doc",
            badgeId: "pillar2",
            category: "Humanoid Avatars",
            label: "Document Avatar Type",
            description: "Document avatar type: pre-scripted / researcher-controlled / autonomous.",
            required: false,
            conditionalOnFeatureId: "includesHumanoids"
        },
        {
            id: "p2-hum-sps",
            badgeId: "pillar2",
            category: "Humanoid Avatars",
            label: "Social Presence Scale",
            description: "Add SPS (Social Presence Scale) to the measurement battery.",
            required: false,
            conditionalOnFeatureId: "includesHumanoids"
        },
        // Conditional: involvesHighRiskPops
        {
            id: "p2-risk-check",
            badgeId: "pillar2",
            category: "High-Risk Populations",
            label: "Enhanced Contraindication Checklist",
            description: "Use an enhanced contraindication checklist with researcher sign-off.",
            required: false,
            conditionalOnFeatureId: "involvesHighRiskPops"
        },
        {
            id: "p2-risk-clin",
            badgeId: "pillar2",
            category: "High-Risk Populations",
            label: "Clinician On-Call",
            description: "Have a clinician on-call if recruiting mental health populations.",
            required: false,
            conditionalOnFeatureId: "involvesHighRiskPops"
        },
        {
            id: "p2-risk-dur",
            badgeId: "pillar2",
            category: "High-Risk Populations",
            label: "Limit Session Duration",
            description: "Lower the session duration limit to 20 minutes.",
            required: false,
            conditionalOnFeatureId: "involvesHighRiskPops"
        },
        {
            id: "p2-risk-stop",
            badgeId: "pillar2",
            category: "High-Risk Populations",
            label: "Pre-define Stopping Rules",
            description: "Pre-define stopping rules and a debrief protocol for adverse events.",
            required: false,
            conditionalOnFeatureId: "involvesHighRiskPops"
        },
        // Conditional: isMultiSite
        {
            id: "p2-site-hmd",
            badgeId: "pillar2",
            category: "Multi-site Studies",
            label: "Identical HMD Model",
            description: "Use identical HMD model across all sites where possible.",
            required: false,
            conditionalOnFeatureId: "isMultiSite"
        },
        {
            id: "p2-site-doc",
            badgeId: "pillar2",
            category: "Multi-site Studies",
            label: "Document HMD Differences",
            description: "If different HMDs must be used, document for each site: model, IPD range, tracking type, and refresh rate.",
            required: false,
            conditionalOnFeatureId: "isMultiSite"
        },
        {
            id: "p2-site-share",
            badgeId: "pillar2",
            category: "Multi-site Studies",
            label: "Share Setup Checklist",
            description: "Share a setup checklist and video walkthrough with each lab.",
            required: false,
            conditionalOnFeatureId: "isMultiSite"
        },
        {
            id: "p2-site-pilot",
            badgeId: "pillar2",
            category: "Multi-site Studies",
            label: "Run Pilot and Share Data",
            description: "Run a pilot and share pilot data across labs before full data collection begins.",
            required: false,
            conditionalOnFeatureId: "isMultiSite"
        },

        // --- PILLAR 3: ETHICS, PRE-REGISTRATION & DATA REPOSITORIES ---
        {
            id: "p3-req-ethic",
            badgeId: "pillar3",
            category: "Core Requirements",
            label: "Ethics Approval",
            description: "Obtain IRB/REC approval before data collection. Include a VR-specific risk section in the ethics application covering cybersickness, adverse events, and biometric data handling.",
            required: true
        },
        {
            id: "p3-req-repo",
            badgeId: "pillar3",
            category: "Core Requirements",
            label: "Repository Setup",
            description: "Create an OSF project page and a GitHub repo before data collection and link both in the ethics application.",
            required: true
        },
        // Conditional: isConfirmatory
        {
            id: "p3-conf-reg",
            badgeId: "pillar3",
            category: "Confirmatory Studies",
            label: "Pre-register Study",
            description: "Pre-register on OSF Registries or AsPredicted before data collection begins.",
            required: false,
            conditionalOnFeatureId: "isConfirmatory"
        },
        {
            id: "p3-conf-inc",
            badgeId: "pillar3",
            category: "Confirmatory Studies",
            label: "Pre-registration Inclusions",
            description: "Must include: Hypotheses, Study design, Sample size justification, Analysis plan, VR-specific exclusion criteria (HMD removal, boundary breach, sickness dropout, tracking loss).",
            required: false,
            conditionalOnFeatureId: "isConfirmatory"
        },
        // Conditional: collectsBiometricData
        {
            id: "p3-bio-cons",
            badgeId: "pillar3",
            category: "Biometric Data",
            label: "Consent Covers Biometrics",
            description: "Ensure the consent form explicitly covers biometric data use.",
            required: false,
            conditionalOnFeatureId: "collectsBiometricData"
        },
        {
            id: "p3-bio-anon",
            badgeId: "pillar3",
            category: "Biometric Data",
            label: "Anonymise Data",
            description: "Anonymise or pseudonymise all data before archiving.",
            required: false,
            conditionalOnFeatureId: "collectsBiometricData"
        },
        {
            id: "p3-bio-repo",
            badgeId: "pillar3",
            category: "Biometric Data",
            label: "Controlled-access Repository",
            description: "Use a controlled-access repository: OSF controlled access or Zenodo restricted record.",
            required: false,
            conditionalOnFeatureId: "collectsBiometricData"
        },
        {
            id: "p3-bio-dua",
            badgeId: "pillar3",
            category: "Biometric Data",
            label: "Data Use Agreement",
            description: "State Data Use Agreement (DUA) requirements clearly in the repository README.",
            required: false,
            conditionalOnFeatureId: "collectsBiometricData"
        },
        {
            id: "p3-bio-comp",
            badgeId: "pillar3",
            category: "Biometric Data",
            label: "Compliance",
            description: "Ensure compliance with GDPR (EU) and/or HIPAA (US) as applicable.",
            required: false,
            conditionalOnFeatureId: "collectsBiometricData"
        },
        // Conditional: environmentCodeShareable
        {
            id: "p3-code-git",
            badgeId: "pillar3",
            category: "Shareable Code",
            label: "Commit Environment Code",
            description: "Commit the environment code to GitHub before data collection.",
            required: false,
            conditionalOnFeatureId: "environmentCodeShareable"
        },
        {
            id: "p3-code-tag",
            badgeId: "pillar3",
            category: "Shareable Code",
            label: "Tag Release Version",
            description: "Tag the release version used in the study (e.g., v1.0.0-datacollection).",
            required: false,
            conditionalOnFeatureId: "environmentCodeShareable"
        },
        {
            id: "p3-code-inc",
            badgeId: "pillar3",
            category: "Shareable Code",
            label: "Repository Inclusions",
            description: "Include in the repository: Build instructions, Full asset list, Engine version, SDK versions, Researcher setup notes.",
            required: false,
            conditionalOnFeatureId: "environmentCodeShareable"
        },
        // Conditional: participantDataShareable
        {
            id: "p3-data-up",
            badgeId: "pillar3",
            category: "Shareable Data",
            label: "Upload De-identified Dataset",
            description: "Upload the de-identified dataset with a codebook to OSF under CC BY 4.0 license.",
            required: false,
            conditionalOnFeatureId: "participantDataShareable"
        },
        {
            id: "p3-data-def",
            badgeId: "pillar3",
            category: "Shareable Data",
            label: "Codebook Definitions",
            description: "The codebook must define: Variable names and units, Sampling rates, Instrument subscales, VR-specific fields: HMD model, tracking type, locomotion method.",
            required: false,
            conditionalOnFeatureId: "participantDataShareable"
        },
        // Conditional: hasMultipleConditions
        {
            id: "p3-cond-lock",
            badgeId: "pillar3",
            category: "Multiple Conditions",
            label: "Lock Environment Code",
            description: "Lock the environment code version before the first condition runs.",
            required: false,
            conditionalOnFeatureId: "hasMultipleConditions"
        },
        {
            id: "p3-cond-doc",
            badgeId: "pillar3",
            category: "Multiple Conditions",
            label: "Document Patches",
            description: "Document any patch or hotfix applied mid-study with a written rationale.",
            required: false,
            conditionalOnFeatureId: "hasMultipleConditions"
        },
        {
            id: "p3-cond-name",
            badgeId: "pillar3",
            category: "Multiple Conditions",
            label: "Pre-define Naming Convention",
            description: "Pre-define the folder and file naming convention in the OSF project wiki before the first data collection session.",
            required: false,
            conditionalOnFeatureId: "hasMultipleConditions"
        }
    ]
};
