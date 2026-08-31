# DogeCloud

<div id="player"></div>
<script type="text/javascript">
var player = new DogePlayer({
    container: document.getElementById('player'),
    userId: 161,
    vcode: '20d4cd4555ae3163',
    autoPlay: false
});
</script>

- 观看码：`5DEFE433C5163EF945A28FE8`
- 想想如果使用 观看码 + 发卡平台 方式！

### 定义到`index.html`的代码
```html
<!-- DogeCloud 视频云服务 -->
<script type="text/javascript" src="//player.dogecloud.com/js/loader"></script>
```

### 定义到MD文档的代码
```html
<div id="player"></div>
<script type="text/javascript">
var player = new DogePlayer({
    container: document.getElementById('player'),
    userId: 161,
    vcode: '20d4cd4555ae3163',
    autoPlay: false
});
</script>
```

- 注意需要开启`docsify.executeScript = true`播放MD文档中的第一个script脚本
- 注意定义到MD文档的代码前面需要空一行

> [DogeCloud](https://www.dogecloud.com)特点：付费、自主、灵活、一体化。
