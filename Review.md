# Review Questions

## What is Node.js?

Answer: Node.js is a JS runtime environment that allows you to run JS outside of the browser. It is used to do back-end development in JS, allowing for both front-end and back-end to be written in the same language.

## What is Express?

Answer: Express is a framework that sits on top of Node.js and makes it simpler to develop the server-side architecture for your web application. It helps reduce the amount of code needed to do things like build RESTful APIs by making things like routing really simple.

## Mention two parts of Express that you learned about this week.

Answer: Routing and middleware.

## What is Middleware?

Answer: Middleware refers to functions within Express that have access to the HTTP request and response object and the next middleware function in the chain. Basically almost everything we do in Express, including routing, is technically middleware under the hood.

## What is a Resource?

Answer: A resource is basically anything that can be obtained on the web. URLs are what point to particular web resources.

## What can the API return to help clients know if a request was successful?

Answer: HTTP status codes.

## How can we partition our application into sub-applications?

Answer: by using Express Routers.  

## What is express.json() and why do we need it?

Answer: express.json() is a piece of Express middleware that we need to be able to parse JSON content out of the request body. 
