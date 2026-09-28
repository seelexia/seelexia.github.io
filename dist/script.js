const root = document.documentElement;
const languageSwitch = document.querySelector("[data-language-switch]");
const languageLabel = document.querySelector("[data-language-label]");
const themeSwitch = document.querySelector("[data-theme-switch]");
const themeIcon = document.querySelector("[data-theme-icon]");
const themeLabel = document.querySelector("[data-theme-label]");
const themeColor = document.querySelector("#theme-color");
const year = document.querySelector("[data-year]");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const themeOrder = ["system", "light", "dark"];

function readPreference(key) {
  try {
    return localStorage.getItem(key);
  } catch (_) {
    return null;
  }
}

function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (_) {}
}

function effectiveTheme(theme) {
  return theme === "system" ? (systemTheme.matches ? "dark" : "light") : theme;
}

function themeText(theme, language) {
  const names = {
    zh: { system: "跟随系统", light: "浅色", dark: "深色" },
    en: { system: "System", light: "Light", dark: "Dark" }
  };
  return language === "en" ? `Theme: ${names.en[theme]}` : `主题：${names.zh[theme]}`;
}

function updateThemeControl() {
  const theme = themeOrder.includes(root.dataset.theme) ? root.dataset.theme : "system";
  const label = themeText(theme, root.dataset.lang);
  themeSwitch.setAttribute("aria-label", label);
  themeSwitch.title = label;
  themeLabel.textContent = label;
  themeIcon.setAttribute("href", `#icon-${theme === "system" ? "monitor" : theme === "light" ? "sun" : "moon"}`);
  themeColor.content = effectiveTheme(theme) === "dark" ? "#11161c" : "#ffffff";
}

function setTheme(theme) {
  const next = themeOrder.includes(theme) ? theme : "system";
  root.dataset.theme = next;
  savePreference("preferred-theme", next);
  updateThemeControl();
}

function setLanguage(language) {
  const next = language === "en" ? "en" : "zh";
  root.dataset.lang = next;
  root.lang = next === "zh" ? "zh-CN" : "en";
  languageLabel.textContent = next === "zh" ? "EN" : "中文";
  languageSwitch.setAttribute("aria-label", next === "zh" ? "Switch to English" : "切换到中文");
  document.title = next === "zh" ? "辛泽玮 · Zewei Xin" : "Zewei Xin · Academic Homepage";
  savePreference("preferred-language", next);
  updateThemeControl();
}

const savedLanguage = readPreference("preferred-language");
const browserLanguage = navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
setTheme(readPreference("preferred-theme") || root.dataset.theme || "system");
setLanguage(savedLanguage || browserLanguage);

languageSwitch.addEventListener("click", () => setLanguage(root.dataset.lang === "zh" ? "en" : "zh"));
themeSwitch.addEventListener("click", () => {
  const currentIndex = themeOrder.indexOf(root.dataset.theme);
  setTheme(themeOrder[(currentIndex + 1) % themeOrder.length]);
});
systemTheme.addEventListener?.("change", updateThemeControl);
year.textContent = new Date().getFullYear();
