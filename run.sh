#!/usr/bin/env bash
# start-server.sh

python manage.py migrate

if [ -n "$DJANGO_SUPERUSER_USERNAME" ] && [ -n "$DJANGO_SUPERUSER_PASSWORD" ] ; then
    (python3 manage.py createsuperuser --no-input)
fi
(python3 manage.py runserver 8020) &
nginx -g "daemon off;"
python manage.py migrate
