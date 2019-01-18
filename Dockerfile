FROM node:8.10.0

RUN mkdir -p /usr/src/garie-pagespeed-insights

WORKDIR /usr/src/garie-pagespeed-insights

COPY package.json config.json /usr/src/garie-pagespeed-insights/

COPY src/ /usr/src/garie-pagespeed-insights/src/

RUN ls -ltr /usr/src/garie-pagespeed-insights/

RUN npm install --only=production

COPY docker-entrypoint.sh /docker-entrypoint.sh

EXPOSE 3000

VOLUME ["/usr/src/garie-pagespeed-insights/reports", "/usr/src/garie-lighthouse/logs"]

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["npm", "start"]
