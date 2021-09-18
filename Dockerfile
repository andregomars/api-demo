FROM lucidfusion/beyond-framework:1

# Create app directory
WORKDIR /usr/src/app

# Copy extensions, one at a time. Remember to increment "--from=0" for each extension!
# COPY --from=0 /usr/src/app .

## Run extension setup for all extensions (if any)
RUN cd @beyond && count=`ls -1 *.sh 2>/dev/null | wc -l` && if [[ $count != 0 ]]; then for f in *.sh; do sh $f; done fi && cd ..

# Create a temp folder that we'll use for installing npm modules
RUN mkdir ./temp

# Install app dependencies
COPY package*.json ./temp/
RUN cd temp && npm install --only=production

# Move the node modules out of temp and merge them with the framework, then delete temp
# The crazy "2>/dev/null || :" part supressed the error if node_modules doesn't exist
RUN mv -f temp/node_modules/* node_modules/ 2>/dev/null || : && rm -rf temp

# Bundle app source
COPY ./src ./src
COPY .env* ./

# Start the app
EXPOSE 8080
CMD [ "node", "app.js" ]