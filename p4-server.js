// Server file 


//Import fastify
const fastify = require("fastify")();
//Importing functions
const { getQuestions,
    getAnswers,
    getQuestionsAnswers,
    getQuestion,
    getAnswer,
    getQuestionAnswer,
    addQuestionAnswer,
    updateQuestionAnswer,
    deleteQuestionAnswer } = require("./p4-module.js");
const port = 8080;

//Home Page Route
fastify.get("/", (request, reply) => {

    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send(
        `<h2>Hello World!</h2><h3>Welcome to Sydnee's Project 4</h3>`
      );
  });

//Question route
fastify.get("/cit/question", (request, reply) => {
    const obj1 = new Object;
    obj1.error = "";
    obj1.statusCode = 200;
    obj1.questions = getQuestions();
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(
        obj1
      );
  });
//Answer route
fastify.get("/cit/answer", (request, reply) => {
    const obj2 = new Object;
    obj2.error = "";
    obj2.statusCode = 200;
    obj2.answers = getAnswers();
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(
      obj2
    );
});

// Question Answer Route
fastify.get("/cit/questionanswer", (request, reply) => {
const obj3 = new Object;
obj3.error = "";
obj3.statusCode = 200;
obj3.questions_answers = getQuestionsAnswers();
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(
        obj3
      );
  });

  //Question Num route
fastify.get("/cit/question/:number", (request, reply) => {
let numberFromClient = request.params.number
const questionResponse = getQuestion(numberFromClient);
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(
        {error:questionResponse.error, statusCode:200, question:questionResponse.question, number:questionResponse.number}
      );
  });
//Answer Num route
fastify.get("/cit/answer/:number", (request, reply) => {
    let numberFromClient = request.params.number
    const answerResponse = getAnswer(numberFromClient);
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(
        {error:answerResponse.error, statusCode:200, answer:answerResponse.answer, number:answerResponse.number}
    );
});

// Question Answer Num Route
fastify.get("/cit/questionanswer/:number", (request, reply) => {
    let numberFromClient = request.params.number
    const questionAnswerResponse = getQuestionAnswer(numberFromClient);
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(
        {error:questionAnswerResponse.error, statusCode:200, question:questionAnswerResponse.question, answer:questionAnswerResponse.answer, number:questionAnswerResponse.number}
      );
  });

//An undefined/wildcard route
fastify.get("*", (request, reply) => {
    reply
      .code(404)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({error:"Route not found", statusCode:404});
  });

//Post extra credit route
fastify.post("/cit/question", (request, reply) =>  {
    const {question, answer} = request.body;
    const addQuestionResponse = addQuestionAnswer(request.body)
    reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({error:"", statusCode:201, number:addQuestionResponse.number});
});

//Put extra credit route
fastify.put("/cit/question", (request, reply) => {
    const {question, answer} = request.body;
    const updateQuestionResponse = updateQuestionAnswer(request.body)
    reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({error:"", statusCode:200, number:updateQuestionResponse.number});
})

//Delete extra credit route
fastify.delete("/cit/question/:number", (request, reply) => {
    const {number} = request.params;
    const deleteQuestionResponse = deleteQuestionAnswer(number);
    reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({error:"", statusCode:200, number:deleteQuestionResponse.number});
})
//Fastify listening
const listenIP = "localhost";
fastify.listen(port, listenIP, () => {
  console.log(`Server listening on http://${listenIP}:${port}`);
});