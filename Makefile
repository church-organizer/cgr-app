all: run
build:
	docker build -t react-wiki .

run: build
	docker run -d --name react-wiki -v ${PWD}:/app -v /app/node_modules -p 3001:3000 --rm react-wiki
	echo "Erreichbar unter 'localhost:3001'"

stop:
	docker stop react-wiki
