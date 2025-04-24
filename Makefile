# docker helper commands
# NOTE: MAKE SURE TO RUN MAKE COMMANDS FROM THE ROOT DIRECTORY OR IT WONT WORK

DB_CONTAINER=factori-db
DB_USER=postgres
DB_NAME=factori-db

# go into a psql shell inside the container
psql:
	docker exec -it $(DB_CONTAINER) psql -U $(DB_USER) -d $(DB_NAME)

up:
	docker compose up -d

down:
	docker compose down

logs:
	docker logs -f $(DB_CONTAINER)

# wipe and bring up containers again
reset:
	docker compose down -v
	docker volume prune -f
	docker compose up -d

# run a sql script (from the different dev directories), ask Arsh if you need help or have questions on how to do do this.
# but the basic idea is to run: "make run-dev script=dev/my_script.sql"
# that command will (hopefully) run the sql script specified using "sript="
run-dev:
	@echo "Running script: ${script}"
	cat ${script} | docker exec -i $(DB_CONTAINER) psql -U $(DB_USER) -d $(DB_NAME)
