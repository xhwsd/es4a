# 测试
- [BiliBili](test@bilibili.md)
- [DogeCloud](test@dogecloud.md)
- [GoIndex](test@goindex.md)
- [V2Geek](test@v2geek.md)
- [Form](test@form.md)


```simple

事件 测试JSON操作.初始化()
	编辑框1.文本 = 格式化JSON文本("{\"name\":\"东子\",\"qq\":123849300,\"married\":true,\"other\":null,\"tag\":[\"江苏\",80]}", 4)
结束 事件

事件 测试JSON操作.按下某键(按键代码 为 整数型, 传址 取消事件 为 逻辑型)
	判断 按键代码
		分支 键码_返回
			切换窗口(主窗口.成_主窗口)
	结束 判断
结束 事件

事件 按钮1.被单击()
	变量 局_JSON对象 为 JSON值
	局_JSON对象 = 创建 JSON值
	局_JSON对象.解析对象(编辑框1.文本)

	变量 局_所有属性 为 文本型()
	局_所有属性 = 局_JSON对象.取所有属性名()
	编辑框2.文本 = "{" & 连接数组文本(局_所有属性,", ") &  "}"
结束 事件

事件 按钮2.被单击()
	变量 局_JSON对象 为 JSON值
	局_JSON对象 = 创建 JSON值
	局_JSON对象.解析对象(编辑框1.文本)

	编辑框2.文本 = "name=" & 局_JSON对象.取文本("name") _
		& "\nqq=" & 局_JSON对象.取整数("qq") _
		& "\nmarried=" & 局_JSON对象.取逻辑("married") _
		& "\nother=" & 局_JSON对象.是否为空("other") & "(是否为空)"

	编辑框2.文本 = 编辑框2.文本 & "\ntag="
	变量 局_JSON数组 为 JSON值
	局_JSON数组 = 局_JSON对象.取数组("tag")
	变量 局_循环计次 为 整数型
	循环 局_循环计次 = 0 到 局_JSON数组.计数 - 1
		如果 局_循环计次 > 0 则 编辑框2.文本 = 编辑框2.文本 & ", "
		编辑框2.文本 = 编辑框2.文本 & 局_JSON数组.取文本(局_循环计次)
	下个
结束 事件

事件 按钮3.被单击()
	变量 局_JSON对象 为 JSON值
	局_JSON对象 = 创建 JSON值
	局_JSON对象.解析对象(编辑框1.文本)

	局_JSON对象.置文本("name", "再见理想")
	局_JSON对象.置整数("qq", 851248662)
	局_JSON对象.置逻辑("married", 假)

	变量 局_JSON数组 为 JSON值
	局_JSON数组 = 创建 JSON值
	局_JSON数组.创建数组()
	局_JSON数组.加入文本("福建")
	局_JSON数组.加入整数(90)
	局_JSON对象.置数组("tag", 局_JSON数组)

	编辑框2.文本 = 局_JSON对象.到文本(4)
结束 事件


```
