"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ProjectJson } from "@/data/schema";

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: "Helvetica",
        backgroundColor: "#ffffff",
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: "#008080", // brand-teal
        paddingBottom: 10,
    },
    title: {
        fontSize: 24,
        color: "#0D2B5E", // brand-navy
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
    itemGroup: {
        marginBottom: 15,
    },
    itemGroupTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#008080",
        marginBottom: 8,
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#008080",
        paddingBottom: 2,
    },
    itemCard: {
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f3f4f6",
        flexDirection: "row",
        alignItems: "flex-start",
    },
    checkbox: {
        width: 12,
        height: 12,
        borderWidth: 1,
        borderColor: "#9ca3af",
        marginRight: 8,
        marginTop: 2,
    },
    itemContent: {
        flex: 1,
    },
    itemLabelContainer: {
        marginBottom: 2,
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
    itemDescription: {
        fontSize: 9,
        color: "#4b5563",
        marginTop: 4,
        fontStyle: "italic",
        lineHeight: 1.3,
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

export default function PdfProjectChecklist({ data }: Props) {
    if (!data.workflowTemplate) return null;

    const renderBadgeItems = (badgeId: string, badgeLabel: string) => {
        const items = data.generatedChecklist[badgeId] || [];
        if (items.length === 0) return null;

        return (
            <View style={styles.itemGroup} key={badgeId}>
                <Text style={styles.itemGroupTitle}>{badgeLabel} Requirements</Text>

                {items.map((item) => {
                    return (
                        <View style={styles.itemCard} key={item.id} wrap={false}>
                            <View style={styles.checkbox}></View>
                            <View style={styles.itemContent}>
                                <View style={styles.itemLabelContainer}>
                                    <Text style={styles.itemLabel}>{item.label}</Text>
                                    <Text style={styles.itemCategory}>{item.category} • {item.required ? "Required" : "Conditional"}</Text>
                                </View>
                                <Text style={styles.itemDescription}>{item.description}</Text>
                            </View>
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
                    <Text style={styles.title}>Project Checklist</Text>
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
                        <Text style={styles.metaLabel}>Generated On:</Text>
                        <Text style={styles.metaValue}>{new Date(data.generatedAt).toLocaleString()}</Text>
                    </View>
                </View>

                <View>
                    {data.workflowTemplate.badges.map((badge) => {
                        if (!data.projectMeta.targetBadges.includes(badge.id)) return null;
                        return renderBadgeItems(badge.id, badge.label);
                    })}
                </View>

                <Text style={styles.footer} fixed>
                    Generated via the VR/XR Open Science Application Framework
                </Text>
            </Page>
        </Document>
    );
}
