# 辛泽玮个人学术主页

一个中英双语、无框架的静态学术主页。页面只使用 HTML、CSS 和少量原生 JavaScript；无在线字体、动画库、背景视频或运行时接口请求，适合部署到 GitHub Pages。

## 本地预览

在本目录执行：

```powershell
python -m http.server 8000 -d dist
```

访问 `http://localhost:8000/`。使用本地服务器预览，不要以双击 HTML 文件的方式作为最终检查。

## 文件结构

```text
dist/
├─ index.html                  # 全部中英文内容与论文条目
├─ styles.css                 # 页面布局、配色与响应式规则
├─ script.js                  # 中英文、主题切换和年份
└─ assets/
   ├─ images/                 # 头像、校徽与论文缩略图
   └─ documents/              # 简历 PDF
```

仓库根目录中还包括：

```text
.github/workflows/deploy-pages.yml  # GitHub Pages 自动部署
.gitignore                          # 排除系统和编辑器临时文件
docs/GITHUB_PROFILE_README.md       # 可选：用于 seelexia/seelexia 个人资料仓库
README.md                           # 项目维护说明
```

## 上传范围

建议提交到 `seelexia/seelexia.github.io` 仓库：

- `.github/`
- `dist/`
- `.gitignore`
- `README.md`

`docs/GITHUB_PROFILE_README.md` 可以一并提交作为备份，但它不会出现在网页中；若要显示在 GitHub 个人资料首页，应将其内容复制到单独的 `seelexia/seelexia` 仓库的 `README.md`。

不要提交论文原始 PDF、LaTeX 中间文件、未使用的校徽版本、截图、临时目录、编辑器配置或账号密钥。GitHub Pages 工作流只发布 `dist/`，因此仓库中的 `README.md`、`docs/` 和工作流不会成为网站页面。

## 中英文内容如何维护

同一段内容以两个相邻元素保存：

```html
<span class="lang-zh">中文内容</span>
<span class="lang-en">English content</span>
```

段落也使用相同方式：

```html
<p class="lang-zh">中文段落。</p>
<p class="lang-en">English paragraph.</p>
```

右上角按钮会切换 `<html data-lang="zh|en">`，并把选择保存在浏览器本地。新增内容时必须同时补齐两个语言版本；论文题目、作者、会议名和代码链接不需要重复。

## 新增一篇论文

1. 把方法图压缩为 PNG 或 WebP，放进 `dist/assets/images/`。建议宽度 800–1200 px、文件小于 250 KB。
2. 优先添加出版社、DOI 或 arXiv 外链，不在主页仓库中存放论文 PDF。
3. 在 `dist/index.html` 的 `.publication-list` 中复制一个 `.paper` 条目。
4. 更新 venue、题目、完整作者顺序、中英文一句话简介，以及 Paper / arXiv / Code 链接。
5. 在 Google Scholar 中同步新增成果。

## 首次上传到 GitHub Pages

GitHub 用户名为 `seelexia`，个人主页仓库应为：

```text
https://github.com/seelexia/seelexia.github.io
```

如果远端仓库已有内容，不要强制推送。先克隆到新目录，在克隆目录中备份或移除旧网页文件，再复制本项目的 `.github`、`dist`、`docs`、`.gitignore` 和 `README.md`，最后提交：

```powershell
git clone https://github.com/seelexia/seelexia.github.io.git
cd seelexia.github.io
git switch -c redesign-2026
git add .
git commit -m "Redesign bilingual academic homepage"
git push -u origin redesign-2026
```

然后在 GitHub 创建从 `redesign-2026` 到默认分支的 Pull Request，核对文件变化后合并。合并后：

1. 进入仓库 `Settings → Pages`。
2. 将 `Build and deployment → Source` 设为 `GitHub Actions`。
3. 等待 `Deploy static site to GitHub Pages` 工作流完成。
4. 访问 `https://seelexia.github.io/`。

> 当前工作区尚未初始化为 Git 仓库，也没有替你向 GitHub 推送；这样可以避免覆盖现有主页。`.github/workflows/deploy-pages.yml` 已经准备好自动部署 `dist`。

如果远端仓库是全新空仓库，也可以直接在当前目录初始化：

```powershell
cd D:\实习\个人主页
git init
git branch -M main
git remote add origin https://github.com/seelexia/seelexia.github.io.git
git add .github dist docs .gitignore README.md
git status
git commit -m "Create bilingual academic homepage"
git push -u origin main
```

推送后进入仓库的 `Settings → Pages`，将 `Build and deployment → Source` 设为 `GitHub Actions`。随后在 `Actions` 页打开 `Deploy static site to GitHub Pages`，等待绿色对勾；个人主页地址为 `https://seelexia.github.io/`。

## 后续更新

每次修改后：

```powershell
git add .
git commit -m "Update publications and profile"
git push
```

建议维护节奏：

- 论文接收或公开后：补全正式 venue、作者顺序、DOI/arXiv、代码与项目页。
- 每学期：更新教育状态、在校经历、教学、奖项和简历。
- 更换简历时尽量保留 `resume-cn-new.pdf` 文件名，避免外部链接失效。
- 图片导出后先压缩；不要加入视频背景、在线字体包和大型前端框架。
- 每次更新后检查中文、英文、浅色/深色主题、手机端，以及所有外链和简历 PDF。

## 目前仍缺少的公开资料

- 英文 CV。
- 导师、实验室或课题组名称及其链接。
- ORCID、学校官方个人页（如果已经开通）。
- PixARG 和 RouteT2I 的公开代码或项目主页。
- 学术报告、评审服务、专利、竞赛和更完整的奖项记录。
- 可公开的实习成果或开源演示；涉及保密内容不要写入主页。

## 发布前隐私检查

本站会公开头像和中文简历。提交前请确认简历中的电话、私人邮箱适合公开，并确认实习/合作项目不受保密协议限制。
