# docker helper commands

# go into a psql shell inside the container
psql:
	docker exec -it factori-db psql -U postgres -d factori-db

up:
	docker compose up -d

down:
	docker compose down

logs:
	docker logs -f factori-db

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
	docker exec -i factori-db psql -U postgres -d factori-db < ${script}
