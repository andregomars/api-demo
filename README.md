
## Build & Verify on local machine
1. Create .env file
```bash
cp .env.example .env
```
2. Host mysql 5.7 through docker container
```bash
docker run --name demosql -p3306:3306 -e MYSQL_ROOT_PASSWORD={password} -d mysql:5.7
```
- please replace {password} for mysql root user, and replace DB_PASSWORD value in .env file with your password

3. Install dockerkit CLI

4. Serve API from localhost:3000 by following command
```bash
dockerkit start 3000 8080
```


## API document 
https://app.swaggerhub.com/apis-docs/andregomars/api-demo/0.0.0

## API request is protected by Basic Authentication

- key: osyq1ienktfxwo0mpqo20vkei7oika1x
- secret: n7jq6bxlm38q76wawydq6canklqgajt2
