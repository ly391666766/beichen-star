// Public service address only. Never put administrator credentials here.
export const siteConfig = {
  apiBaseUrl: "https://beichen-star-mentors.thu-tme.chatgpt.site",
  adminUrl: "https://beichen-star-mentors.thu-tme.chatgpt.site/admin",
};
export function asset(path: string) { return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`; }
