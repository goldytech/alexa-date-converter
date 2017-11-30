const axios = require('axios')
const R = require('ramda')
const getHijriFromGregorian = async (gDate) => {
 // let url = process.env.G_TO_H_URL
  let url = `https://api.aladhan.com/gToH?date=${gDate}`
  let results = await axios.get(url)
  let hijriDate = getHijriDateObject(results.data)
  console.log(hijriDate)
}

const getHijriDateObject = (obj) => {
 // return R.compose(R.pick(['hijri'], {}), R.pick(['data'], obj))
  if (obj.code === 200 && R.has('data', obj)) {
    return {
      'hijriDay': obj.data.hijri.day,
      'hijriMonth': obj.data.hijri.month.en,
      'hijriYear': obj.data.hijri.year,
      'day': obj.data.hijri.weekday.en
    }
  }
}

module.exports = getHijriFromGregorian
