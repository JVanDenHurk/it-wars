const MIN_USERNAME_LENGTH = 3;
const MAX_USERNAME_LENGTH = 24;

/*
 * This is deliberately conservative rather than exhaustive. The normalized
 * check also catches simple separator substitutions such as f_u_c_k.
 */
const BLOCKED_USERNAME_TERMS = [
  "admin",
  "administrator",
  "moderator",
  "system",
  "support",
  "itwars",
  "fuck",
  "shit",
  "cunt",
  "bitch",
  "nigger",
  "nigga",
  "faggot",
  "retard",
  "whore",
  "slut",
];

export type UsernameValidationResult =
  | {
      valid: true;
      username: string;
    }
  | {
      valid: false;
      error: string;
    };

function normalizeForModeration(
  username: string
) {
  return username
    .toLowerCase()
    .replace(/0/g, "o")
    .replace(/1/g, "i")
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/5/g, "s")
    .replace(/7/g, "t")
    .replace(/[^a-z0-9]/g, "");
}

export function validateUsername(
  value: string
): UsernameValidationResult {
  const username = value.trim();

  if (
    username.length <
    MIN_USERNAME_LENGTH
  ) {
    return {
      valid: false,
      error:
        "Username must be at least 3 characters.",
    };
  }

  if (
    username.length >
    MAX_USERNAME_LENGTH
  ) {
    return {
      valid: false,
      error:
        "Username must be 24 characters or fewer.",
    };
  }

  if (
    !/^[a-zA-Z0-9_-]+$/.test(
      username
    )
  ) {
    return {
      valid: false,
      error:
        "Username can only contain letters, numbers, underscores and hyphens.",
    };
  }

  const moderated =
    normalizeForModeration(
      username
    );

  if (
    BLOCKED_USERNAME_TERMS.some(
      (term) =>
        moderated.includes(term)
    )
  ) {
    return {
      valid: false,
      error:
        "That username is not allowed. Choose something workplace-friendly.",
    };
  }

  return {
    valid: true,
    username,
  };
}
