# Build for production
build: node_modules
	@./node_modules/.bin/duo index.js

# Test using mocha-phantomjs(1)
test: build-test
	@./node_modules/.bin/mocha-phantomjs ./test/index.html

# Build for tests
build-test:
	@./node_modules/.bin/duo test/specs.js \
		--development \
		--stdout > ./test/build.js

# Check for problems
lint:
	@./node_modules/.bin/jshint ./lib/* \
		--reporter ./node_modules/jshint-stylish/stylish.js

# Install dependencies from npm
node_modules: package.json
	@npm install

# Clean non-checked-in files
clean:
	@rm -rf \
		node_modules \
		components \
		build \
		test/build.js

.PHONY: build build-test test lint clean
