#!/bin/sh
set -e


if [ -n "$CONFIG" ]; then
	echo "Found configuration variable, will write it to the /usr/src/garie-pagespeed-insights/config.json"
	echo "$CONFIG" > /usr/src/garie-pagespeed-insights/config.json
fi

exec "$@"
