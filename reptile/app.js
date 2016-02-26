var express = require('express'),
    superagent = require('superagent'),
    cheerio = require('cheerio'),
    eventproxy = require('eventproxy'),
    url = require('url');

var app = express();
var ep = new eventproxy();

app.get('/reptile', function(req, res, next) {
    var condeUrl = req.query.url;
    //爬取页面
    superagent.get(condeUrl)
    .end(function(err, sres) {
        if (err) {
            console.log('error is: ' + err.message);
        }

        var $ = cheerio.load(sres.text);
        var topicUrls = [];
        $('.topic_title').each(function() {
            var topicUrl = 'http://' + condeUrl + $(this).attr('href');
            topicUrls.push(topicUrl);
        });

        //监听40次回调
        ep.after('topic_html', topicUrls.length, function(topics) {
            var resArr = [];
            topics.forEach(function(topicObj) {
                var topicUrl = topicObj[0];
                var topicHtml = topicObj[1];
                var $ = cheerio.load(topicHtml);
                resArr.push({
                    'title': $('.topic_full_title').text().trim(),
                    'url': topicUrl,
                    'author1': $('.user_info').eq(0).find('.dark').text().trim(),
                    'comment1': $('.reply_content').eq(0).text().trim()
                });
            });

            res.send(resArr);
        });

        topicUrls.forEach(function(topicUrl, index) {
            superagent.get(topicUrl)
            .end(function(err, data) {
                if (err) {
                    console.log('error is: ' + err.message);
                    console.log('error url is: ' + topicUrl);
                }
                //发送一次emit
                ep.emit('topic_html', [topicUrl, data.text]);
            });
        });
    });
});

app.listen(3000, function() {
    console.log('reptile listen at port 3000!');
});