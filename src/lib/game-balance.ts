/**
 * Central gameplay tuning values.
 *
 * Keep values that affect multiple systems here so the UI and APIs do not
 * slowly drift apart while the game is being balanced.
 */
export const STARTING_CREDITS = 750;

/**
 * Ticket templates keep their original design values, but live rewards are
 * scaled down so Credits remain valuable for longer without introducing a
 * hard wallet cap.
 */
export const TICKET_REWARD_MULTIPLIER = 0.6;

/**
 * Choosing the currently under-represented specialist path grants a one-time
 * XP catch-up bonus. XP was chosen instead of Credits so the incentive does
 * not inflate the health/currency economy.
 */
export const IN_DEMAND_CAREER_XP_BONUS = 150;
