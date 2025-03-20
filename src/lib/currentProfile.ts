export const currentProfile = () => {
  if (typeof window !== "undefined") {
    return { profile: localStorage.getItem("auth") || null };
  }
  return { profile: null };
};
