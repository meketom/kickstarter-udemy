current-dir := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))

.PHONY: test
eth-test:
	npm run test

.PHONY: compile
eth-compile:
	node ethereum/compile.js

.PHONY: deploy
eth-deploy:
	node ethereum/deploy.js

.PHONY: dev
front-dev:
	npm run dev
