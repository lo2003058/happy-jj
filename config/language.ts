// language.ts
export interface Language {
    code: "en" | "fr" | "zh-HK" | "zh-TW" | "zh-CN"
    label: string
}

const languageList: Language[] = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
    { code: "zh-HK", label: "繁體中文 (香港)" },
    { code: "zh-TW", label: "繁體中文 (台灣)" },
    { code: "zh-CN", label: "简体中文" }
]

export default languageList
