export function getFile(target) {
  return Promise
    .resolve()
    .then(() => fetch(target))
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP error, status = ' + response.status);
      }
      return response.text();
    })
}

export function install(hook, vm) {
  const config = Object.assign({}, {
		tag: 'httpGet', // 缺省标签标识
	}, vm.config.httpGet); // 取配置

  hook.beforeEach(function (content, next) {
    // 正则表达式匹配
    const reg = new RegExp(`\\[${config.tag}\\]\\((http|https://.+)\\)`);
    const result = content.match(reg);

    if (result && result[1]) {
      const targetFile = result[1];
      // HTTP请求
      getFile(targetFile)
        // 请求成功
        .then((data) => next(content.replace(reg, data)))
        // 请求失败
        .catch((err) => console.error(err));
    } else {
      next(content);
    }
  });
}
