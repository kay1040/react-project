# React 練習作品 - 纏花推廣網站一畝花田

以大學畢業製作專題—纏花推廣作為延伸開發的網站，可以透過此網站認識纏花，並且有教學影片可以學習纏花的基本技法，也可以購買纏花。

### Demo: https://one-acre-flower-field.netlify.app/
- 測試帳號如下，也可以自行註冊一個帳號

  - 帳號: user01@test.com 
  - 密碼: pwd123 （請勿更改密碼）

## 使用技術
- React.js
- React-router
- React-redux
- Firebase
- Ant Design
- Tailwind CSS

## 頁面展示
### 首頁

輪播圖 使用Swiper套件

![carousel](https://github.com/kay1040/react-project/assets/112454167/844e0497-cfcc-49ff-b6c9-2b50dfb086ed)

新品上架，從商品列表中取出最新的8個商品

<img src="https://github.com/kay1040/react-project/assets/112454167/21993391-0d99-4d0e-ab47-410864f0aa94" width="952" alt="newProducts">

首頁底部展示傳統纏花（可互動）

![tradition](https://github.com/kay1040/react-project/assets/112454167/c6acf7c4-d155-426c-93c6-71d5cb9cb380)

### 關於我們

<img src="https://github.com/kay1040/react-project/assets/112454167/b536516c-b5cb-44d3-b3a6-ddc89d3dad29" width="952" alt="about">

### 認識纏花

![introduce](https://github.com/kay1040/react-project/assets/112454167/da207110-d5e1-4e69-9925-fd34eb8d0a4f)

### 纏花教學

嵌入Youtube纏花教學影片，右側菜單可切換影片及教學簡介

![tutorials](https://github.com/kay1040/react-project/assets/112454167/dedf2f3a-b660-42f5-a757-8aa65c2d045e)

### 纏花商店

可以依照類別篩選商品以及依照價格或上架順序來排序
商品資料儲存於Firestore資料庫

![shop](https://github.com/kay1040/react-project/assets/112454167/a5d21afe-1b90-4eb9-805b-6675ddf9c4ba)

### 搜尋商品

輸入關鍵字搜尋商品

![search](https://github.com/kay1040/react-project/assets/112454167/73cdd0b5-6867-4fa0-8331-d799032d5006)

### 商品詳情

可以點擊愛心將商品加入收藏，以及將商品加入購物車

![productDetails-1](https://github.com/kay1040/react-project/assets/112454167/0c384f81-2a64-48b5-bfc9-00580ae44f5b)


點擊直接購買會直接跳轉到購物車結帳頁面（需登入）

![productDetails-2](https://github.com/kay1040/react-project/assets/112454167/c57d85ed-7f93-40b4-a63b-06d126651ee1)

### 購物車預覽
![cartPreview](https://github.com/kay1040/react-project/assets/112454167/18fbb787-0f40-4f97-8703-5b0ac100a8b3)

### 結帳

使用Ant Design Steps

第一步：確認購物車

![step1](https://github.com/kay1040/react-project/assets/112454167/c7623d43-da23-4794-8020-c9c01e725003)

第二步：填寫收件資訊

![step2](https://github.com/kay1040/react-project/assets/112454167/42880f32-cc9b-4854-bb78-ff43da31289a)

第三步：訂單確認，送出訂單後會跳轉到會員資料的我的訂單頁面

![step3](https://github.com/kay1040/react-project/assets/112454167/4280faea-891d-464c-820b-7f0cdc6f9008)

### 註冊 / 登入

使用Firebase Authentication

![authForm](https://github.com/kay1040/react-project/assets/112454167/34f0b5e3-d6f5-462f-a3a0-47d689170adf)

### 會員資料

更新會員資料

![updateUserData](https://github.com/kay1040/react-project/assets/112454167/fde05365-91a2-4687-aa5b-4e8c36ada412)


若資料修改後沒有儲存就離開，會跳出提示框（使用lodash的isEqual來判斷資料是否被修改）

![updateUserData2](https://github.com/kay1040/react-project/assets/112454167/b35214fc-d24f-40ef-92a9-729b69583c37)


修改密碼

![updatePwd](https://github.com/kay1040/react-project/assets/112454167/5f2fb618-0aed-4e5b-8e6e-7a73e6eac1eb)


### 我的訂單

![myOrder](https://github.com/kay1040/react-project/assets/112454167/ba1eb6bf-7117-4ce3-a01c-a762a1cde3ac)


### 我的收藏

![myFavorites](https://github.com/kay1040/react-project/assets/112454167/bb6314e5-5326-4f5f-8f28-f3c5bd10b7a5)


### 登出

登出後自動跳轉回首頁

![logout](https://github.com/kay1040/react-project/assets/112454167/82af790a-0c15-4491-bf5d-ef83c9a5749f)

