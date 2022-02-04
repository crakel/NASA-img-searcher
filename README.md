# 🚀 NASA-img-searcher
![NASA-img-searcher](https://user-images.githubusercontent.com/59333136/152462396-e0c9c99f-ae72-4361-98bc-0fc5b24509d1.png)

> NASA Open API 를 이용해 NASA에 있는 이미지를 Center, Title, Year, Description 의 필터링을 통해
> 검색할 수 있는 SPA 웹 어플리케이션
## ✨  Period
2021.12.22 ~ 2022.12.27

## ✨  Technology used
  * React (17.0.2)
  * Bootstrap (5.1.3)

## ✨ Directory Description
  * /src/App.js

         - Main Page 코드
         - axios 를 통해 request한 NASA Open API response를 통해 불러온 정보들을 렌더링한다.
         
  * /src/components

        - Pagination, Picture 렌더링을 위해 분리해놓은 components 코드


## ✨ Development result
### [Main Page]
  
   <img src="https://user-images.githubusercontent.com/59333136/152464687-273708fa-a2b8-4838-b4a5-118517151183.png" width="1000" height="500"/>

  ------
  
### [Search Bar]
  ***필터를 통해 해당하는 API로 검색 요청***  

  <img src="https://user-images.githubusercontent.com/59333136/152473293-a2bdbe29-032a-456c-ac95-193b80bd0deb.png" width="1000" height="200" />


 ------

### [Pagination]
***검색 결과를 각 Page Per Pics로 나타내 총 Data를 Page로 구현***  

  <img src="https://user-images.githubusercontent.com/59333136/152474037-6d793b5c-832d-4160-8a28-f83ada31b0cd.png" width="1000" height="80" />
  
------
    
## ✨ How to process 
* Running react-app
```bash
# intall
$ npm install
# start project
$ npm start
```

## ✨ Contact
-김기윤: crakeldev@gmail.com   
