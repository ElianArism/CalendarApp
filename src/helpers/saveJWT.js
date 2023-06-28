export const saveJWT = (jwt) => {
  localStorage.setItem("x-token", jwt);
  localStorage.setItem("x-token-start-date", new Date().getTime());
};
