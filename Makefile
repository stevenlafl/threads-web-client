install:
	yarn install

artifacts:	
	# Copy artifacts for deployment
	cp -r .next/standalone/* $(ARTIFACTS_DIR)
	cp -r .next/standalone/.next $(ARTIFACTS_DIR)
	cp run.sh $(ARTIFACTS_DIR)
	mkdir -p $(ARTIFACTS_DIR)/.next/cache/images

build-NextFunction: install build artifacts