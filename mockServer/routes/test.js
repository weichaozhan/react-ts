const Mock = require('mockjs');

module.exports = function (router, koaBody) {
  router.post('/user', koaBody(), async (ctx, next) => {
    const data = Mock.mock({
      'code': 1000000,
      'msg': 'success',
      'data': {
          status: 'request'
      },
    });
    ctx.body = data;
    await next();
  });

  // 获取音频
  router.get('/audio', async (ctx, next) => {
    // 用fs处理流
    function readImg(filePath) {
      // 创建可读流
      let data = [];
      return new Promise((res, rej) => {
        const readerStream = fs.createReadStream(filePath);
        readerStream.on("data", function(chunk) {
          data.push(chunk);
        });
        readerStream.on("end", function() {
          const finalData = Buffer.concat(data); // 合并Buffer
          res(finalData);
        });
      });
    }

    const res = await readImg('./mockServer/utils/audio.mp3');
    
    // res 为 Buffer流
    if (res) {
      ctx.type = "audio/mp3";
      ctx.body = res;
    }
    await next();
  });
}