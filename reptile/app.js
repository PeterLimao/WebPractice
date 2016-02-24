var express = require('express'),
    superagent = require('superagent'),
    cheerio = require('cheerio'),
    eventproxy = require('eventproxy'),
    url = require('url');

var app = express();
var ep = new eventproxy();

app.get('/reptile', function(req, res, next) {
    var condeUrl = req.query.url;

    console.log(condeUrl);
    //爬取页面
    superagent.get(condeUrl)
    .end(function(err, sres) {
        if (err) {
            console.log(err.message);
        }

        var $ = cheerio.load(sres.text);
        var topicUrls = [];
        $('.topic_title').each(function() {
            var topicUrl = 'http://' + condeUrl + $(this).attr('href');
            topicUrls.push(topicUrl);
        });

        //监听40次回调
        ep.after('topic_html', topicUrls.length, function(topics) {
            console.log(topics);
        });

        topicUrls.forEach(function(topic) {
            superagent.get(topic)
            .end(function(err, data) {
                if (err) {
                    console.log(err.message);
                }
            });
        });
        res.send('ok');
    });
});

app.listen(3000, function() {
    console.log('reptile listen at port 3000!');
});