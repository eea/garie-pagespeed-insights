const garie_plugin = require('garie-plugin')
const path = require('path');
const fs = require('fs-extra');
const dateFormat = require('dateformat');
const config = require('../config');
const express = require('express');
const bodyParser = require('body-parser');
const serveIndex = require('serve-index');
const request = require('request-promise');

const myGetData = async (item) => {
    const { url } = item.url_settings;
    return new Promise(async (resolve, reject) => {

        if (process.env.PAGESPEED_INSIGHTS_KEY === undefined) {
            return reject('Missing PAGESPEED_INSIGHTS_KEY');
        }

        try {
            const data = await request({
                uri: `https://www.googleapis.com/pagespeedonline/v4/runPagespeed?url=${url}&strategy=mobile&key=${process.env.PAGESPEED_INSIGHTS_KEY}`,
                json: true
            });
            date = new Date();
            const { reportDir } = item;
            const resultsLocation = path.join(reportDir, dateFormat(date, "isoUtcDateTime"), `/pagespeed-insights.json`);
            fs.outputJson(resultsLocation, data, {spaces: 2})
                .then(() => console.log(`Saved pagespeed-insights.json`))
                .catch(err => {
                    console.log(err)
                })

            const { pageStats } = data;
            const insightData = {};

            // convert any string values into ints
            Object.keys(pageStats).forEach(item => {
                const val = typeof pageStats[item] === 'string' ? parseInt(pageStats[item]) : pageStats[item];
                insightData[item] = val;
            });

            console.log(`Successfull got data for ${url}`);
            resolve(insightData);
        } catch (err) {
            console.log(`Failed to get data for ${url}`, err);
            reject(`Failed to get data for ${url}`);
        }
    });
};



console.log("Start");


const app = express();
app.use('/reports', express.static('reports'), serveIndex('reports', { icons: true }));

const main = async () => {
  garie_plugin.init({
    db_name:'pagespeed-insights',
    getData:myGetData,
    report_folder_name:'pagespeed-insights-results',
    plugin_name:'pagespeed-insights',
    app_root: path.join(__dirname, '..'),
    config:config
  });
}

if (process.env.ENV !== 'test') {
  app.listen(3000, async () => {
    console.log('Application listening on port 3000');
    await main();
  });
}
