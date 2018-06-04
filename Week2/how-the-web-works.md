What is HTTP?
- Hyper Text Transfer Protocol
- defines how messages are formatted and transmitted.  It is a protocol in use across the web
- governs how clients get data from, ssend data to, a server
What is a URL?
- Uniform Resource Locator
- has different components that we must be able to identify as web developers
- Protocol, Domain, Port, Path, Parameters, Anchors
What is TCP?
- Transmission Control Protocol
- It is a lower level protocol that defines how computers send packets of data to each other
- will turn into smaller packets of data and reassemble on the other side 
What is IP?
- Internet Protocol
- governs how data is sent across a network from one computer to another
- address system of the internet
What is DNS?
- Domain Name System
- converts domain name to IP address that machine can read and understand
- think of it as a phone book for servers
What is idempotent?
- refers to an operation that can be repeated many times on a set of data and the state of the set of data will NOT change
- think of it in terms of map/forEach since it spits out new array and does not mutate original array
- GET request should be idempotent but a POST request is not.
What is a query string?
- can be passed to URL as parameters in order to change HTTP response in some way
- The query string allows you to pass key-value pairs into the URL, in the format ?key1=value1&key2=value2...
What is a path or route?
- a path or route may relate to a file that the web  server has in its hard drive 
- it is able to dynamically create, read, update, or delte
List four HTTP Verbs and their use cases.
- GET, request something.  idempotent operation designed to GET data from server
- POST, add data to a site NON-idempotent.  create data on server or modify data
- PUT, updating data that already exists on server
- DELETE, deletes data from server, not idempotent
What is a client?
- laptop, phone, user, whatever is requesting data from server
- hardware or software that access a service made available by a server
What is a server?
- computer program or device that provides functionality for other programs or devices
What is an HTTP request?
- computer will generate request and wait for response from servers
- curl in terminal is an example
- typing a URL into the URL bar is another example of sending a request to the server
What is an HTTP response?
- is an HTTP reply to a HTTP request
- servers will make responses to these requests
What is an HTTP header? Give a couple examples of request and response headers you have seen.
- it can be either a request or response header
- it is meta-information
- the analogy is that if the data we are sending is in an envelope then the headers are
- the information on the outside
- Request headers: Host, User-Agent, Accept, Cookie, Cache-Control Response headers: Content-Type, Last-Modified, Set-Cookie, Cache-Control
What is REST?
- REpresentational State Transfer
- is an architechtural style and an approach to communications that is often used in dev of web services
- its' purpose is to provide a framework for creating fast, scalable and reliable APIs.
- it is a TYPE of API, kinda like being organic food. a type of good food.
What is JSON?
- Javascript Object Notation
- format of transmitting data
- just text
- think of it almost iterchangeable with JS
- parse will get JS back from string
What happens when you type in "Hello World" in google.com and press enter?
- you are sending a 
What does it mean when we say the web is "stateless"?
- it means that it does not keep track of configuration settings and will not remember for the next session
- "does not maintain state"
- example of it is the HTTP, each request message can be understood in isolation
What is curl?
- curl allows you to send a HTTP request in the terminal
Make a GET request to the icanhazdadjoke API with curl to find all jokes involving the word "pirate." (your answer should be the curl command required).
- curl default is to send a request 
- curl https://icanhazdadjoke.com/search\?term\=pirate
