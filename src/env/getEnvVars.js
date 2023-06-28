/**
 * Vite environment variables accesor
 * @returns Env Vars
 */
export const getEnvironmentVariables = () => {
  import.meta.env;

  return {
    ...import.meta.env,
  };
};
