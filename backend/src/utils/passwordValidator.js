export const isPasswordValid = (password) => {
  if (typeof password !== "string") return false;

  const rules = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
    !/\s/.test(password),
  ];

  return rules.every(Boolean);
};
