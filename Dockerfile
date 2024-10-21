FROM node:20.14.0

WORKDIR /SkillMatch/SkillMatch-React/

COPY yarn.lock package.json ./
RUN yarn install

#RUN npx next build
EXPOSE 3000

#TODO: change to prod
# CMD ["yarn", "dev"]
