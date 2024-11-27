DOCKER_USER = dzakimaulanaasif
IMAGE_NAME = pdu-backend
TAG = v1.0

build:
	docker build -t $(DOCKER_USER)/$(IMAGE_NAME):$(TAG) .

upload: build
	docker push $(DOCKER_USER)/$(IMAGE_NAME):$(TAG)
