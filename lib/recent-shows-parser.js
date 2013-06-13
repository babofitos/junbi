var cheerio = require('cheerio')
  , request = require('request')

module.exports = function(url, dateFetched, cb) {
  request(url, function(err, resp, body) {
    if (err) cb(err)
    var $ = cheerio.load(body)
      , tr = $('table[summary="Recntly Started"] tr td table tr')
      , maxShows = tr.length
      , allShows = []

    function buildShowData(selector, show) {
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
            show.airtime = $this.text()
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
        , individualShow = buildShowData($(this).children().slice(1), show)

      allShows.push(individualShow)
    })
    cb(null, allShows)
  })
}