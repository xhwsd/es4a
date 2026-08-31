# 类库开发
编写Simple类库的首选语言是Java，尽管可以使用任何可以生成Java类文件且支持Java注释的语言编写它们。

## 从Java到Simple的类型映射
为了在Java中编写Simple类库，有必要将Java类型映射到Simple类型，反之亦然。下表显示了等效类型：

| Simple类型 | Java类型 |
| --- | --- |
| 逻辑型 | boolean |
| 字节型 | byte |
| 短整数型 | short |
| 整数型 | int |
| 长整数型 | long |
| 单精度小数型 | float |
| 双精度小数型 | double |
| 文本型 | java.lang.String |
| 日期时间型 | java.util.Calendar |
| 对象 | java.lang.Object |
| 变体型 | simple.runtime.variants.Variant |

任何其它Simple对象类型都映射到Java中的同一名称。Simple的函数参数可以通过值传递，也可以通过引用传递。如果它们通过引用传递，则参数类型映射如下：

| Simple类型 | Java类型 |
| --- | --- |
| 逻辑型 | simple.runtime.parameters.BooleanReferenceParameter |
| 字节型 | simple.runtime.parameters.ByteReferenceParameter |
| 短整数型 | simple.runtime.parameters.ShortReferenceParameter |
| 整数型 | simple.runtime.parameters.IntegerReferenceParameter |
| 长整数型 | simple.runtime.parameters.LongReferenceParameter |
| 单精度小数型 | simple.runtime.parameters.SingleReferenceParameter |
| 双精度小数型 | simple.runtime.parameters.DoubleReferenceParameter |
| 文本型 | simple.runtime.parameters.StringReferenceParameter |
| 日期时间型 | simple.runtime.parameters.DateReferenceParameter |
| 对象 | simple.runtime.parameters.ObjectReferenceParameter |
| 变体型 | simple.runtime.parameters.VariantReferenceParameter |

任何其它Simple对象引用类型都映射到`simple.runtime.parameters.ObjectReferenceParameter`。

## Simple注释
Simple语言不支持Java的所有功能（例如：没有方法重载）。它被设计为simple（因此名称）。另一方面，它确实增加了对诸如事件和属性等功能的一流支持，这些功能和属性在Java语言规范中不可用。作为此设计的结果，Java类文件的内容需要进行注释，以便Simple编译器进行识别。以下注释（来自`simple.runtime.annotations`包）用于标记Java类文件中的Simple识别内容。

### SimpleObject
将此注释添加到Java类或接口声明使该类在Simple代码中可见。

```java
@SimpleObject
public final class 文本 {
	// ...
}
```

#### SimpleFunction
将此注释添加到Java方法可使该方法在Simple代码中可见。这要求包含标记方法的类使用`SimpleObject`注释进行标记。

```java
@SimpleObject
public final class 文本 {
	/**
	 * 将给定的字符串转换为所有小写。
	 *
	 * @param str 要转换为小写字符串
	 */
	@SimpleFunction
	public static void 到小写(ObjectReferenceParameter<String> str) {
		str.set(str.get().toLowerCase());
	}

	// ...
}
```

### SimpleProperty
将此注释添加到非静态定义的Java方法，用作Simple属性。这要求包含标记方法的类使用`SimpleObject`注释进行标记。

**设置**方法必须声明为`void`，并且正好有一个形式参数，其类型将确定属性的类型。**获取**方法不能有任何形式的参数和作为属性类型的返回类型。如果同时标记**获取**和**设置**方法，则**获取**返回类型和**设置**形式参数类型必须相同。

此注释采两个可选参数。第一个类型是比属性的运行时类型更专用的类型。它供IDE使用。默认情况下，假定类型为纯文本。第二个是`初始化`程序作为字符串给定的属性的默认值。只能在属性**设置**方法上使用这些参数。如果在属性**获取**方法中找到它们，它们将被忽略。

| 类型 | 描述 |
| --- | --- |
| PROPERTY_TYPE_ASSET | 存储在资产目录中的资源名称（带引号的字符串，例如默认值是`\"\"`）|
| PROPERTY_TYPE_BOOLEAN | `True`或`False` |
| PROPERTY_TYPE_COLOR | 颜色常量值，定义在 `simple.runtime.components.组件` |
| PROPERTY_TYPE_DOUBLE | 浮点常数（双精度小数型） |
| PROPERTY_TYPE_GRAVITY | 重力常量值，定义在`simple.runtime.components.组件` |
| PROPERTY_TYPE_HORIZONTAL_ALIGNMENT | 水平对齐常量值，定义在`simple.runtime.components.组件` |
| PROPERTY_TYPE_INTEGER | 整数常数（8位、16位或32位有符号整数） |
| PROPERTY_TYPE_LAYOUT | 布局常量值，定义在`simple.runtime.components.组件` |
| PROPERTY_TYPE_LONG | 整数常数（64位有符号整数） |
| PROPERTY_TYPE_SINGLE | 浮点常数（单精度小数） |
| PROPERTY_TYPE_STRING | 字符串常数（带引号，例如默认值是`\"\"`） |
| PROPERTY_TYPE_TEXT  | 纯文本 |
| PROPERTY_TYPE_TYPEFACE | 字体类型常量值，定义在`simple.runtime.components.组件` |
| PROPERTY_TYPE_TEXTJUSTIFICATION | 文本对齐常量值，定义在`simple.runtime.components.组件` |
| PROPERTY_TYPE_VERTICAL_ALIGNMENT | 垂直对齐常量值，定义在`simple.runtime.components.组件` |

```java
@SimpleObject
public interface 标签 extends 可视组件 {
	/**
	 * 提示属性获取方法。
	 *
	 * @return 提示文本
	 */
	@SimpleProperty
	String 提示();
	
	/**
	 * 提示属性设置方法。
	 *
	 * @param hint 提示文本
	 */
	@SimpleProperty(type = SimpleProperty.PROPERTY_TYPE_STRING, initializer = "\"\"")
	void 提示(String hint);

	// ...
}
```

### SimpleEvent
将此注释添加到Java方法会标记该方法为Simple事件定义。这要求包含标记方法的类使用`SimpleObject`注释进行标记。

事件不能具有任何返回类型。

```java
@SimpleObject
public interface 标签 extends 可视组件 {
	/**
	 * 默认初始化事件处理程序。
	 */
	@DesignerEvent
	@SimpleEvent
	void 初始化();

	// ...
}
```

### SimpleDataElement
将此注释添加到Java字段声明可使该字段在Simple代码中可见。这要求包含标记字段的类使用`SimpleObject`注释进行标记。

Java基础值和`String`类型的`static final`字段被视为常量。

```java
@SimpleObject
public interface 组件 {
	/*
	 * 文本对齐常量。
	 */
	@SimpleDataElement
	static final int 对齐_正常 = 0;
	@SimpleDataElement
	static final int 对齐_正中 = 1;
	@SimpleDataElement
	static final int 对齐_对面 = 2;

	// ...
}
```

### SimpleComponent
将类声明为组件。Simple编译器使用此注释来标识组件。IDE还使用它来标识组件。还必须使用`SimpleObject`注释标记类。

```java
@SimpleComponent
@SimpleObject
public interface 标签 extends 可视组件 {
	// ...
}
```

## Android特定注释
`UsesPermissions`注释用于设置Android权限，以授予对Android设备上某些数据和服务的访问权限。注释只接受一个参数。有关参数值的信息，请参见[Manifest.permission](https://developer.android.com/reference/android/Manifest.permission)官方文档。还必须使用`SimpleObject`注释标记该类。

```java
@SimpleObject
@UsesPermissions(permissionNames = "android.permission.CALL_PHONE")
public final class 电话 {
	// ...
}
```

## 可视和非可视组件
我们可以区分两个不同的组件类别：可视和非可视。可视组件在窗口上具有可视表示形式。它们是`simple.runtime.可视组件`的子类。可视组件的示例包括`simple.runtime.components.按钮`和`simple.runtime.面板`。

非可视组件没有可视的表示形式。他们只需要扩展`simple.runtime.components.组件`接口。非可视组件的示例包括`simple.runtime.components.计时器`和`simple.runtime.components.方向传感器`。

## 组件实现
创建新组件的一个好方法是查找现有的类似组件并修改其实现。Simple发行版附带的标准组件位于`simple.runtime.components`和`simple.runtime.components.android`包中。

组件必须定义接口和该接口的实现。这种分离使得将来可以很容易地实现不同操作系统或体系结构的组件。如前所述，可视组件必须扩展`simple.runtime.components.可视组件`接口，而非可视组件必须扩展`simple.runtime.components.组件`接口。

对于可视和非可视组件，组件构造函数必须将`simple.runtime.components.组件容器`作为唯一的参数。对于非可视组件，容器参数的值是`窗口`。

组件属性将由编译器和运行库系统基于属性集器方法的`SimpleProperty`注释的初始化器参数隐式初始化。分配给初始化器的空字符串（或完全在注释中省略初始化器）将禁止显式初始化。

尽管Simple~~不提供任何线程支持~~，但组件应写入为线程安全。
