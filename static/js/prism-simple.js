/*
 * Prism 的 Simple 高亮插件 2020-4-16
 * 东子 xhwsd@qq.com 
 * 
 * 基于 https://cdn.jsdelivr.net/npm/prismjs@1.20.0/components/prism-visual-basic.js 魔改
 */

/**
 * 解决 \w 无法匹配中文：
 * \w 等价于 [A-Za-z0-9_]
 * 匹配中文字符 [\u4e00-\u9fa5]
 * [A-Za-z0-9_\u4e00-\u9fa5] 等价于 \w + 中文
 */
const w = "[A-Za-z0-9_\\u4e00-\\u9fa5]";

/**
 * 解决 \b 无法处理中文：
 * \b 等价于 ((?<!\w)(?=\w)|(?<=\w)(?!\w))
 */
const b = "((?<!" + w + ")(?=" + w + ")|(?<=" + w + ")(?!" + w + "))";

Prism.languages['simple'] = {
	// 注解
	'comment': {
		pattern: /(?:['‘’]|REM\b)(?:[^\r\n_]|_(?:\r\n?|\n)?)*/i,
		inside: {
			'keyword': /^REM/i
		}
	},
	// 指令
	'directive': {
		//pattern: /#(?:Const|Else|ElseIf|End|ExternalChecksum|ExternalSource|If|Region)(?:[^\S\r\n]_[^\S\r\n]*(?:\r\n?|\n)|.)+/i,
		pattern: /#(?:常量|否则|否则如果|结束|ExternalChecksum|ExternalSource|如果|Region)(?:[^\S\r\n]_[^\S\r\n]*(?:\r\n?|\n)|.)+/i,
		alias: 'comment',
		greedy: true
	},
	// 字符串
	'string': {
		//pattern: /\$?["“”](?:["“”]{2}|[^"“”])*["“”]C?/i,
		// 注意字符串中 " 的转义处理
		pattern: /["“”](?:["“”]{2}|\\"|[^"“”])*["“”]C?/i,
		greedy: true
	},
	// 日期
	'date': {
		pattern: /#[^\S\r\n]*(?:\d+([/-])\d+\1\d+(?:[^\S\r\n]+(?:\d+[^\S\r\n]*(?:AM|PM)|\d+:\d+(?::\d+)?(?:[^\S\r\n]*(?:AM|PM))?))?|(?:\d+[^\S\r\n]*(?:AM|PM)|\d+:\d+(?::\d+)?(?:[^\S\r\n]*(?:AM|PM))?))[^\S\r\n]*#/i,
		alias: 'builtin'
	},
	// 数字
	//'number': /(?:(?:\b\d+(?:\.\d+)?|\.\d+)(?:E[+-]?\d+)?|&[HO][\dA-F]+)(?:U?[ILS]|[FRD])?/i,
	// 因无法在正则表达式字符串中嵌入变量，所以使用 RegExp() 函数创建正则表达式
	'number': new RegExp("(?:(?:" + b + "\\d+(?:\\.\\d+)?|\\.\\d+)(?:E[+-]?\\d+)?|&[HO][\\dA-F]+)(?:U?[ILS]|[FRD])?", "i"),
	// 布尔
	//'boolean': /\b(?:True|False|Nothing)\b/i,
	'boolean': new RegExp(b + "(?:真|假|空)" + b, "i"),
	// 关键字
	//'keyword': /\b(?:AddHandler|AddressOf|Alias|And(?:Also)?|As|Boolean|ByRef|Byte|ByVal|Call|Case|Catch|C(?:Bool|Byte|Char|Date|Dbl|Dec|Int|Lng|Obj|SByte|Short|Sng|Str|Type|UInt|ULng|UShort)|Char|Class|Const|Continue|Date|Decimal|Declare|Default|Delegate|Dim|DirectCast|Do|Double|Each|Else(?:If)?|End(?:If)?|Enum|Erase|Error|Event|Exit|Finally|For|Friend|Function|Get(?:Type|XMLNamespace)?|Global|GoSub|GoTo|Handles|If|Implements|Imports|In|Inherits|Integer|Interface|Is|IsNot|Let|Lib|Like|Long|Loop|Me|Mod|Module|Must(?:Inherit|Override)|My(?:Base|Class)|Namespace|Narrowing|New|Next|Not(?:Inheritable|Overridable)?|Object|Of|On|Operator|Option(?:al)?|Or(?:Else)?|Out|Overloads|Overridable|Overrides|ParamArray|Partial|Private|Property|Protected|Public|RaiseEvent|ReadOnly|ReDim|RemoveHandler|Resume|Return|SByte|Select|Set|Shadows|Shared|short|Single|Static|Step|Stop|String|Structure|Sub|SyncLock|Then|Throw|To|Try|TryCast|TypeOf|U(?:Integer|Long|Short)|Using|Variant|Wend|When|While|Widening|With(?:Events)?|WriteOnly|Xor)\b/i,
	'keyword': new RegExp(b + "(?:AddHandler|AddressOf|别名|且(?:Also)?|为|逻辑型|传址|字节型|传值|Call|分支|分支|C(?:Bool|字节型|Char|日期时间型|Dbl|Dec|Int|Lng|Obj|SByte|短整数型|Sng|Str|Type|UInt|ULng|UShort)|Char|Class|常量|Continue|日期时间型|Decimal|Declare|Default|Delegate|变量|DirectCast|执行|双精度小数型|每个|否则(?:如果)?|结束(?:如果)?|Enum|Erase|错误|事件|退出|Finally|循环|Friend|函数|获取(?:Type|XMLNamespace)?|Global|GoSub|GoTo|Handles|如果|Implements|Imports|从|Inherits|整数型|Interface|是|非|Let|Lib|匹配|长整数型| 循环|本对象|求模|Module|Must(?:Inherit|Override)|My(?:Base|Class)|Namespace|Narrowing|创建|下个|取反(?:Inheritable|Overridable)?|对象|Of|位于|Operator|Option(?:al)?|或(?:否则)?|Out|Overloads|Overridable|Overrides|ParamArray|Partial|Private|属性|Protected|Public|触发事件|ReadOnly|ReDim|RemoveHandler|Resume|Return|SByte|判断|设置|Shadows|Shared|short|单精度小数型|静态|步进|Stop|文本型|Structure|过程|SyncLock|则|Throw|到|Try|TryCast|类型检验|U(?:Integer|Long|Short)|Using|变体型|Wend|When|判断循环|Widening|With(?:Events)?|WriteOnly|异或)" + b, "i"),
	// 运算符
	'operator': [
		/[+\-*/\\^<=>&#@$%!]/,
		{
			pattern: /([^\S\r\n])_(?=[^\S\r\n]*[\r\n])/,
			lookbehind: true
		}
	],
	// 标点符号
	'punctuation': /[{}().,:?]/
};

// 别名
Prism.languages.es4a = Prism.languages['simple'];