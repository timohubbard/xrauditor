export function slugify(text: string): string {
    if (!text) return "untitled";
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric chars (except spaces and hyphens)
        .replace(/[\s-]+/g, "-"); // Replace spaces and multi-hyphens with a single hyphen
}
