var cheerio = require('cheerio')
  , request = require('request')
  , helpers = require('./helpers')
  , compute = require('./compute')

module.exports = function(url, dateFetched, cb) {
  request(url, function(err, resp, body) {
    if (err) cb(err)
    var $ = cheerio.load(body)
      , tr = $('table[summary="Recntly Started"] tr td table tr')
      , maxShows = tr.length
      , allShows = []

    function parseShows(selector, show) {
      selector.each(function(i, e) {
        var $this = $(this)
        switch(i) {
          case 0:
            show.name = $this.text()
            break
          case 1:
            show.season = $this.text()
            break
          case 4:
            //12 hour clock to 24 hour
            var meridiem = $this.text().slice(-2) === 'AM' ? 0 : 43200000
            //airtime should be converted from Day H:MM format to ms
            //[hour, minute]
              , time = $this.text().replace(/[a-zA-Z\s]/g, '').split(':')

            time[0] = (time[0] * 60 * 60 * 1000) + meridiem
            time[1] = time[1] * 60 * 1000

            show.airtime = time.reduce(function(prev, curr) {
              return prev + curr
            })
            break
          case 5:
            show.eps = $this.text()
            break
          case 6:
            //age should be converted from string to ms int
            //[day, hour, minute]
            var time = $this.text().trim().replace(/[a-zA-Z]/g, '').split(' ')

            time[0] = time[0] * 24 * 60 * 60 * 1000
            time[1] = time[1] * 60 * 60 * 1000
            time[2] = time[2] * 60 * 1000
            
            show.age = time.reduce(function(prev, curr) {
              return prev + curr
            })
            break
          default:
            break
        }
      })
      show.fetchedAt = dateFetched

      return show
    }
    //slice tr > th
    tr.slice(1, maxShows).each(function(index, el) {
      //this = tr
      //0 is #, slice it
      var show = {}
        , individualShow = parseShows($(this).children().slice(1), show)

      allShows.push(compute.computeShowInfo(dateFetched, individualShow))
    })
    cb(null, allShows)
  })
}