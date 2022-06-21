import { colors, typography } from "../../themes/index";

const BASE = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: colors.black,
};

const BASE_BOLD = {
  fontFamily: typography.primaryBold,
  color: colors.black,
};

const BOLD = {
  fontFamily: typography.bold,
  color: colors.black,
};

export const presets = {
  default: BASE,
  bold: BOLD,
  h1: {
    ...BOLD,
    fontSize: 32,
  },
  h2: {
    ...BOLD,
    fontSize: 28,
  },
  h3: {
    ...BASE_BOLD,
    fontSize: 24,
  },
  h4: {
    ...BASE_BOLD,
    fontSize: 14,
  },
  small: {
    ...BASE,
    fontSize: 11,
  },
};
