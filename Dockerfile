FROM node:20.14.0

WORKDIR /SkillMatch/SkillMatch-React/

COPY yarn.lock package.json ./

RUN yarn install --ignore-scripts --network-timeout=300000

COPY . .

EXPOSE 3000

#TODO: change to prod
#CMD ["yarn", "dev"]