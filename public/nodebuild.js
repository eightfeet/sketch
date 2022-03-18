const fs = require('fs');

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
  console.log(data);
  const modelsIndex = []
  for (let index = 1; index <= 254; index++) {
      const mdid = index < 10 ? `0${index}` : index;
      const models = [];
      for (let ind = 0; ind < data.length; ind++) {
          const element = data[ind];
          const { isClothes , isBody , isMale , isFemale , isHeader , isHandsFeet } = element;
          if (element.mdId === `md${mdid}`) {
              if (isClothes || isBody || isMale || isFemale || isHeader || isHandsFeet ) {
                  element.isStill = false
              } else {
                  element.isStill = true
              }
              if (index <= 56) {
                element.from = 'md1';
              } else if (index > 56 && index <= 248 ) {
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
  fs.writeFileSync(`./models/modelsIndex.json`, JSON.stringify(modelsIndex));
}

readData();

const build = async () => {
  const allData = await readData();
  writeData(allData)
}

build()