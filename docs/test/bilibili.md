# 嵌入BiliBili

<div class="aspect-ratio">
    <iframe src="//player.bilibili.com/player.html?aid=24811085&cid=41805568&page=1&high_quality=1" scrolling="no" border="0" frameborder="no" framespacing="0"allowfullscreen="true"> </iframe>
</div>

>  暴雪出品CG动画 - 《魔兽世界：熊猫人之谜》

### 定义到`index.html`的代码
```css
<!-- 实现B站视频按比例播放 -->
<style type="text/css">
    .aspect-ratio {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 75%;
    }
    .aspect-ratio iframe {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }
</style>
```

### 定义到MD文档的代码
```html
<div class="aspect-ratio">
    <iframe src="//player.bilibili.com/player.html?aid=24811085&cid=41805568&page=1&high_quality=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
</div>
```

- 实现哔哩哔哩视频按比例播放 - [参考来源](https://www.potatofield.cn/【前端笔记】使用iframe嵌入等比缩放的哔哩哔哩视频/)
- 实现清晰度480P画质需要在视频地址后添加`&high_quality=1`，如已登录B站将可播放最高画质

> [哔哩哔哩](https://www.bilibili.com)特点：免费、稳定、HTTPS、无广告
