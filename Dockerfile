FROM harbor.cloudwise.com/arch/tengine:latest

MAINTAINER celia.du@cloudwise.com

COPY --chown=commonuser:commonuser doucWeb /data/app/doucWeb

RUN ln -sfn /data/app/doucWeb/* /data/app/tengine/html

USER commonuser