const router = require('express').Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const defaultTimesOfTheYear = [
  'Spring',
  'Summer',
  'Fall',
  'Winter',
  'Valentines Day',
  'St. Patricks Day',
  'Easter',
  'July 4th',
  'Halloween',
  'Thanksgiving',
  'Christmas'
]

const defaultColors = [
'Orange',
'Yellow',
'Green',
'Cyan',
'Blue',
'Magenta',
'Purple',
'White',
'Black',
'Grey',
'Silver',
'Pink',
'Maroon',
'Brown',
'Beige',
'Tan',
'Peach',
'Lime',
'Olive',
'Turquoise',
'Teal',
'Navy blue',
'Indigo',
'Violet'
]

router.get('/wreaths', async (req, res, next) => {
  try {
    const wreaths = await prisma.wreath.findMany({
      include: {
        color: {
          select: {
            color: true
          }
        },
        timeoftheyear: {
          select: {
            timeoftheyear: true
          }
        },
      }
    })
    res.json({ wreaths })
  } catch (err) {
    next(err)
  }
});

router.get('/wreath', async (req, res, next) => {
  const { id } = req.query
  try {
    const wreath = await prisma.wreath.findUnique({
      where: {
        id: id
      },
      include: {
        color: {
          select: {
            color: true
          }
        },
        timeoftheyear: {
          select: {
            timeoftheyear: true
          }
        },
      }
    })
    res.json(wreath)
  } catch (err) {
    next(err)
  }
});

router.post('/wreath', async (req, res, next) => {
  try {
    const { name, size, price, color, timeoftheyear, pictureurl } = req.body

    var colorData = []
    if (color != null) {
      color.forEach(c => {
        const map = new Map()
        map.set('color', c)
        colorData.push(Object.fromEntries(map))
      })
    }

    var timeoftheyearData = []
    if (timeoftheyear != null) {
      timeoftheyear.forEach(toty => {
        const map = new Map()
        map.set('timeoftheyear', toty)
        timeoftheyearData.push(Object.fromEntries(map))
      })
    }

    const wreath = await prisma.wreath.create({
      data: {
        name: name,
        size: size,
        price: price,
        color: {
          createMany: {
            data: colorData
          }
        },
        timeoftheyear: {
          createMany: {
            data: timeoftheyearData
          }
        },
        pictureurl: pictureurl
      }
    })
    res.json(wreath)
  } catch (err) {
    next(err)
  }
});

router.post('/filterWreaths', async (req, res, next) => {
  const { minPrice, maxPrice, minSize, maxSize, timesOfTheYear, colors } = req.body
  
  var timesOfTheYearSearch = []
  
  if (timesOfTheYear.length == 0) {
    timesOfTheYearSearch = defaultTimesOfTheYear
  } else {
    timesOfTheYearSearch = timesOfTheYear
  }

  var colorsSearch = []

  if (colors.length == 0) {
    colorsSearch = defaultColors
  } else {
    colorsSearch = colors
  }

  try {
    const wreaths = await prisma.wreath.findMany({
      where: {
        price: {
          lte: maxPrice,
          gte: minPrice
        },
        size: {
          lte: maxSize,
          gte: minSize
        },
        color: {
          some: {
            color: {
              in: colorsSearch
            }
          }
        },
        timeoftheyear: {
          some: {
            timeoftheyear: {
              in: timesOfTheYearSearch
            }
          }
        }
      },
      include: {
        color: {
          select: {
            color: true
          }
        },
        timeoftheyear: {
          select: {
            timeoftheyear: true
          }
        },
      }
    })
    res.json(wreaths)
  } catch (err) {
    next(err)
  }
});

router.delete('/wreath/:id', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.patch('/wreath/:id', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

module.exports = router;
