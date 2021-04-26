FROM ubuntu:20.04
ENV DEBIAN_FRONTEND noninteractive

# Install dependencies
RUN apt-get update && apt-get install -y --no-install-recommends apt-utils
RUN apt-get update && apt-get install -y software-properties-common
RUN add-apt-repository universe
RUN apt-get update && apt-get install -y curl wget

RUN curl -sL https://deb.nodesource.com/setup_14.x| bash
RUN apt-get install nodejs -y
RUN apt-get install build-essential -y

# Work Directory
RUN mkdir -p /usr/src/file_uploader
WORKDIR /usr/src/file_uploader
COPY ["package.json", "./"]

#Envirenment Variables
ENV NODE_ENV staging

#Metadata
LABEL version="1.5.0-d"
LABEL description="Typical file uploader to MongoDB GridFS."
LABEL maintainer "houssem.yahiaoui.ai@gmail.com"

# Install Backend Depedencies
RUN  cd /usr/src/file_uploader &&  npm i

# Copy and Install Packages
COPY . .

EXPOSE 3001

ADD build.sh /usr/src/file_uploader/
RUN ["chmod", "+x", "/usr/src/file_uploader/build.sh"]
ENTRYPOINT ["/usr/src/file_uploader/build.sh"]