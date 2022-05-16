# 게시물 작성

URL : /board

Method : POST

Description : 게시물 작성

Request Body

| Name | Type | Required | Description | example |
| --- | --- | --- | --- | --- |
| userid | String | True | 게시글 작성 유저 ID | "userid” |
| postid | BigInt | True | 게시글 ID | 1 |
| title | String | True | 게시글 제목 | "title” |
| content | String | True | 게시글 본문 | "content....” |
| imageFile | multer | False | 게시글 첨부 이미지 |  |

Auth required : YES

```json
{
"userid" : "qwerty1234",
"postid" : 1
"title" : "제목" ,
"content" : "내용",
"imageFile" : 
}
```

Success Reponses

```json
Condition : 게시글 생성 성공

Code : 200 OK

Content
{

}
```

Failure Response

```json
Condition : 게시글에 대한 권한이 없을 때

Code: 403

Content
{
"errMsg" :"no permission"
}

Condition : 올바른 요청이 아닐 때

Code : 400 

Content
{
"errMsg" : "<fieldName> <errMsg>"
}

Condition : 인증되지 않은 사용자가 요청을 보낸 경우

Code : 401 

Content
{
"errMsg" : "Unauthorized User"
}
```

# 게시글 조회

URL : /board/{board_id}

Method : GET

Description : 게시글 삭제

Url Parameter

| Name | Type | Required | Description | example |
| --- | --- | --- | --- | --- |
| postid | String | True | 게시글 id | "postid” |

Auth required : YES

Success Reponses

```json
Condition : 게시글 조회 성공

Code : 200 OK

Content
{
"userid" : "qwerty1234",
"postid" : 1
"title" : "제목" ,
"content" : "내용",
"imageFile" : 
}
```

Failure Response

```json
Condition : 게시글에 대한 권한이 없을 때

Code: 403

Content
{
"errMsg" :"no permission"
}

Condition : 올바른 요청이 아닐 때

Code : 400 

Content
{
"errMsg" : "<fieldName> <errMsg>"
}

Condition : 인증되지 않은 사용자가 요청을 보낸 경우

Code : 401 

Content
{
"errMsg" : "Unauthorized User"
}
```

# 게시글 리스트

URL : /board?page=<pagenumber>

Method : GET

Description : 게시글 리스트

Query String

| Name | Type | Required | Default | Description | example |
| --- | --- | --- | --- | --- | --- |
| page | Number | True | 0 | pagenation  | 1 |

```json
{

"postid" : 1

}
```

Auth required : YES

Success Reponses

```json
Condition : 게시글 리스트 조회 성공

Code : 200 OK

Content
{
[
"userid" : "qwerty1234",
"postid" : 1
"title" : "제목" ,
"content" : "내용",
"imageFile" :
],
}
```

Failure Response

```json
Condition : 게시글에 대한 권한이 없을 때

Code: 403

Content
{
"errMsg" :"no permission"
}

Condition : 올바른 요청이 아닐 때

Code : 400 

Content
{
"errMsg" : "<fieldName> <errMsg>"
}

Condition : 인증되지 않은 사용자가 요청을 보낸 경우

Code : 401 

Content
{
"errMsg" : "Unauthorized User"
}
```

# 게시글 수정

URL : /board/{board_id}

Method : PUT

Description : 게시글 수정

Request Body

| Name | Type | Required | Description | example |
| --- | --- | --- | --- | --- |
| userid | String | True | 게시글 작성한 유저 ID | “userid” |
| title | String | True |  게시글 제목 | “title” |
| content | String | True | 게시글 본문 | "content...” |
| imageFile | multer | False | 게시글 이미지 파일 |  |

Auth required : YES

```json
{
"userid" : "userid",
"title" : "제목" ,
"content" : "내용" ,
"imageFile" : 
}
```

Success Reponses

```json
Condition : 게시글 수정 성공

Code : 200 OK

Content
{

}
```

Failure Response

```json
Condition : 게시글에 대한 권한이 없을 때

Code: 403

Content
{
"errMsg" :"no permission"
}

Condition : 게시글이 존재하지 않을 때

Code: 404 

Content
{
"errMsg" :"invalid postid"
}

Condition : 올바른 요청이 아닐 때

Code : 400 

Content
{
"errMsg" : "<fieldName> <errMsg>"
}

Condition : 인증되지 않은 사용자가 요청을 보낸 경우

Code : 401 

Content
{
"errMsg" : "Unauthorized User"
}
```

# 게시글 삭제

URL : /board/{board_id}

Method : DELETE

Description : 게시글 삭제

Request Body

| Name | Type | Required | Description | example |
| --- | --- | --- | --- | --- |
| postid | BigInt | True | 게시물 id | 1 |

```json
{

"postid" : 1

}
```

Auth required : YES

Success Reponses

```json
Condition : 게시글 삭제 성공

Code : 200 OK

Content
{

}
```

Failure Response

```json
Condition : 게시글에 대한 권한이 없을 때

Code : 403

Content
{
"errMsg" :"no permission"
}

Condition : 게시글이 존재하지 않을 때

Code: 404 

Content
{
"errMsg" :"invalid postid"
}

Condition : 올바른 요청이 아닐 때

Code : 400 

Content
{
"errMsg" : "<fieldName> <errMsg>"
}

Condition : 인증되지 않은 사용자가 요청을 보낸 경우

Code : 401 

Content
{
"errMsg" : "Unauthorized User"
}
```