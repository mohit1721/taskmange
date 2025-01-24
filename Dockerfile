# create custom image


# A.
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci 
#ci->means, clean Install   means, dependencies ka exact version install krega, docker container m

# now, copy all codes/files[.] in src to WORKDIR[app] [ .]

COPY . .

