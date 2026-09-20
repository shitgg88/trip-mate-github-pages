# 旅伴 Trip Mate

手機優先的團體旅遊管理網站，包含行李確認、行程編輯、交通航班與共同記帳。

## 先在本機試用

直接開啟 `index.html`。資料預設存在瀏覽器 localStorage，不需後端即可使用。

## 放到 GitHub Pages

1. 建立 GitHub repository，將 `index.html`、`style.css`、`app.js`、`config.js` 上傳到根目錄。
2. 到 Settings → Pages，來源選 Deploy from a branch，分支選 `main` / root。
3. 等待 GitHub 產生網站網址。

## 串接 Google Sheets

1. 建立 Google 試算表，複製網址中的 Sheet ID。
2. 到 Extensions → Apps Script，貼上 `Code.gs`，並替換 `SHEET_ID`。
3. 部署為 Web app；執行身分選自己，存取權依團員需求設定。
4. 把部署網址貼到 `config.js` 的 `API_URL`。

試算表會自動建立四個工作表：`行程`、`行李`、`交通`、`記帳`。

> 正式多人使用前，建議替 Apps Script 加上 Google 登入或團隊密碼驗證，並限制可修改欄位。不要把私密金鑰放在前端檔案。
