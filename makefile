migrate:
	yarn prisma migrate dev --name init
push:
	yarn prisma db push
pull:
	yarn prisma db pull 
restart:
	@make stop
	@make up
logs:
	pm2 logs gateway-sms-dg
push:
	git add .
	git commit -m "update service emit transacciones "
	git push origin dev