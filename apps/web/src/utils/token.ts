const TOKEN_NAME = "access_token";

export const token = {
  get() {
    return sessionStorage[TOKEN_NAME] || null;
  },

  set(token: string) {
    sessionStorage[TOKEN_NAME] = token;
  },

  remove() {
    delete sessionStorage[TOKEN_NAME];
  },
};
