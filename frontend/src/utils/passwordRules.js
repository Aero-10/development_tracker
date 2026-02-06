export const passwordRules = [
  {
    label: "At least 8 characters",
    test: (pwd) => pwd.length >= 8
  },
  {
    label: "One uppercase letter",
    test: (pwd) => /[A-Z]/.test(pwd)
  },
  {
    label: "One lowercase letter",
    test: (pwd) => /[a-z]/.test(pwd)
  },
  {
    label: "One number",
    test: (pwd) => /[0-9]/.test(pwd)
  },
  {
    label: "One special character",
    test: (pwd) => /[^A-Za-z0-9]/.test(pwd)
  },
  {
    label: "No spaces",
    test: (pwd) => !/\s/.test(pwd)
  }
];

export const isPasswordValid = (password) =>
  passwordRules.every(rule => rule.test(password));
