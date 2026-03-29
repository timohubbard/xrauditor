"use client";

import { Document, Page, Text, View, StyleSheet, Font, Link } from "@react-pdf/renderer";
import { ProjectJson, BadgeAuditStatus } from "@/data/schema";

// Register custom fonts if needed, otherwise use built-in
// Using Helvetica for standard clean look

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: "Helvetica",
        backgroundColor: "#ffffff",
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: "#0D2B5E",
        paddingBottom: 10,
    },
    title: {
        fontSize: 24,
        color: "#0D2B5E",
        fontWeight: "bold",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 12,
        color: "#4b5563",
    },
    metaSection: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: "#f9fafb",
        borderRadius: 4,
    },
    metaRow: {
        flexDirection: "row",
        marginBottom: 4,
    },
    metaLabel: {
        width: 100,
        fontSize: 10,
        fontWeight: "bold",
        color: "#374151",
    },
    metaValue: {
        flex: 1,
        fontSize: 10,
        color: "#111827",
    },
    summarySection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#0D2B5E",
        marginBottom: 10,
        marginTop: 10,
    },
    badgeSummaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
    },
    badgeName: {
        fontSize: 12,
        fontWeight: "bold",
    },
    badgeStatusPass: {
        fontSize: 10,
        color: "#1A5C36",
        fontWeight: "bold",
    },
    badgeStatusCondPass: {
        fontSize: 10,
        color: "#7A4100",
        fontWeight: "bold",
    },
    badgeStatusFail: {
        fontSize: 10,
        color: "#b91c1c",
        fontWeight: "bold",
    },
    badgeStatusPending: {
        fontSize: 10,
        color: "#6b7280",
        fontWeight: "bold",
    },
    itemGroup: {
        marginBottom: 15,
    },
    itemGroupTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#076977",
        marginBottom: 8,
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#076977",
        paddingBottom: 2,
    },
    itemCard: {
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f3f4f6",
    },
    itemHeaderRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 4,
    },
    itemLabelContainer: {
        flex: 1,
        paddingRight: 10,
    },
    itemLabel: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#111827",
    },
    itemCategory: {
        fontSize: 9,
        color: "#6b7280",
        marginTop: 2,
    },
    itemStatus: {
        fontSize: 10,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    statusYes: { color: "#1A5C36" },
    statusPartial: { color: "#7A4100" },
    statusNo: { color: "#b91c1c" },
    statusNa: { color: "#6b7280" },
    itemDescription: {
        fontSize: 9,
        color: "#4b5563",
        marginTop: 4,
        fontStyle: "italic",
        lineHeight: 1.3,
    },
    itemNotes: {
        marginTop: 6,
        padding: 6,
        backgroundColor: "#fffbeb",
        borderLeftWidth: 2,
        borderLeftColor: "#7A4100",
        fontSize: 9,
        color: "#374151",
        lineHeight: 1.4,
    },
    footer: {
        position: "absolute",
        bottom: 30,
        left: 40,
        right: 40,
        textAlign: "center",
        fontSize: 8,
        color: "#9ca3af",
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
        paddingTop: 10,
    },
});

interface Props {
    data: ProjectJson;
}

const getStatusStyle = (status: BadgeAuditStatus) => {
    switch (status) {
        case "pass": return styles.badgeStatusPass;
        case "conditional_pass": return styles.badgeStatusCondPass;
        case "fail": return styles.badgeStatusFail;
        default: return styles.badgeStatusPending;
    }
};

const getStatusText = (status: BadgeAuditStatus) => {
    switch (status) {
        case "pass": return "PASS";
        case "conditional_pass": return "CONDITIONAL PASS";
        case "fail": return "FAIL";
        default: return "PENDING";
    }
};

const getAnswerStyle = (answer: string) => {
    switch (answer) {
        case "yes": return styles.statusYes;
        case "partial": return styles.statusPartial;
        case "no": return styles.statusNo;
        default: return styles.statusNa;
    }
};

export default function PdfAuditReport({ data }: Props) {
    if (!data.auditResults || !data.workflowTemplate) return null;

    const results = data.auditResults;
    const flatChecklist = data.workflowTemplate.badges.flatMap(b => data.generatedChecklist[b.id] || []);

    const renderBadgeItems = (badgeId: string, badgeLabel: string) => {
        const items = data.generatedChecklist[badgeId] || [];
        if (items.length === 0) return null;

        return (
            <View style={styles.itemGroup} key={badgeId}>
                <Text style={styles.itemGroupTitle}>{badgeLabel}</Text>

                {items.map((item) => {
                    const ans = results.items.find((i) => i.id === item.id);

                    return (
                        <View style={styles.itemCard} key={item.id} wrap={false}>
                            <View style={styles.itemHeaderRow}>
                                <View style={styles.itemLabelContainer}>
                                    <Text style={styles.itemLabel}>{item.label}</Text>
                                    <Text style={styles.itemCategory}>{item.category} {item.required ? "• Required" : "• Conditional"}</Text>
                                </View>
                                {ans && (
                                    <Text style={[styles.itemStatus, getAnswerStyle(ans.answer)]}>
                                        {ans.answer}
                                    </Text>
                                )}
                            </View>
                            <Text style={styles.itemDescription}>{item.description}</Text>

                            {ans?.notes && (
                                <View style={styles.itemNotes}>
                                    <Text>Notes: {ans.notes}</Text>
                                </View>
                            )}
                        </View>
                    );
                })}
            </View>
        );
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>Audit Report</Text>
                    <Text style={styles.subtitle}>{data.workflowTemplate.templateName}</Text>
                </View>

                <View style={styles.metaSection}>
                    <View style={styles.metaRow}>
                        <Text style={styles.metaLabel}>Project Title:</Text>
                        <Text style={styles.metaValue}>{data.projectMeta.projectTitle}</Text>
                    </View>
                    <View style={styles.metaRow}>
                        <Text style={styles.metaLabel}>Researcher:</Text>
                        <Text style={styles.metaValue}>{data.projectMeta.researcherName}</Text>
                    </View>
                    <View style={styles.metaRow}>
                        <Text style={styles.metaLabel}>Institution:</Text>
                        <Text style={styles.metaValue}>{data.projectMeta.institution}</Text>
                    </View>
                    <View style={styles.metaRow}>
                        <Text style={styles.metaLabel}>Audit Date:</Text>
                        <Text style={styles.metaValue}>{new Date(results.auditedAt).toLocaleString()}</Text>
                    </View>
                    <View style={styles.metaRow}>
                        <Text style={styles.metaLabel}>Tool Version:</Text>
                        <Text style={styles.metaValue}>{data.workflowTemplate.version}</Text>
                    </View>
                </View>

                <View style={styles.summarySection}>
                    <Text style={styles.sectionTitle}>Summary Status</Text>
                    {data.workflowTemplate.badges.map((badge) => {
                        if (!data.projectMeta.targetBadges.includes(badge.id)) return null;
                        const status = results.badgeStatuses[badge.id] || "pending";

                        return (
                            <View style={styles.badgeSummaryRow} key={`summary-${badge.id}`}>
                                <Text style={styles.badgeName}>{badge.label}</Text>
                                <Text style={getStatusStyle(status)}>{getStatusText(status)}</Text>
                            </View>
                        );
                    })}
                </View>

                <View>
                    <Text style={styles.sectionTitle}>Detailed Audit</Text>
                    {data.workflowTemplate.badges.map((badge) => {
                        if (!data.projectMeta.targetBadges.includes(badge.id)) return null;
                        return renderBadgeItems(badge.id, badge.label);
                    })}
                </View>

                <Text style={styles.footer} fixed>
                    Generated via the VR/XR Open Science Application Framework ({data.workflowTemplate.version})
                </Text>
            </Page>
        </Document>
    );
}
