export const CompletionModel = {
  GPT_3_5_TURBO_1106: "gpt-3.5-turbo-1106",
  GPT_3_5_TURBO: "gpt-3.5-turbo",
  GPT_3_5_TURBO_16K: "gpt-3.5-turbo-16k",
  GPT_3_5_TURBO_INSTRUCT: "gpt-3.5-turbo-instruct",
  GPT_3_5_TURBO_0613: "gpt-3.5-turbo-0613",
  GPT_3_5_TURBO_16K_0613: "gpt-3.5-turbo-16k-0613",
  GPT_3_5_TURBO_0301: "gpt-3.5-turbo-0301",
  GPT_4_1106_PREVIEW: "gpt-4-1106-preview",
  NEW_GPT_4_TURBO: "New GPT-4 Turbo",
  GPT_4_VISION_PREVIEW: "gpt-4-vision-preview",
  GPT_4: "gpt-4",
  GPT_4_32K: "gpt-4-32k",
  GPT_4_0613: "gpt-4-0613",
  GPT_4_32K_0613: "gpt-4-32k-0613",
} as const;
export type CompletionModel =
  (typeof CompletionModel)[keyof typeof CompletionModel];

export const ImageModel = {
  DALL_E_2: "dall-e-2",
  DALL_E_3: "dall-e-3",
} as const;
export type ImageModel = (typeof ImageModel)[keyof typeof ImageModel];

export const Resolution = {
  SQUARE: "1024x1024",
  PORTRAIT: "1024x1792",
  LANDSCAPE: "1792x1024",
} as const;
export type Resolution = (typeof Resolution)[keyof typeof Resolution];

export const VoiceModel = {
  TTS_1: "tts-1",
  TTS_1_HD: "tts-1-hd",
} as const;
export type VoiceModel = (typeof VoiceModel)[keyof typeof VoiceModel];

export const Voice = {
  ALLOY: "alloy",
  ECHO: "echo",
  FABLE: "fable",
  ONYX: "onyx",
  NOVA: "nova",
  SHIMMER: "shimmer",
} as const;
export type Voice = (typeof Voice)[keyof typeof Voice];

export const Method = {
  Completion: "Completion",
  Image: "Image",
  TTS: "Text to Speech",
} as const;
export type Method = (typeof Method)[keyof typeof Method];

export const Tokens = {
  TEN: "10",
  FIFTY: "50",
  HUNDRED: "100"
} as const;
export type Tokens = (typeof Tokens)[keyof typeof Tokens];