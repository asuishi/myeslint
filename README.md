### 一个简单的ESLint

### 安装
```
    npm i myeslint -g
```
### 使用
```
    myeslint test.js [test2.js]
```
### 配置

同eslint配置
```
{
    "rules": {
        "no-with": 1,
        "brace-style": 1,
        "eqeqeq": 1,
        "no-empty": 1
    }
}
```
1: 表示开启； 0：表示关闭

> 支持自定义规则
```
 myeslint -c configfile test.js
```

### 现有规则

现在一共四个规则
- no-with 

  不允许使用with
- brace-style
  
    if,function,for 和 { 必须在同一行
- eqeqeq 
 
  使用===和!== 不允许使用==,!=
- no-empty
    
    不允许空块({})
    
   
### 测试
```
    npm run test
```
