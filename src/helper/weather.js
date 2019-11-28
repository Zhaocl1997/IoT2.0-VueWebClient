const request = require('request')

// const city = JSON.parse(localStorage.getItem('p1')).city
const city = '哈尔滨市'
const url = encodeURI('http://wthrcdn.etouch.cn/weather_mini?city=' + city)

request({ url, json: true }, (error, { body }) => {
    console.log(JSON.parse(JSON.stringify(body)));
});