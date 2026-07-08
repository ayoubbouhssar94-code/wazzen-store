export type NormalizedPhone = {
  local: string;
  e164: string;
  digits: string;
};

const KSA_REGEX_05 = /^05\d{8}$/;
const KSA_REGEX_5 = /^5\d{8}$/;
const KSA_REGEX_966 = /^9665\d{8}$/;
const KSA_REGEX_PLUS966 = /^\+9665\d{8}$/;

export function normalizeKSAPhone(raw: string): NormalizedPhone | null {
  const cleaned = raw.replace(/[\s\-\(\)]/g, "").trim();

  let core: string | null = null;

  if (KSA_REGEX_PLUS966.test(cleaned)) {
    core = cleaned.slice(-9);
  } else if (KSA_REGEX_966.test(cleaned)) {
    core = cleaned.slice(-9);
  } else if (KSA_REGEX_05.test(cleaned)) {
    core = cleaned.slice(1);
  } else if (KSA_REGEX_5.test(cleaned)) {
    core = cleaned;
  }

  if (!core) return null;

  return {
    local: `0${core}`,
    e164: `+966${core}`,
    digits: `966${core}`,
  };
}

export function isValidKSAPhone(raw: string): boolean {
  return normalizeKSAPhone(raw) !== null;
}
