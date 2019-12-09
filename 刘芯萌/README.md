~~国家一级特约划水运动员~~

负责项目数据库部分和部分原型
>本文件夹内包含上传服务器内的youji数据库文件夹及数据库逻辑结构图  
>覆盖使用时可通过WinSCP直接拉取至本地服务器的 **/var/lib/mysql/** 目录下  
>数据库内暂时只存了测试用数据  
>逻辑结构图虽问题的发现会不断调整

2019.11.28 tbc.  

>删除noteList表  
>privateletter重制，同时新增两个关联表sendMes、receiveMes  
>sendMes同时可以实现获取用户消息组  
>修改并重新上传逻辑结构图  

2019.12.4 tbc.

>修改chapter表，添加likes列关联findNote表  
>添加adminuser表，存储后台管理人员  
>添加carousel表，存储轮播图  
>添加followUser表，存储关注用户  
>修改并重新上传逻辑结构图  

2019.12.9 tbc.  
 ------  
 ## 各表结构 ##
user:  
| Field | Type | Key | Default | Extra |  
|:-------:|:------:|:------:|:-------:|:------:|
| uid | varchar(20) | PRI | NULL |  |  
| uemail | varchar(20) | UNI | NULL |  |  
| uname | varchar(20) |  | NULL |  |  
| headimg | varchar(100) |  | NULL |  |  
| usex | char(2) |  | NULL |  |  
| signature | varchar(40) |  | NULL |  |  
| upassword | varchar(20) |  | NULL |  |  
