#! /bin/sh
USERNAME=karous
PASSWORD=karous
DOCKER=karous-couchdb

debug()
{
	echo "\033[1;38;5;184m$1\033[0m"
}

curl()
{
	docker exec -it "$DOCKER" curl -u "$USERNAME:$PASSWORD" -X PUT "$1"
}

debug "Pulling latest CouchDB image"
docker image pull couchdb:latest
debug "Running CouchDB container $DOCKER"
docker run -d -p 127.0.0.1:5984:5984 --name "$DOCKER" -e COUCHDB_USER="$USERNAME" -e COUCHDB_PASSWORD="$PASSWORD" couchdb:latest
debug "Waiting for CouchDB to start"
while ! docker exec -it "$DOCKER" curl -u "$USERNAME:$PASSWORD" "http://127.0.0.1:5984/_config/vendor/version";
	do sleep 1
done
debug "Initializing CouchDB"
curl "http://127.0.0.1:5984/_users"
curl "http://127.0.0.1:5984/_replicator"
curl "http://127.0.0.1:5984/_global_changes"
debug "Initializing karous"
./karous
debug "Done!"
