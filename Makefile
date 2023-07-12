# include ./frontend/.env
export
# target: 
#     @echo "test0"
#     @echo "test1"
help: ## serve for development
	@echo "Usage: make [options] [target] ..."; \
	echo "Targets:"; \
	fgrep -h '##' Makefile | awk -F'##|: ' '{printf "%40s %s\n", $$1, $$3}
	' | fgrep -v fgrep';

freshdb: 
	@echo "Reset DB"
	@cd backend && php artisan migrate:fresh
dev:
	@echo "starting Dev envirement"
	@cd frontend && npm start &
	@cd backend && php artisan serve
install: 
	@echo "Installing libraries"
	@cd backend && composer update && composer install && cp .env.example .env
	@cd frontend && npm install
	
cache_clear:
	@cd backend && php artisan cache:clear && php artisan config:cache && php artisan optimize:clear