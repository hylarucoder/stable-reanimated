# Makefile

# Default type of release
TYPE = patch

# Get the current version from package.json
VERSION = $(shell node -p "require('./package.json').version")

# Shortcut for patch, minor, and major releases
.PHONY: patch minor major
patch minor major:
	npm version $(TYPE)
	# $(MAKE) release TYPE=$@
	
# Bump version and tag
.PHONY: release
release:
	git push origin main --tags
