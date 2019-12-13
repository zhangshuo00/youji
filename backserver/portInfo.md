## 接口说明文档
### /addFavorites（添加收藏文章）
* post请求参数：`uid（当前登录用户）`、`chid（想要收藏的文章id）`
* 数据库对应表：`userCollection`、`chapter`
* 数据库操作：在 `userCollection` 表中新增 `uid`、`chid` 数据；
  在 `chapter` 表中找到相应 `chid` 的收藏数自增一
* 返回数据：`{msg:'success'}`

### /addSionple（新建笔记）
* post请求参数：


（本文档为有纪后端接口的说明文档，接口顺序按照字母排序）