const Mock = require('mockjs');

module.exports = function (router, koaBody) {
  router.get('/api/user/current', koaBody(), async (ctx, next) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    })
      .then(() => {
        const data = Mock.mock({
          'errorCode': null,
          'errorMsg': null,
          'success': true,
          'data': {
            "id": null,
            "username": "wczhan",
            "employeeId": "S77770",
            "email": "wczhan@Ctrip.com",
            "deptName": "AI研发部",
            "business": "IT",
            "status": null,
            "chsName": "zwc詹伟超",
            "remark": null,
            "operator": null,
            "operateIp": null,
            "createTime": null,
            "datachangeLasttime": null,
            "roleList": null,
            "roleIds": null
          },
        });
        ctx.body = data;
        next();
      });
    
  });

  router.get('/api/auth/perms', koaBody(), async (ctx, next) => {
    const data = Mock.mock({
      'errorCode': null,
      'errorMsg': null,
      'success': true,
      'data': [
        '/a',
        '/b',
        '/c',
        '/f',
      ],
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