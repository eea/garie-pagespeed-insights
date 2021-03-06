![reports](./screenshots/garie-pagespeed-insights-logo.png 'Reports')

<p align="center">
  <p align="center">Tool to gather pagespeed-insights metrics and supports CRON jobs.<p>
</p>

**Highlights**

-   Poll for page-speed-insights performance metrics on any website and stores the data into InfluxDB
-   Get page weight data
-   View all historic reports.
-   Setup within minutes

## Overview of garie-pagespeed-insights

garie-pagespeed-insights was developed as a plugin for the [Garie](https://github.com/boyney123/garie) Architecture.

[Garie](https://github.com/boyney123/garie) is an out the box web performance toolkit, and `garie-pagespeed-insights` is a plugin that generates and stores page-speed-insights data into `InfluxDB`.

`garie-pagespeed-insights` can also be run outside the `Garie` environment and run as standalone.

If your interested in an out the box solution that supports multiple performance tools like `page-speed-insights`, `google-speed-insight` and `lighthouse` then checkout [Garie](https://github.com/boyney123/garie).

If you want to run `garie-pagespeed-insights` standalone you can find out how below.

## Getting Started

### Prerequisites

-   Docker installed

### Running garie-pagespeed-insights

You can get setup with the basics in a few minutes.

First clone the repo.

```sh
git clone https://github.com/eea/garie-pagespeed-insights.git
```

Next setup you're config. Edit the `config.json` and add websites to the list.

```javascript
{
  "plugins":{
        "pagespeed-insights":{
            "cron": "0 */4 * * *"
        }
    },
  "urls": [
    {
      "url": "https://www.eea.europa.eu/"
    },
    {
      "url": "https://biodiversity.europa.eu/"
    }
  ]
}
```

Once you finished edited your config, lets setup our environment.

```sh
docker-compose up
```

This will run the application.

On start garie-pagespeed-insights will start to gather performance metrics for the websites added to the `config.json`.

## config.json

| Property | Type                | Description                                                                          |
| -------- | ------------------- | ------------------------------------------------------------------------------------ |
| `plugins.pagespeed-insights.cron`   | `string` (optional) | Cron timer. Supports syntax can be found [here].(https://www.npmjs.com/package/cron) |
| `plugins.pagespeed-insights.retry`   | `object` (optional) | Configuration how to retry the failed tasks |
| `plugins.pagespeed-insights.retry.after`   | `number` (optional, default 30) | Minutes before we retry to execute the tasks |
| `plugins.pagespeed-insights.retry.times`   | `number` (optional, default 3) | How many time to retry to execute the failed tasks |
| `plugins.pagespeed-insights.retry.timeRange`   | `number` (optional, default 360) | Period in minutes to be checked in influx, to know if a task failed |
| `urls`   | `object` (required) | Config for browsertime. More detail below                                            |

MAX_AGE_OF_REPORT_FILES - int (default to 365), Maximum age (in days) of report files that can be deleted.
MAX_AGE_OF_REPORT_VIDEOS - int (default to 100), Maximum age (in days) of report videos that can be deleted.
CRON_DELETE_OLD_REPORTS - cronjob (default to '0 5 * * *') The frequency of checking old report files / videos.

**urls object**

| Property | Type                | Description                                |
| -------- | ------------------- | ------------------------------------------ |
| `url`    | `string` (required) | Url to get pagespeed-insights metrics for. |

For more information please go to the [garie-plugin](https://github.com/eea/garie-plugin) repo.
