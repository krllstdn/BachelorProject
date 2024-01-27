run:
	export DJANGO_ENV=development \
	&& python Backend/manage.py runserver

prod-run:
	export DJANGO_ENV=production \
	&& python Backend/manage.py runserver

run-fe:
	cd Frontend && npm start

# Docker
dc-dev-up:
	docker-compose -f docker-compose-dev.yml up --build

dc-prod-up-build:
	docker compose -f docker-compose-prod.yml --env-file .prod.env up --build

dc-prod-up:
	docker compose -f docker-compose-prod.yml --env-file .prod.env up

reverse-proxy-update-dotenv:
	docker exec reverse-proxy sh -c "envsubst < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -s reload" \
	&& docker exec frontend-prod sh -c "envsubst < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -s reload"
