# 🍄 Pikmin Timer

[Pikmin Bloom](https://pikminbloom.com/) 蘑菇重生計時器，幫助你追蹤蘑菇的重生時間。

**線上使用：** https://kunlun-source.github.io/pikmin-timer/

## 功能

- 輸入蘑菇剩餘時間，自動計算重生時刻
- 即時倒數計時，接近重生時高亮提醒
- 支援中文／英文雙語切換
- 資料自動儲存於 localStorage

## 使用方式

輸入蘑菇剩餘時間（如 `530` = 5 分 30 秒），按下新增即可開始追蹤。

## 開發

```bash
npm install
npm run dev
```

## 部署

推送至 `main` 分支後，GitHub Actions 會自動建置並部署至 GitHub Pages。

## 技術

- Vue 3 + Vite
- GitHub Pages + GitHub Actions
