// lib/cooldownService.ts
// Tracks submission cooldowns per email+phone combo to prevent spam.
// In-memory store with 1-hour window per unique email+phone combination.

const cooldowns = new Map<string, number>();

function getCooldownKey(email: string, phone: string): string {
    return `${email.toLowerCase()}:${phone.replace(/\s/g, '')}`;
}

export function getRemainingSecs(email: string, phone: string): number {
    const key = getCooldownKey(email, phone);
    const lastSubmitTime = cooldowns.get(key);
    if (!lastSubmitTime) return 0;

    const elapsed = Date.now() - lastSubmitTime;
    const remaining = 3600000 - elapsed; // 1 hour = 3600000ms
    return Math.max(0, Math.ceil(remaining / 1000));
}

export function isUnderCooldown(email: string, phone: string): boolean {
    return getRemainingSecs(email, phone) > 0;
}

export function recordSubmission(email: string, phone: string): void {
    const key = getCooldownKey(email, phone);
    cooldowns.set(key, Date.now());
}

/** Cleanup old entries (older than 2 hours) to prevent memory leak. */
function cleanupOldEntries(): void {
    const now = Date.now();
    const maxAge = 2 * 3600000; // 2 hours
    for (const [key, timestamp] of cooldowns) {
        if (now - timestamp > maxAge) {
            cooldowns.delete(key);
        }
    }
}

// Cleanup every 30 minutes
setInterval(cleanupOldEntries, 30 * 60 * 1000);

