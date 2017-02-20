all: lint test build

lint:
	@./node_modules/.bin/jshint index.js test/*.js

test:
	@./node_modules/.bin/mocha \
		--reporter spec

clean:
	rm -fr build components template.js

.PHONY: clean test lint
