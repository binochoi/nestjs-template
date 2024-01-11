const socialProvider = {
  GOOGLE: 1,
  NAVER: 2,
} as const;
export type SocialProviderKey = keyof typeof socialProvider;
export type SocialProviderValue = (typeof socialProvider)[keyof typeof socialProvider];
export type SocialProvider = SocialProviderValue;
export {
  socialProvider,
};
