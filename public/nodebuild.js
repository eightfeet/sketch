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

      if (file.indexOf('.json') > 0) {
        fs.readFile(`./data/${file}`, 'utf8', (fileerr, data) => {
          if (fileerr) {
            throw fileerr
          }
          const currentData = JSON.parse(data);
          // 改造历史数据
          const newCurrentData = [];
          currentData.forEach(currentDataItem => {
            const { mdId, imgUrl, from } = currentDataItem;
            const resdata = {
              mdId, imgUrl, from, tags: [],
            }
            const tages = ['isX', 'isY', 'isClothes', 'isBody', 'isMale', 'isFemale', 'isHeader', 'isHandsFeet', 'isHalf', 'isGroup', 'isStill', 'isVideo', 'isStructure'];
            tages.forEach(condition => {
              if (currentDataItem[condition]) {
                resdata.tags.push(condition.replace('is', ''))
              }
            })
            newCurrentData.push(resdata)
          })
          allData = allData.concat(currentData)
          resolve();
        })
      } else {
        resolve();
      };

    })
  }
  return allData;
}

const writeData = async (data) => {
  const pageSize = 10;
  const modelsIndex = []
  delDir('./models')
  fs.mkdir('./models', function (error) {
    if (error) {
      console.log(error)
      return;
    }
    for (let index = 1; index <= 1000; index++) {
      const mdid = index < pageSize ? `0${index}` : index;
      const models = [];
      for (let ind = 0; ind < data.length; ind++) {
        const element = data[ind];
        // const { isStill } = element;
        if (element.mdId === `md${mdid}` && element.from !== 'md4') {
          // element.isStill = false
          // if (isStill) {
          //   element.isStill = true
          // }
          if (index <= 56) {
            element.from = 'md1';
          } else if (index > 56 && index <= 248) {
            element.from = 'md2'
          } else if (!element.from) {
            element.from = 'md3'
          };
          models.push(element)
        }

        if (index >= 57 && index <= 67 && element.mdId === `md${mdid}` && element.from === 'md4') {
          const md4data = { "mdId": element.mdId, "imgUrl": element.imgUrl, "from": 'md4', "tags": [(element.isX ? "X" : "Y"), "Structure"] }
          models.push(md4data)
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
    setTimeout(() => {
      let contentsdata = [];
      let page = 1;
      const max = modelsIndex.length % pageSize;
      let total = Math.floor(modelsIndex.length/pageSize);
      if (max) {
        total = total + 1
      }
      modelsIndex.forEach((element, index) => {
        const indfloat = (index + 1) % pageSize;
        contentsdata.push(element)
        if (indfloat === 0 || index + 1 === modelsIndex.length) {
          fs.writeFileSync(`./contents/modelsIndex_${page}.json`, JSON.stringify({items: contentsdata, total: total}));
          contentsdata = [];
          page = page + 1;
        }
      });
      console.log(max);
    }, 1000);
  })
}

readData();

const build = async () => {
  const allData = await readData();
  writeData(allData)
}

build()