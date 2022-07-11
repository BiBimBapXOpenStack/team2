# 회원가입

URL : /users

Method : POST

Description : 사용자 회원가입

Request Body

| Name | Type | Required | Description | example |
| --- | --- | --- | --- | --- |
| userid | String | True | 사용자 ID | “userid” |
| userpw | String | True | 사용자 비밀번호 | “userpw” |
| username | String | True | 사용자 이름 | "userName” |

```json
{

“userid” : “id”

“userpw” : “pw”

“username” : “고길동”

}
```

Auth required : NO

Success Reponses

```json
Condition : 회원가입에 성공

Code : 200 OK

Content
{
  message : "success"
}
```

Failure Response

```json
Condition : 회원가입 실패

Code: 409

Content
{
"errMsg" :"conflict id"
}

Condition : 올바른 요청이 아닐 때

Code : 400 

Content
{
"errMsg" : "<fieldName> <errMsg>"
}
```

# 로그인

URL : /users/login

Method : POST

Description : 사용자 회원가입

Request Body

| Name | Type | Required | Description | example |
| --- | --- | --- | --- | --- |
| userid | String | True | 사용자 ID | “userid” |
| userpw | String | True | 사용자 비밀번호 | “userpw” |

```json
{

“userid” : “id”

“password” : “pw”

}
```

Auth required : NO

Success Reponses

```json
Condition : 로그인에 성공

Code : 200 OK

Content
{
  message : "join success"
}
```

Failure Response

```json
Condition : 로그인 실패

Code: 401

Content
{
"errMsg" :"invalid id or pw"
}

Condition : 올바른 요청이 아닐 때

Code : 400 

Content
{
"errMsg" : "<fieldName> <errMsg>"
}
```

# 로그아웃

URL : /users/logout

Method : GET

Description : 사용자 로그아웃

Header (추후 수정)

| Name | Type | Required | Description | example |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

Auth required : YES

Success Reponses

```json
Condition : 로그아웃 성공

Code : 200 OK

Content
{

}
```

Failure Response (추후 수정)

```json
Condition : 로그아웃 실패

Code: 400

Content
{

}

Condition : 올바른 요청이 아닐 때

Code : 400 

Content
{
"errMsg" : "<fieldName> <errMsg>"
}
```
