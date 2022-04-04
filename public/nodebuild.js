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
        const newCurrentData = [];
        currentData.forEach(currentDataItem => {
          const { mdId, imgUrl, from } = currentDataItem;
          const resdata = {
            mdId, imgUrl, from, tags: [],
          }
          const tages = ['isX', 'isY', 'isClothes', 'isBody', 'isMale', 'isFemale', 'isHeader', 'isHandsFeet', 'isHalf', 'isGroup', 'isStill', 'isVideo', 'isStructure'];
          tages.forEach(condition => {
            if (currentDataItem[condition]) {
              resdata.tags.push(condition.replace('is',''))
            }
              
          })
          newCurrentData.push(resdata)
        })

        


        // mdId
        // * imgUrl: 'md11/767-x&600&500.png',
        // isX: true,
        // isY: false,
        // isClothes: false,
        // isBody: false,
        // isMale: false,
        // isFemale: false,
        // isHeader: false,
        // isHandsFeet: false,
        // isHalf: false,
        // isGroup: false,
        // mdId: 'md67',
        // selected: false,
        // isStill: false,
        // isStructure: true,
        // from: 'md4'

        // console.log(333, Array.isArray(currentData));
        allData = allData.concat(newCurrentData)
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
    for (let index = 1; index <= 268; index++) {
      const mdid = index < 10 ? `0${index}` : index;
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

  for (let index = 57; index <= 67; index++) {
    fs.readFile(`./data/models${index}.json`, 'utf8', (fileerr, data) => {
      if (fileerr) {
        throw fileerr
      }
      const currentData = JSON.parse(data);
      modelsIndex.push(currentData[0]);
    })
    fs.copyFile(`./data/models${index}.json`, `./models/models${index}.json`, function (err) {
      if (err) {
        console.log(err)
      }
    });
  }

  delDir('./contents')
  fs.mkdir('./contents', function (error) {
    if (error) {
      console.log(error)
      return;
    }
    setTimeout(() => {
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
    }, 1000);
  })
}

readData();

const build = async () => {
  const allData = await readData();
  writeData(allData)
}

build()