# Sample chat app (Spring + React + Flux + Websockets)

### From GitHub

1. git clone https://github.com/dccarlos/chat.git
2. cd chat
3. mvn spring-boot:run
4. Open your browser in http://localhost:8080/
5. Enter any username and the password will be the choosen username folled by 'x'. i.e. username = foo, password = foox
6. Enjoy

### From Docker

*An automated build of this project was created in Docker Hub. It is based on the Dockerfile located in app's root directory*

1. `docker run -d -it -p 8080:8080 --name sample_chat_app ccordero/chat`
2. Open your browser in `http://localhost:8080/`
3. Enter any username and the password will be the choosen username folled by 'x'. i.e. `username = foo`, `password = foox`
4. Enjoy!