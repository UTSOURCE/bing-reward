const puppeteer = require("puppeteer");
const iPhone = puppeteer.KnownDevices["iPhone 6"];

function delay(milliseconds) {
  return new Promise((r) => setTimeout(r, milliseconds));
}

const bing_reward = async (cookies) => {
  let jdUrlArray = "https://rewards.bing.com/?signin=1";
  let cookie = cookies;
  const brower = await puppeteer.launch({
    headless: false,
    args: [
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-first-run",
      "--no-sandbox",
      "--no-zygote",
      // "--single-process",
      "--start-maximized",
      "--use-gl=swiftshader",
      "--disable-gl-drawing-for-tests",
    ],
    ignoreDefaultArgs: ["--enable-automation"],
  });

  const context = await brower.createIncognitoBrowserContext();
  const page = await context.newPage();
  page.setDefaultNavigationTimeout(50 * 1000);

  await page.evaluateOnNewDocument(() => {
    const newProto = navigator.__proto__;
    delete newProto.webdriver;
    navigator.__proto__ = newProto;
  });
  await page.evaluateOnNewDocument(() => {
    window.navigator.chrome = {
      runtime: {},
    };
  });

  await Promise.all(
    cookie.map((pair) => {
      return page.setCookie(pair);
    })
  );

  //点击必应活动
  let level = 2;
  let pcLevel = 40;
  // console.log('点击必应活动')
  try {
    await Promise.all([
      page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.76"),
      page.setJavaScriptEnabled(true), //  允许执行 js 脚本
      page.goto(jdUrlArray, {
        waitUntil: "domcontentloaded",
      }),
      delay(10 * 1000),
    ]);
    // 获得等级
    const levelText = await page.$eval("#meeGradientBanner > div > div > div > p", (element) => element.innerText);
    if (levelText.indexOf("2") >= 0) {
      level = 2;
      pcLevel = 40;
    }
    console.log("当前等级：", levelText, "pc等级：", pcLevel);
    await page.waitForSelector("#more-activities .c-card");
    // 点击每一个活动
    const activityList = await page.$$("#more-activities .c-card");
    console.log("--共有活动--", activityList.length);
    for (const [index, iterator] of activityList.entries()) {
      console.log(`点击第${index + 1}个活动`);
      await iterator.click();
    }
    await delay(30 * 1000);
    await page.close();
  } catch (error) {
    await page.close();
    console.log(error);
  }

  const context1 = await brower.createIncognitoBrowserContext();
  const page1 = await context1.newPage();
  page1.setDefaultNavigationTimeout(50 * 1000);

  //viewport 1080*1920
  await page1.setViewport({
    width: 1080,
    height: 1920,
  });

  await page1.evaluateOnNewDocument(() => {
    const newProto = navigator.__proto__;
    delete newProto.webdriver;
    navigator.__proto__ = newProto;
  });
  await page1.evaluateOnNewDocument(() => {
    window.navigator.chrome = {
      runtime: {},
    };
  });

  await Promise.all(
    cookie.map((pair) => {
      return page1.setCookie(pair);
    })
  );

  //点击必应搜索
  console.log("点击必应搜索");
  try {
    let sosuo = [
      "最好的餐厅",
      "如何制作披萨",
      "旅游景点推荐",
      "流行音乐排行榜",
      "科技新闻更新",
      "电影推荐",
      "健康饮食",
      "时尚服饰",
      "最好的餐厅1",
      "如何制作披萨1",
      "旅游景点推荐1",
      "流行音乐排行榜1",
      "科技新闻更新1",
      "电影推荐1",
      "健康饮食1",
      "时尚服饰1",
      "最好的餐厅2",
      "如何制作披萨2",
      "旅游景点推荐2",
      "流行音乐排行榜2",
      "科技新闻更新2",
      "电影推荐2",
      "健康饮食2",
      "时尚服饰2",
      "最好的餐厅3",
      "如何制作披萨3",
      "旅游景点推荐3",
      "流行音乐排行榜3",
      "科技新闻更新3",
      "电影推荐3",
      "健康饮食3",
      "时尚服饰3",
      "最好的餐厅4",
      "如何制作披萨4",
      "旅游景点推荐4",
      "流行音乐排行榜4",
      "科技新闻更新4",
      "电影推荐4",
      "健康饮食4",
      "时尚服饰4",
      "最好的餐厅5",
      "如何制作披萨5",
      "旅游景点推荐5",
      "流行音乐排行榜5",
      "科技新闻更新5",
      "电影推荐5",
      "健康饮食5",
      "时尚服饰5",
      "最好的餐厅6",
      "如何制作披萨6",
      "旅游景点推荐6",
      "流行音乐排行榜6",
      "科技新闻更新6",
      "电影推荐6",
      "健康饮食6",
      "时尚服饰6",
    ];

    // 生成随机整数
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    let index = 0;
    while (index < pcLevel) {
      console.log(`第${index + 1}次搜索`);
      // 汽车品牌
      var carBrands = ["福特", "本田", "丰田", "宝马", "奔驰"];
      var randomCarBrand = carBrands[getRandomInt(carBrands.length)];

      // 电影类型
      var movieGenres = ["动作", "喜剧", "恐怖", "爱情", "科幻"];
      var randomMovieGenre = movieGenres[getRandomInt(movieGenres.length)];

      // 健身训练部位
      var bodyParts = ["胸部", "背部", "肩膀", "腹部", "臀部"];
      var randomBodyPart = bodyParts[getRandomInt(bodyParts.length)];
      await Promise.all([
        page1.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.76"),
        page1.setJavaScriptEnabled(true), //  允许执行 js 脚本

        page1.goto(
          `https://cn.bing.com/search?q=${encodeURIComponent(randomCarBrand + " " + randomMovieGenre + " " + randomBodyPart + " " + sosuo[index] + getRandomInt(1000))}&qs=n&form=QBRE&sp=-1&lq=0&pq=${encodeURIComponent(
            randomCarBrand + " " + randomMovieGenre + " " + randomBodyPart + " " + sosuo[index] + getRandomInt(1000)
          )}&sc=1-19&sk=&cvid=98DD1F51A42547089674D23588D78519&ghsh=0&ghacc=0&ghpl=`
        ),
      ]);
      await delay(30 * 1000);
      index++;
    }
    await page1.close();
  } catch (error) {
    await page1.close();
    console.log(error);
  }

  //手机搜索

  if (level === 2) {
    console.log("点击手机必应搜索");
    const context2 = await brower.createIncognitoBrowserContext();
    const page2 = await context2.newPage();
    page2.setDefaultNavigationTimeout(50 * 1000);

    await page2.evaluateOnNewDocument(() => {
      const newProto = navigator.__proto__;
      delete newProto.webdriver;
      navigator.__proto__ = newProto;
    });
    await page2.evaluateOnNewDocument(() => {
      window.navigator.chrome = {
        runtime: {},
      };
    });
    await page2.emulate(iPhone);

    await Promise.all(
      cookie.map((pair) => {
        return page2.setCookie(pair);
      })
    );
    try {
      let sosuo = [
        "最好的餐厅",
        "如何制作披萨",
        "旅游景点推荐",
        "流行音乐排行榜",
        "科技新闻更新",
        "电影推荐",
        "健康饮食",
        "时尚服饰",
        "最好的餐厅1",
        "如何制作披萨1",
        "旅游景点推荐1",
        "流行音乐排行榜1",
        "科技新闻更新1",
        "电影推荐1",
        "健康饮食1",
        "时尚服饰1",
        "最好的餐厅2",
        "如何制作披萨2",
        "旅游景点推荐2",
        "流行音乐排行榜2",
        "科技新闻更新2",
        "电影推荐2",
        "健康饮食2",
        "时尚服饰2",
        "最好的餐厅3",
        "如何制作披萨3",
        "旅游景点推荐3",
        "流行音乐排行榜3",
        "科技新闻更新3",
        "电影推荐3",
        "健康饮食3",
        "时尚服饰3",
      ];

      // 生成随机整数
      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

      let index = 0;
      while (index < 20) {
        console.log(`第${index + 1}次搜索`);
        // 汽车品牌
        var carBrands = ["福特", "本田", "丰田", "宝马", "奔驰"];
        var randomCarBrand = carBrands[getRandomInt(carBrands.length)];

        // 电影类型
        var movieGenres = ["动作", "喜剧", "恐怖", "爱情", "科幻"];
        var randomMovieGenre = movieGenres[getRandomInt(movieGenres.length)];

        // 健身训练部位
        var bodyParts = ["胸部", "背部", "肩膀", "腹部", "臀部"];
        var randomBodyPart = bodyParts[getRandomInt(bodyParts.length)];
        await Promise.all([
          page2.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 10_0_2 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 MQQBrowser/9.3.0 Mobile/14A456 Safari/602.1 MttCustomUA/2 QBWebViewType/1 WKType/1"),
          page2.setJavaScriptEnabled(true), //  允许执行 js 脚本
          page2.goto(
            `https://cn.bing.com/search?q=${encodeURIComponent(randomCarBrand + " " + randomMovieGenre + " " + randomBodyPart + " " + sosuo[index] + getRandomInt(1000))}&qs=n&form=QBRE&sp=-1&lq=0&pq=${encodeURIComponent(
              randomCarBrand + " " + randomMovieGenre + " " + randomBodyPart + " " + sosuo[index] + getRandomInt(1000)
            )}&sc=1-19&sk=&cvid=98DD1F51A42547089674D23588D78519&ghsh=0&ghacc=0&ghpl=`
          ),
        ]);
        await delay(60 * 1000);
        index++;
      }
      await page2.close();
    } catch (error) {
      await page2.close();
      console.log(error);
    }
  }

  await brower.close();
};

(async function () {
  //cookie填到这里
  let cookieArray = [];
  for (const [index, iterator] of cookieArray.entries()) {
    console.log(`账号${index + 1}开始`);
    await delay(2000);
    await bing_reward(iterator);
  }
})();
