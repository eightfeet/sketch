const fs = require('fs');

function delDir(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      //判断是否是文件夹
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath); //递归删除文件夹
      } else {
        //是文件的话说明是最后一层不需要递归 
        fs.unlinkSync(curPath); //删除文件
      }
    });
    fs.rmdirSync(path);
  }
}

const readData = async () => {
  const files = await new Promise((resolve) => {
    fs.readdir('./data',
      {}, async (err, allfiles) => {
        if (err) {
          throw err;
        }
        resolve(allfiles);
      })
  })

  let allData = []
  for (let index = 0; index < files.length; index++) {
    // eslint-disable-next-line no-loop-func
    await new Promise(resolve => {
      const file = files[index];
      fs.readFile(`./data/${file}`, 'utf8', (fileerr, data) => {
        if (fileerr) {
          throw fileerr
        }
        const currentData = JSON.parse(data);
        allData = allData.concat(currentData)
        resolve();
      })
    })
  }
  return allData;
}

const writeData = async (data) => {

  console.log(data.imgUrl);
  const modelsIndex = []
  delDir('./models')
  fs.mkdir('./models', function (error) {
    if (error) {
      console.log(error)
      return;
    }
    for (let index = 1; index <= 254; index++) {
      const mdid = index < 10 ? `0${index}` : index;
      const models = [];
      for (let ind = 0; ind < data.length; ind++) {
        const element = data[ind];
        const { isClothes, isBody, isMale, isFemale, isHeader, isHandsFeet } = element;
        if (element.mdId === `md${mdid}`) {
          if (isClothes || isBody || isMale || isFemale || isHeader || isHandsFeet) {
            element.isStill = false
          } else {
            element.isStill = true
          }
          if (index <= 56) {
            element.from = 'md1';
          } else if (index > 56 && index <= 248) {
            element.from = 'md2'
          } else {
            element.from = 'md3'
          };
          models.push(element)
        }
      }

      if (models.length) {
        fs.writeFileSync(`./models/models${mdid}.json`, JSON.stringify(models), {

        });
        modelsIndex.push(models[0]);
      };
    }
  })

  delDir('./contents')
  fs.mkdir('./contents', function (error) {
    if (error) {
      console.log(error)
      return;
    }
    let contentsdata = [];
    let page = 1;
    modelsIndex.forEach((element, index) => {
      const indfloat = (index + 1) % 10;
      contentsdata.push(element)
      if (indfloat === 0 || index + 1 === modelsIndex.length) {
        fs.writeFileSync(`./contents/modelsIndex_${page}.json`, JSON.stringify(contentsdata));
        contentsdata = [];
        page = page + 1;
      }
    });
  })



}

readData();

const build = async () => {
  const allData = await readData();
  writeData(allData)
}

build()