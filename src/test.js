const getHijriFromGregorian = require('./api')

var re = async () => {
  let data = await getHijriFromGregorian('19-03-1976')
  console.log(data)
}

re()
