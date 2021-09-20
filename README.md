
## Build & Verify on local machine
1. Download source code to local machine
git clone https://github.com/andregomars/api-demo.git

2. Create .env file
```bash
cp .env.example .env
```

3. Apply Spotify developer account and put client id and secret on following sections in the .env file. 
SPOTIFY_OAUTH_CLIENT_ID=
SPOTIFY_OAUTH_CLIENT_SECRET=

4. Host mysql 5.7 through docker container
```bash
docker run --name demosql -p3306:3306 -e MYSQL_ROOT_PASSWORD={password} -d mysql:5.7
```
- please replace {password} for mysql root user, and replace DB_PASSWORD value in .env file with your password

5. Log in mysql by localhost port 3306 and root user credential, then create database name as `track-service`

6. Install dockerkit CLI （sudo if failed because npm permission)
```bash
npm install -g git+ssh://git@github.com:andregomars/dockerkit.git
```

7. Serve API from localhost:3000 by following command
```bash
dockerkit start 3000 8080
```

8. Use Postman to test listed APIs according to following document and auth instructions to verify the functionalities.

## API document 
https://app.swaggerhub.com/apis-docs/andregomars/api-demo/0.0.0


## Endpoints
- GET /import/:isrc
- GET /track/by_isrc/:isrc
- GET /track/by_artist/:isrc

## API request is protected by Basic Authentication
- Either by calling api with auth header
```bash
curl --location --request GET 'localhost:3000/track/by_artist/The%20Beatles' \
--header 'Authorization: Basic b3N5cTFpZW5rdGZ4d28wbXBxbzIwdmtlaTdvaWthMXg6bjdqcTZieGxtMzhxNzZ3YXd5ZHE2Y2Fua2xxZ2FqdDI='
```
- Or by input foolowing url in the browser address bar
http://osyq1ienktfxwo0mpqo20vkei7oika1x:n7jq6bxlm38q76wawydq6canklqgajt2@localhost:3000/track/by_artist/The%20Beatles


- Basic Authorization key & secret for the demo
  - key: osyq1ienktfxwo0mpqo20vkei7oika1x
  - secret: n7jq6bxlm38q76wawydq6canklqgajt2
