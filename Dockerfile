# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: MIT-0
#FROM public.ecr.aws/amazonlinux/amazonlinux:2.0.20230307.0
#RUN yum install python3.7 -y && curl -O https://bootstrap.pypa.io/get-pip.py && python3 get-pip.py && yum update -y
#COPY . /app
#WORKDIR /app
#RUN pip3 install -r requirements.txt
#CMD ["python3", "manage.py", "runserver", "0.0.0.0:8080"]
#EXPOSE 8080
FROM python:3.9-buster

# install nginx
RUN apt-get update && apt-get install nginx vim -y --no-install-recommends
COPY nginx.default /etc/nginx/sites-available/default
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

# copy source and install dependencies
RUN mkdir -p /opt/app
RUN mkdir -p /opt/app/pip_cache
RUN mkdir -p /opt/app/haxgameweb
RUN mkdir -p /opt/app/gamePortale
RUN mkdir -p /opt/app/gamePortaleFE
COPY requirements.txt run.sh /opt/app/
COPY haxgameweb /opt/app/haxgameweb/
COPY gamePortale /opt/app/gamePortale/
COPY gamePortaleFE /opt/app/gamePortaleFE/
WORKDIR /opt/app
RUN pip install -r requirements.txt --cache-dir /opt/app/pip_cache
RUN chown -R www-data:www-data /opt/app
RUN chmod 755 /opt/app/run.sh
# start server
EXPOSE 8020
STOPSIGNAL SIGTERM
CMD ["/opt/app/run.sh"]