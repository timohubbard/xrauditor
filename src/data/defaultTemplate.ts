import { WorkflowTemplate } from "./schema";

export const xrAuditorDefaultTemplate: WorkflowTemplate = {
    templateName: "VR/XR Open Science Framework",
    version: "v.0.62",
    badges: [
        { id: "pillar1", label: "Pillar 1: Interoperability" },
        { id: "pillar2", label: "Pillar 2: Procedural Standardisation" },
        { id: "pillar3", label: "Pillar 3: Data Sharing" },
        { id: "badge_hse", label: "Health, Safety, and Ethics" }
    ],
    features: [
        {
            id: "deviatesFromOpenXR",
            category: "Platform & Infrastructure",
            label: "Are you deviating from OpenXR (e.g. using a different SDK)?",
            badgeId: "pillar1"
        },
        {
            id: "requiresCustomSystems",
            category: "Platform & Infrastructure",
            label: "Do your research designs require more advanced hardware or software beyond what OpenXR provides?",
            badgeId: "pillar1"
        },
        {
            id: "sourcesAssets",
            category: "Platform & Infrastructure",
            label: "Are you sourcing external assets for the project?",
            badgeId: "pillar1"
        },
        {
            id: "usesCustomSimulation",
            category: "Safety & Procedural Setup",
            label: "Did you develop a custom VR simulation?",
            badgeId: "pillar2"
        },
        {
            id: "usesControllers",
            category: "Safety & Procedural Setup",
            label: "Are you using controllers?",
            badgeId: "pillar2"
        },
        {
            id: "usesMotionTracking",
            category: "Safety & Procedural Setup",
            label: "Are you using a motion-tracking system?",
            badgeId: "pillar2"
        },
        {
            id: "runsOnPCVR",
            category: "Safety & Procedural Setup",
            label: "Is the simulation running on a PC or companion computer?",
            badgeId: "pillar2"
        },
        {
            id: "hasAudio",
            category: "Safety & Procedural Setup",
            label: "Is there accompanying audio for participants to listen to?",
            badgeId: "pillar2"
        },
        {
            id: "inducesLocomotion",
            category: "Safety & Procedural Setup",
            label: "Does the study induce locomotion or movement?",
            badgeId: "pillar2"
        },
        {
            id: "hasVirtualBody",
            category: "Safety & Procedural Setup",
            label: "Do participants have a virtual body?",
            badgeId: "pillar2"
        },
        {
            id: "hasVirtualHumanoids",
            category: "Safety & Procedural Setup",
            label: "Are virtual humanoids or animated avatars present?",
            badgeId: "pillar2"
        },
        {
            id: "interactsWithObjects",
            category: "Safety & Procedural Setup",
            label: "Do participants interact with virtual objects?",
            badgeId: "pillar2"
        },
        {
            id: "isOver30Mins",
            category: "Safety & Procedural Setup",
            label: "Do any VR simulation sessions last over 30 minutes?",
            badgeId: "pillar2"
        },
        {
            id: "isSensitiveContent",
            category: "Safety & Procedural Setup",
            label: "Does the simulation involve sensitive or distress-inducing content?",
            badgeId: "pillar2"
        },
        {
            id: "isNotAverageParticipant",
            category: "Safety & Procedural Setup",
            label: "Is the study explicitly focused on a specific subpopulation rather than the average participant?",
            badgeId: "pillar2"
        },
        {
            id: "hasClinicalPopulations",
            category: "Safety & Procedural Setup",
            label: "Is the study specifically targeted as part of a VR study with appropriate clinical expertise?",
            badgeId: "pillar2"
        },
        {
            id: "isCollaborative",
            category: "Ethics, Pre-registration & Data Repositories",
            label: "Is this work collaborative (involving multiple researchers/labs)?",
            badgeId: "pillar3"
        },
        {
            id: "usesVirtualEnvironment",
            category: "Ethics, Pre-registration & Data Repositories",
            label: "Does the simulation use a 3D virtual environment?",
            badgeId: "pillar3"
        },
        {
            id: "uses360Video",
            category: "Ethics, Pre-registration & Data Repositories",
            label: "Does the simulation use 360-degree video?",
            badgeId: "pillar3"
        },
        {
            id: "hasSensitiveData",
            category: "Ethics, Pre-registration & Data Repositories",
            label: "Are there certain variables from data collection that cannot be shared safely?",
            badgeId: "pillar3"
        },
        {
            id: "hasPhysiologicalData",
            category: "Ethics, Pre-registration & Data Repositories",
            label: "Are you collecting additional physiological measures (e.g., body/eye tracking, heart-rate)?",
            badgeId: "pillar3"
        },
        {
            id: "usesPaywalledAnalysis",
            category: "Ethics, Pre-registration & Data Repositories",
            label: "Is the analysis software used behind a paywall (e.g., STATA, SPSS)?",
            badgeId: "pillar3"
        }
    ],
    checklistItems: [
        {
            id: "p1-da-1",
            badgeId: "pillar1",
            category: "Digital Assets",
            label: "Common Formats",
            description: "Digital assets should be in commonly used formats.",
            required: true
        },
        {
            id: "p1-da-2",
            badgeId: "pillar1",
            category: "Digital Assets",
            label: "Common Engines",
            description: "VR simulations should be created in commonly used engines.",
            required: true
        },
        {
            id: "p1-da-3",
            badgeId: "pillar1",
            category: "Digital Assets",
            label: "List Assets in Repository",
            description: "Digital assets for each project have been fully listed in an online repository (e.g., listing what environments were used, the rendering pipeline, the credits for audio files, etc.).",
            required: true
        },
        {
            id: "p1-da-4",
            badgeId: "pillar1",
            category: "Digital Assets",
            label: "Version Numbers",
            description: "Version numbers have been listed for each asset used. This should include versions of the software used to develop and apply custom assets. For example, if a model was created in Blender for use in Unity, the version number of Blender and Unity should also be reported.",
            required: true
        },
        {
            id: "p1-da-5",
            badgeId: "pillar1",
            category: "Digital Assets",
            label: "Asset Characteristics",
            description: "Basic characteristics of digital assets should be listed to identify eligibility for specific VR simulations (e.g., high poly / low poly, material type, animations, etc.).",
            required: true
        },
        {
            id: "p1-da-6",
            badgeId: "pillar1",
            category: "Digital Assets",
            label: "Version Control",
            description: "Version control should be used in projects, and version numbers should be provided for VR simulations. For example, the first study completed from a Unity project could be version 1.0, but then the second study with its modifications could be version 2.0.",
            required: true
        },
        {
            id: "p1-ovr-1",
            badgeId: "pillar1",
            category: "Open VR",
            label: "Implement OpenXR",
            description: "Implement OpenXR in project.",
            required: true
        },
        {
            id: "p1-ovr-2",
            badgeId: "pillar1",
            category: "Open VR",
            label: "List SDK Versions",
            description: "Versions should be listed for OpenXR and any other SDK used. As other technologies arise with a similar architecture to OpenXR, say for audio, researchers should adopt those technologies.",
            required: true
        },
        {
            id: "p1-ovr-devia",
            badgeId: "pillar1",
            category: "Open VR",
            label: "Detail Deviations",
            description: "If deviating from OpenXR, provide the details of what SDK was used and list what headsets the software will run.",
            required: false,
            conditionalOnFeatureId: "deviatesFromOpenXR"
        },
        {
            id: "p1-cust-1",
            badgeId: "pillar1",
            category: "Customized Systems",
            label: "Report Hardware & Software",
            description: "Report the specific hardware and software used in the simulation.",
            required: false,
            conditionalOnFeatureId: "requiresCustomSystems"
        },
        {
            id: "p1-cust-2",
            badgeId: "pillar1",
            category: "Customized Systems",
            label: "Apply Open Science",
            description: "Apply open science principles in highly customized software.",
            required: false,
            conditionalOnFeatureId: "requiresCustomSystems"
        },
        {
            id: "p1-ast-1",
            badgeId: "pillar1",
            category: "Asset Sourcing",
            label: "Repurpose Assets",
            description: "Repurpose assets from previous studies when possible.",
            required: false,
            conditionalOnFeatureId: "sourcesAssets"
        },
        {
            id: "p1-ast-2",
            badgeId: "pillar1",
            category: "Asset Sourcing",
            label: "Review EULAs",
            description: "Review and consider End User License Agreements for the assets. Preference should be given to assets that are available and can be shared for non-commercial applications.",
            required: false,
            conditionalOnFeatureId: "sourcesAssets"
        },
        {
            id: "p1-ast-3",
            badgeId: "pillar1",
            category: "Asset Sourcing",
            label: "Purchase from Reputable Stores",
            description: "Purchase assets from reputable stores (e.g., Unity Asset Store or Unreal Marketplace) to ease the need of future researchers to find the assets for purchase later.",
            required: false,
            conditionalOnFeatureId: "sourcesAssets"
        },
        {
            id: "p2-rep-1",
            badgeId: "pillar2",
            category: "Reporting of VR Procedures",
            label: "Simulation Description",
            description: "Provide a comprehensive description of the simulation used, including its name, version number, and any plug-ins or extensions.",
            required: true
        },
        {
            id: "p2-rep-2",
            badgeId: "pillar2",
            category: "Reporting of VR Procedures",
            label: "Custom Simulation Source Code",
            description: "If a custom simulation was developed, provide the source code or clear instructions for accessing the data repository.",
            required: false,
            conditionalOnFeatureId: "usesCustomSimulation"
        },
        {
            id: "p2-rep-3",
            badgeId: "pillar2",
            category: "Reporting of VR Procedures",
            label: "Trial Length",
            description: "Document the length of each trial or task, including any breaks or pauses in the experiment. Extended periods in VR can contribute to both cognitive fatigue and cybersickness, so this information is crucial for replicability.",
            required: true
        },
        {
            id: "p2-rep-4",
            badgeId: "pillar2",
            category: "Reporting of VR Procedures",
            label: "Simulation Mode & Researcher Involvement",
            description: "Document the simulation mode (e.g., content streaming via link mode or deployment directly on headset) and researcher involvement during the experiment (e.g., manipulating the environment during runtime).",
            required: true
        },
        {
            id: "p2-rep-5",
            badgeId: "pillar2",
            category: "Reporting of VR Procedures",
            label: "Observatory Condition",
            description: "Describe the observatory condition during the experiment (e.g., people present in the room during experiment or the observation of participants via camera or screencast).",
            required: true
        },
        {
            id: "p2-rep-6",
            badgeId: "pillar2",
            category: "Reporting of VR Procedures",
            label: "HMD Details",
            description: "Document the make and model of the head-mounted display, specifying its resolution, field of view, and refresh rate.",
            required: true
        },
        {
            id: "p2-rep-7",
            badgeId: "pillar2",
            category: "Reporting of VR Procedures",
            label: "Controllers Details",
            description: "If applicable, describe the controllers used, including details on their interaction mode.",
            required: false,
            conditionalOnFeatureId: "usesControllers"
        },
        {
            id: "p2-rep-8",
            badgeId: "pillar2",
            category: "Reporting of VR Procedures",
            label: "Motion-tracking System",
            description: "If applicable, describe the motion-tracking system used (e.g., base stations, body markers, motion-tracking gloves).",
            required: false,
            conditionalOnFeatureId: "usesMotionTracking"
        },
        {
            id: "p2-rep-9",
            badgeId: "pillar2",
            category: "Reporting of VR Procedures",
            label: "PC Hardware Specs",
            description: "If applicable, list key hardware specifications of the computer running the VR simulation, particularly the GPU, as it impacts performance and simulation fidelity.",
            required: false,
            conditionalOnFeatureId: "runsOnPCVR"
        },
        {
            id: "p2-rep-10",
            badgeId: "pillar2",
            category: "Reporting of VR Procedures",
            label: "Audio Setup",
            description: "If applicable, list how participants listened to any accompanying audio (e.g., whether headphones are noise canceling or not; audio level used).",
            required: false,
            conditionalOnFeatureId: "hasAudio"
        },
        {
            id: "p2-rep-11",
            badgeId: "pillar2",
            category: "Reporting of VR Procedures",
            label: "Physical Space",
            description: "Provide a detailed description of the room or space used for the study, including dimensions and any relevant physical objects (e.g., furniture or obstacles) that could interact with the VR simulation.",
            required: true
        },
        {
            id: "p2-rep-12",
            badgeId: "pillar2",
            category: "Reporting of VR Procedures",
            label: "Participant Instructions",
            description: "Provide a detailed description of the instructions presented to participants, such as how they engaged with the VR simulation, whether any training or familiarization periods were in place (including their duration), if there were any movement constraints, and when the instructions were communicated (i.e., prior or during simulation).",
            required: true
        },
        {
            id: "p2-rep-13",
            badgeId: "pillar2",
            category: "Reporting of VR Procedures",
            label: "VR Tasks Description",
            description: "Provide a detailed description of the tasks to be performed by participants in the VR simulation (e.g., interacting with confederates, observing a chain of events).",
            required: true
        },
        {
            id: "p2-rep-14",
            badgeId: "pillar2",
            category: "Reporting of VR Procedures",
            label: "Lab Tasks Description",
            description: "Provide a detailed description of the instructions given and tasks performed within the lab while outside of the VR simulation.",
            required: true
        },
        {
            id: "p2-sbm-1",
            badgeId: "pillar2",
            category: "Standard Battery of Measurements",
            label: "Measure Presence",
            description: "Include a measurement of presence (i.e., the feeling of being physically present in the virtually enriched world). Can include self, social, and telepresence. E.g. IPQ, SUS, or SPES.",
            required: true
        },
        {
            id: "p2-sbm-2",
            badgeId: "pillar2",
            category: "Standard Battery of Measurements",
            label: "Measure VR Familiarity",
            description: "Include a measurement of VR familiarity (i.e., the prior exposure participants have had to VR technology). E.g. Self-rated familiarity, 2 items.",
            required: true
        },
        {
            id: "p2-sbm-3",
            badgeId: "pillar2",
            category: "Standard Battery of Measurements",
            label: "Measure Cybersickness",
            description: "If locomotion is induced: Include a measurement of cybersickness (i.e., an experience of nausea, disorientation, and/or oculomotor-issues while using VR). E.g. CSQ-VR.",
            required: false,
            conditionalOnFeatureId: "inducesLocomotion"
        },
        {
            id: "p2-sbm-4",
            badgeId: "pillar2",
            category: "Standard Battery of Measurements",
            label: "Measure Body Ownership and Agency",
            description: "If participants have a virtual body: Include a measurement of body ownership and agency. E.g. IVBO, VEQ, or EQ.",
            required: false,
            conditionalOnFeatureId: "hasVirtualBody"
        },
        {
            id: "p2-sbm-5",
            badgeId: "pillar2",
            category: "Standard Battery of Measurements",
            label: "Measure Social Presence",
            description: "If virtual humanoids are present: Include a measurement of social presence. E.g. Social Presence Scale.",
            required: false,
            conditionalOnFeatureId: "hasVirtualHumanoids"
        },
        {
            id: "p2-sbm-6",
            badgeId: "pillar2",
            category: "Standard Battery of Measurements",
            label: "Measure Uncanny Valley Effect",
            description: "If using animated avatars: Include a measurement of the uncanny valley effect. E.g. Humanness index.",
            required: false,
            conditionalOnFeatureId: "hasVirtualHumanoids"
        },
        {
            id: "p2-sbm-7",
            badgeId: "pillar2",
            category: "Standard Battery of Measurements",
            label: "Measure Usability",
            description: "If participants interact with virtual objects: Include a measurement of usability. E.g. System Usability Scale.",
            required: false,
            conditionalOnFeatureId: "interactsWithObjects"
        },
        {
            id: "p2-eth-1",
            badgeId: "badge_hse",
            originalBadgeId: "pillar2",
            category: "Ethics",
            label: "Informed Consent Limits",
            description: "Ensure participants understand the immersive nature of an VR simulation, including the heightened physical (e.g., cybersickness) and psychological (e.g., emotional distress) impacts that might arise. Provide participants with the ability to withdraw at any time without penalty.",
            required: true
        },
        {
            id: "p2-eth-2",
            badgeId: "badge_hse",
            originalBadgeId: "pillar2",
            category: "Ethics",
            label: "Informed Decision on Data",
            description: "Allow participants to make informed decisions about how their data is collected, stored, and shared, with particular attention to sensitive data like biometric or interaction data.",
            required: true
        },
        {
            id: "p2-eth-3",
            badgeId: "badge_hse",
            originalBadgeId: "pillar2",
            category: "Ethics",
            label: "Privacy Regulations (GDPR)",
            description: "Ensure that all data collection, handling, and storage comply with relevant privacy regulations (e.g., GDPR) to protect participants' personal information.",
            required: true
        },
        {
            id: "p2-eth-4",
            badgeId: "badge_hse",
            originalBadgeId: "pillar2",
            category: "Ethics",
            label: "Robust Encryption",
            description: "Implement robust encryption protocols for all sensitive VR-related data, including biometric, spatial, and interaction data, both in transit and at rest. Use end-to-end encryption when transferring data to external servers or collaborating institutions.",
            required: true
        },
        {
            id: "p2-eth-5",
            badgeId: "badge_hse",
            originalBadgeId: "pillar2",
            category: "Ethics",
            label: "Explicit Data Usage",
            description: "Be explicit about the type of data being collected and the ways in which it will be used, including the potential for long-term storage or reuse of the data in future studies.",
            required: true
        },
        {
            id: "p2-eth-6",
            badgeId: "badge_hse",
            originalBadgeId: "pillar2",
            category: "Ethics",
            label: "IRB Approval",
            description: "Acquire ethical approval from a relevant Institutional Review Board (IRB) or equivalent ethics committee.",
            required: true
        },
        {
            id: "p2-eth-7",
            badgeId: "badge_hse",
            originalBadgeId: "pillar2",
            category: "Ethics",
            label: "Evaluate Emotional Distress",
            description: "Evaluate the potential for VR simulations to create intense emotional responses due to heightened immersion.",
            required: true
        },
        {
            id: "p2-eth-8",
            badgeId: "badge_hse",
            originalBadgeId: "pillar2",
            category: "Ethics",
            label: "Specify Distressing Scenarios",
            description: "Inform participants about the immersive nature of VR and the potential for heightened emotional reactions. Specify any potentially distressing scenarios in the consent forms.",
            required: true
        },
        {
            id: "p2-eth-9",
            badgeId: "badge_hse",
            originalBadgeId: "pillar2",
            category: "Ethics",
            label: "Mitigate Psychological Harm",
            description: "Ensure measures are in place to mitigate any lasting psychological harm.",
            required: true
        },
        {
            id: "p2-eth-10",
            badgeId: "pillar2",
            category: "Ethics",
            label: "Mandatory Debriefing",
            description: "Include mandatory debriefing sessions post-experiment, especially when simulations involve sensitive content that could cause distress.",
            required: false,
            conditionalOnFeatureId: "isSensitiveContent"
        },
        {
            id: "p2-eth-11",
            badgeId: "pillar2",
            category: "Ethics",
            label: "Mental Health Support",
            description: "Provide on-site mental health support, such as access to a counselor or psychologist, for participants who experience emotional distress during or after the VR simulation. Ensure participants are aware of this support option beforehand.",
            required: false,
            conditionalOnFeatureId: "isSensitiveContent"
        },
        {
            id: "p2-eth-12",
            badgeId: "badge_hse",
            originalBadgeId: "pillar2",
            category: "Ethics",
            label: "Respect Personal Space",
            description: "Unless the research question requires otherwise and consent has been acquired, ensure that both the physical and virtual environments respect personal space, avoiding (virtual) humans from invading the participants’ proximity.",
            required: true
        },
        {
            id: "p2-acc-1",
            badgeId: "pillar2",
            category: "Accessibility",
            label: "Design for the Average Participant",
            description: "Design for the average participant: Unless the research question focuses on a specific subpopulation, develop an VR simulation that does not exclude large groups of people (e.g., people without VR and/or gaming experience).",
            required: false,
            conditionalOnFeatureId: "isNotAverageParticipant"
        },
        {
            id: "p2-acc-2",
            badgeId: "pillar2",
            category: "Accessibility",
            label: "Design Beyond Average Participant",
            description: "Design beyond the average participant: Unless the demands of the research question require otherwise, develop an inclusive VR simulation that addresses the needs of as many potential participants.",
            required: true
        },
        {
            id: "p2-acc-3",
            badgeId: "pillar2",
            category: "Accessibility",
            label: "Visual and Audio Cues",
            description: "Supplement visual cues with audio cues, icons, or filters to support participants who are colorblind. Avoid relying solely on color for conveying important information.",
            required: true
        },
        {
            id: "p2-acc-4",
            badgeId: "pillar2",
            category: "Accessibility",
            label: "Adjustable Visibility",
            description: "Allow participants to adjust the size and distance of objects for better visibility and interaction, particularly for participants with vision impairments.",
            required: true
        },
        {
            id: "p2-acc-5",
            badgeId: "pillar2",
            category: "Accessibility",
            label: "Dominant Hand Selection",
            description: "Enable participants to choose their dominant hand within the simulation to accommodate participants who are left-handed.",
            required: true
        },
        {
            id: "p2-acc-6",
            badgeId: "pillar2",
            category: "Accessibility",
            label: "Mobility Options",
            description: "Provide options for hand-tracking or controller-based interactions for participants with limited mobility. If movement within the VR environment is necessary, offer alternatives for seated experiences.",
            required: true
        },
        {
            id: "p2-acc-7",
            badgeId: "pillar2",
            category: "Accessibility",
            label: "Subtitles",
            description: "Include subtitles or closed captions for hearing-impaired participants, while acknowledging that subtitles may induce cybersickness in some cases. Therefore, ensure that this feature can be toggled on or off as needed.",
            required: true
        },
        {
            id: "p2-acc-8",
            badgeId: "pillar2",
            category: "Accessibility",
            label: "Equitable Selection",
            description: "Select participants equitably, without bias related to race, gender, socioeconomic status, or access to VR technology–unless the demands of the research question require otherwise.",
            required: true
        },
        {
            id: "p2-acc-9",
            badgeId: "pillar2",
            category: "Accessibility",
            label: "Simplified Design - Controls",
            description: "Limit the number of buttons or complex input sequences to make the simulation accessible to participants with limited dexterity and/or gaming experience.",
            required: true
        },
        {
            id: "p2-acc-10",
            badgeId: "pillar2",
            category: "Accessibility",
            label: "Simplified Design - Visual Cues",
            description: "Highlight interactable objects and provide visual cues to steer people towards the virtual elements that are important for the study.",
            required: true
        },
        {
            id: "p2-acc-11",
            badgeId: "pillar2",
            category: "Accessibility",
            label: "Simplified Design - Cognitive Load",
            description: "Limit the number of tasks or interactions participants need to manage simultaneously to reduce cognitive load. Break down tasks into smaller steps and offer clear guidance for each part.",
            required: true
        },
        {
            id: "p2-saf-1",
            badgeId: "badge_hse",
            originalBadgeId: "pillar2",
            category: "Safety",
            label: "Hardware Setup",
            description: "Use headsets with 90Hz refresh rates or higher and 6DoF (Six Degrees of Freedom) tracking to reduce latency and improve the user experience, as lower refresh rates may induce cybersickness.",
            required: true
        },
        {
            id: "p2-saf-2",
            badgeId: "badge_hse",
            originalBadgeId: "pillar2",
            category: "Safety",
            label: "IPD Measurement",
            description: "Ensure participants' interpupillary distance (IPD) is measured and set correctly to avoid eye strain and discomfort.",
            required: true
        },
        {
            id: "p2-saf-3",
            badgeId: "badge_hse",
            originalBadgeId: "pillar2",
            category: "Safety",
            label: "Physical Research Space",
            description: "Carefully design the physical research space to eliminate tripping hazards, sharp objects, or any furniture that participants may accidentally collide with while in the VR environment.",
            required: true
        },
        {
            id: "p2-saf-4",
            badgeId: "badge_hse",
            originalBadgeId: "pillar2",
            category: "Safety",
            label: "Virtual Boundary Systems",
            description: "Implement virtual boundary systems (e.g., Oculus Guardian, HTC Chaperone) that alert participants when they approach the edges of the prepared lab space.",
            required: true
        },
        {
            id: "p2-saf-5",
            badgeId: "badge_hse",
            originalBadgeId: "pillar2",
            category: "Safety",
            label: "Emergency Readiness",
            description: "Avoid equipment setups that block exits or walkways. Ensure that participants can quickly remove headsets and evacuate the area in case of emergencies.",
            required: true
        },
        {
            id: "p2-saf-6",
            badgeId: "badge_hse",
            originalBadgeId: "pillar2",
            category: "Safety",
            label: "Participant Observation",
            description: "Avoid leaving ambulatory participants in VR unattended. If maintaining a sense of privacy is a concern, then keep watch over participants through a real-time video feed.",
            required: true
        },
        {
            id: "p2-saf-7",
            badgeId: "badge_hse",
            originalBadgeId: "pillar2",
            category: "Safety",
            label: "Audio Level",
            description: "Set accompanying audio to an acceptable level that will not induce hearing damage.",
            required: true
        },
        {
            id: "p2-saf-8",
            badgeId: "badge_hse",
            originalBadgeId: "pillar2",
            category: "Safety",
            label: "Screen Casting",
            description: "Enable screen casting to monitor participants’ behavior in both the physical and virtual environments, as long as it does not impede participants’ experience.",
            required: true
        },
        {
            id: "p2-saf-9",
            badgeId: "pillar2",
            category: "Safety",
            label: "Breaks for Long Sessions",
            description: "For VR simulations lasting more than 30 minutes, ensure that participants can take breaks. Long uninterrupted sessions may increase the risk of cybersickness and physical strain.",
            required: false,
            conditionalOnFeatureId: "isOver30Mins"
        },
        {
            id: "p2-saf-10",
            badgeId: "badge_hse",
            originalBadgeId: "pillar2",
            category: "Safety",
            label: "Hygiene",
            description: "Clean headsets and controllers regularly with disinfecting wipes for lenses and UV sanitization for the headset and controllers.",
            required: true
        },
        {
            id: "p2-saf-11",
            badgeId: "pillar2",
            category: "Safety",
            label: "Pre-existing Conditions",
            description: "Unless specifically targeted as part of a VR study with appropriate clinical expertise, participants with pre-existing physical and/or psychological conditions or known susceptibilities that could be unwittingly exacerbated by a given VR simulation should be excluded.",
            required: false,
            conditionalOnFeatureId: "hasClinicalPopulations"
        },
        {
            id: "p2-saf-12",
            badgeId: "badge_hse",
            originalBadgeId: "pillar2",
            category: "Safety",
            label: "Locomotion Mode",
            description: "Minimize or avoid using artificial locomotion (e.g., joystick-based movement) in favor of natural locomotion (e.g., walking) to reduce cybersickness. If artificial locomotion is necessary, use slow speeds, short bursts (e.g., teleportation), or blur non-salient regions.",
            required: true
        },
        {
            id: "p2-saf-13",
            badgeId: "badge_hse",
            originalBadgeId: "pillar2",
            category: "Safety",
            label: "Smooth Visual Movements",
            description: "Design VR environments with smooth, predictable visual movements to reduce motion-to-visual conflicts that can cause disorientation or nausea.",
            required: true
        },
        {
            id: "p2-saf-14",
            badgeId: "badge_hse",
            originalBadgeId: "pillar2",
            category: "Safety",
            label: "Gradual Acclimation",
            description: "Allow participants to gradually acclimate to the virtual environment by starting with simple, low-intensity tasks before progressing to more complex or intense experiences.",
            required: true
        },
        {
            id: "p2-saf-15",
            badgeId: "badge_hse",
            originalBadgeId: "pillar2",
            category: "Safety",
            label: "Controls Training",
            description: "Provide instructions and training to help participants adjust to the controls and navigation methods used in the VR simulation.",
            required: true
        },
        {
            id: "p2-saf-16",
            badgeId: "badge_hse",
            originalBadgeId: "pillar2",
            category: "Safety",
            label: "Comfort Rating System",
            description: "Adopt a comfort rating system to categorize the intensity of the VR simulation and inform participants of the expected comfort level beforehand.",
            required: true
        },
        {
            id: "p2-saf-17",
            badgeId: "badge_hse",
            originalBadgeId: "pillar2",
            category: "Safety",
            label: "Rest Space",
            description: "For moderate or intense VR simulations, provide participants with a space to rest after completing the simulation.",
            required: true
        },
        {
            id: "p3-ers-1",
            badgeId: "badge_hse",
            originalBadgeId: "pillar3",
            category: "Ensuring Rights to Share",
            label: "Acquire Rights",
            description: "Acquire the rights to share the VR simulation and its assets free of charge to other scholars.",
            required: true
        },
        {
            id: "p3-ers-2",
            badgeId: "pillar3",
            category: "Ensuring Rights to Share",
            label: "Collaborative Agreement",
            description: "If the work is collaborative, receive a written agreement from those involved to share the VR simulation and assets publicly.",
            required: false,
            conditionalOnFeatureId: "isCollaborative"
        },
        {
            id: "p3-ers-3",
            badgeId: "badge_hse",
            originalBadgeId: "pillar3",
            category: "Ensuring Rights to Share",
            label: "Ethics Variables",
            description: "Ethics approval for the study establishes which variables from the data collection can be shared publicly without violating participants' privacy.",
            required: true
        },
        {
            id: "p3-ufl-1",
            badgeId: "pillar3",
            category: "Uploading Files to Data Repositories",
            label: "Readme File",
            description: "Upload a readme file that describes the contents of the repository",
            required: true
        },
        {
            id: "p3-ufl-2",
            badgeId: "pillar3",
            category: "Uploading Files to Data Repositories",
            label: "Complete VR Simulation",
            description: "Upload the complete VR simulation for other researchers to replicate the study in an identical manner",
            required: true
        },
        {
            id: "p3-ufl-3",
            badgeId: "pillar3",
            category: "Uploading Files to Data Repositories",
            label: "VR Assets",
            description: "Upload VR assets (e.g., individual objects, environments, confederates) for other researchers to recreate and/or repurpose elements of the VR simulation, also if the VR simulation becomes defunct due to new updates.",
            required: true
        },
        {
            id: "p3-ufl-4",
            badgeId: "pillar3",
            category: "Uploading Files to Data Repositories",
            label: "Participant Data Benchmark",
            description: "Upload VR participant data (e.g., measures of presence) for other researchers to use as a benchmark for their own VR research.",
            required: true
        },
        {
            id: "p3-usm-1",
            badgeId: "pillar3",
            category: "Uploading VR Simulations",
            label: "Open Repository",
            description: "Identify a repository where study materials can be shared openly, free of charge, to someone accessing the materials (e.g., GitHub).",
            required: true
        },
        {
            id: "p3-usm-2",
            badgeId: "pillar3",
            category: "Uploading VR Simulations",
            label: "Accessible Format",
            description: "Upload the VR simulation materials in an accessible format (see section on interoperability).",
            required: true
        },
        {
            id: "p3-usm-3",
            badgeId: "pillar3",
            category: "Uploading VR Simulations",
            label: "Virtual Environment Code",
            description: "If your simulation uses a virtual environment, upload the code to run the program.",
            required: false,
            conditionalOnFeatureId: "usesVirtualEnvironment"
        },
        {
            id: "p3-usm-4",
            badgeId: "pillar3",
            category: "Uploading VR Simulations",
            label: "360-degree Metadata",
            description: "If your simulation uses 360-video, ensure to inject 360-degree metadata (e.g., using Spatial Media Metadata Injector) before uploading the video, and use an MP4 (or equivalent) file format.",
            required: false,
            conditionalOnFeatureId: "uses360Video"
        },
        {
            id: "p3-usm-5",
            badgeId: "pillar3",
            category: "Uploading VR Simulations",
            label: "Minimum Files",
            description: "Upload the minimum number of files necessary to directly replicate the study materials, this may include combining multiple files into one before uploading.",
            required: true
        },
        {
            id: "p3-usm-6",
            badgeId: "pillar3",
            category: "Uploading VR Simulations",
            label: "Simplify Operational Requirements",
            description: "Simplify the operational requirements of the VR simulation such that researchers only need to download the simulation and upload it to the hardware they are using.",
            required: true
        },
        {
            id: "p3-usm-7",
            badgeId: "pillar3",
            category: "Uploading VR Simulations",
            label: "Step-by-step Guide",
            description: "Include a “step-by-step” guide in the repository to walk researchers through the process if otherwise necessary.",
            required: true
        },
        {
            id: "p3-usm-8",
            badgeId: "pillar3",
            category: "Uploading VR Simulations",
            label: "Share Repository Link",
            description: "Share the link to the repository in the original communication of the research (e.g., in the methods section and/or data availability statements of the research paper).",
            required: true
        },
        {
            id: "p3-uast-1",
            badgeId: "pillar3",
            category: "Uploading VR Assets",
            label: "Platforms with Exporters",
            description: "Share VR assets on platforms that allow researchers to upload licenses and store assets in different file formats, or provide exporters (e.g. Sketchfab), allowing other researchers to access VR assets and use them in their respective engines with the suitable license.",
            required: true
        },
        {
            id: "p3-upd-1",
            badgeId: "pillar3",
            category: "Uploading VR Participant Data",
            label: "IRB Data Sharing",
            description: "Confirm that all the data can be shared openly without violating IRB protocols.",
            required: true
        },
        {
            id: "p3-upd-2",
            badgeId: "pillar3",
            category: "Uploading VR Participant Data",
            label: "Remove Sensitive Data",
            description: "If certain variables from data collection cannot be shared safely, remove them from the dataset before sharing.",
            required: false,
            conditionalOnFeatureId: "hasSensitiveData"
        },
        {
            id: "p3-upd-3",
            badgeId: "pillar3",
            category: "Uploading VR Participant Data",
            label: "Open Data Repository",
            description: "Identify a repository where data be shared openly free of charge to researchers (e.g., Open Science Framework).",
            required: true
        },
        {
            id: "p3-upd-4",
            badgeId: "pillar3",
            category: "Uploading VR Participant Data",
            label: "Data Labeling and Codebook",
            description: "Label each variable in the dataset clearly and/or upload a codebook for researchers to identify variables.",
            required: true
        },
        {
            id: "p3-upd-5",
            badgeId: "pillar3",
            category: "Uploading VR Participant Data",
            label: "Accessible Data Format",
            description: "Upload the primary data in a widely accessible format (e.g., .csv), avoiding software-specific data formats (e.g., .dta or .rds).",
            required: true
        },
        {
            id: "p3-upd-6",
            badgeId: "pillar3",
            category: "Uploading VR Participant Data",
            label: "Analysis Code Formats",
            description: "Upload the analysis code in the original data format it was used in (e.g., .rmd); if possible, upload the same analysis code in a plain text format (e.g., using the wiki section in OSF) to make it more accessible. This latter step is essential if the analysis software is behind a paywall (e.g., STATA or SPSS).",
            required: false,
            conditionalOnFeatureId: "usesPaywalledAnalysis"
        },
        {
            id: "p3-upd-7",
            badgeId: "pillar3",
            category: "Uploading VR Participant Data",
            label: "Minimum Data Files",
            description: "Upload the minimum amount of data files needed to reproduce the results of the study.",
            required: true
        },
        {
            id: "p3-upd-8",
            badgeId: "pillar3",
            category: "Uploading VR Participant Data",
            label: "Separate Automatic Output",
            description: "If the data set includes automatic output from the VR hardware that is not immediately relevant to the research question (e.g., head orientation or eye fixation data) include this in a separate file.",
            required: true
        },
        {
            id: "p3-upd-9",
            badgeId: "pillar3",
            category: "Uploading VR Participant Data",
            label: "Reproducible Analysis",
            description: "Ensure that a researcher only needs to follow two steps to reproduce the analysis: 1) upload the data into the analysis software, and 2) run the analysis code.",
            required: true
        },
        {
            id: "p3-upd-10",
            badgeId: "pillar3",
            category: "Uploading VR Participant Data",
            label: "Share Repository Link",
            description: "Share a link to the repository in the methods section of the paper and/or data availability statements.",
            required: true
        },
        {
            id: "p3-upd-11",
            badgeId: "pillar3",
            category: "Uploading VR Participant Data",
            label: "Prevent Reidentification",
            description: "In the event additional physiological measures were collected (e.g., body/eye tracking, heart-rate, etc.), prevent combining these data streams with other participant data that could lead to participant reidentification.",
            required: false,
            conditionalOnFeatureId: "hasPhysiologicalData"
        }
    ]
};
