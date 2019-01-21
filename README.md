# muzmatch-challenge
Full Stack Exercise Challenge: Realtime comments for a 10-hours long Youtube video
---
## How to launch the web application

Clone or download the repository and navigate to src directory:

    cd src/

### Using Docker:
1. Build the image:
```bash
    docker build -t <app-name> .
```
2. Run the image:
```bash
    docker run -it -p <your-port>:3000 <app-name>
```
3. Visit: http://localhost:<your-port>

### Without Docker:
1. Install dependecies
```bash
    npm install
```
2. Run application
```bash
    npm start
```
3. Visit: http://localhost:3000
