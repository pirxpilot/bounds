check: lint test

lint:
	./node_modules/.bin/jshint index.js test

test:
	node --test

distclean:
	rm -fr node_modules

.PHONY: distclean test lint check
