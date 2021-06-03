//Module file
//importing data
const { data } = require("./p4-data.js");

module.exports = {
  getQuestions,
  getAnswers,
  getQuestionsAnswers,
  getQuestion,
  getAnswer,
  getQuestionAnswer,
  addQuestionAnswer,
  updateQuestionAnswer,
  deleteQuestionAnswer,
};

function getQuestions() {
  const questionsArr = [];
  for (let i = 0; i < data.length; i++) {
    let questions = data[i].question;
    questionsArr.push(questions);
  }
  return questionsArr;
}
//console.log(getQuestions(), "getQuestions() test")
function getAnswers() {
  const answersArr = [];
  for (let i = 0; i < data.length; i++) {
    let answers = data[i].answer;
    answersArr.push(answers);
  }
  return answersArr;
}
//console.log(getAnswers(), "getAnswers() test")
function getQuestionsAnswers() {
  const copy = [...data];
  return copy;
}

//console.log(getQuestionsAnswers(), "getQuestionsAnswers() test");
function getQuestion(number = "") {
  let passQuestion = "";
  const questionObj = new Object();
  for (let i = 0; i < getQuestions().length; i++) {
    let questionSplit = getQuestions()[i].split("Q");
    if (questionSplit[1] == number) {
      passQuestion = getQuestions()[i];
    }
  }
  if (parseInt(number) <= getQuestions().length && parseInt(number) >= 1) {
    questionObj.error = "";
    questionObj.question = passQuestion;
    questionObj.number = parseInt(number);
  } else if (parseInt(number) > getQuestions().length) {
    questionObj.error = `Question number must be less than the number of questions (${
      getQuestions().length
    })`;
    questionObj.question = "";
    questionObj.number = "";
  } else if (parseInt(number) < 1) {
    questionObj.error = "Question number must be >= 1";
    questionObj.question = "";
    questionObj.number = "";
  } else {
    questionObj.error = "Question number must be an integer";
    questionObj.question = "";
    questionObj.number = "";
  }

  return questionObj;
}
//console.log(getQuestion((number = "1")), "getQuestion(num) test");

function getAnswer(number = "") {
  let passAnswer = "";
  const answerObj = new Object();
  for (let i = 0; i < getAnswers().length; i++) {
    let answerSplit = getAnswers()[i].split("A");
    if (answerSplit[1] == number) {
      passAnswer = getAnswers()[i];
    }
  }
  if (parseInt(number) <= getAnswers().length && parseInt(number) >= 1) {
    answerObj.error = "";
    answerObj.answer = passAnswer;
    answerObj.number = parseInt(number);
  } else if (parseInt(number) > getAnswers().length) {
    answerObj.error = `Answer number must be less than the number of questions (${
      getAnswers().length
    })`;
    answerObj.answer = "";
    answerObj.number = "";
  } else if (parseInt(number) < 1) {
    answerObj.error = "Answer number must be >= 1";
    answerObj.answer = "";
    answerObj.number = "";
  } else {
    answerObj.error = "Answer number must be an integer";
    answerObj.answer = "";
    answerObj.number = "";
  }
  return answerObj;
}
//console.log(getAnswer((number = "2")), "getAnswer(num) test");

function getQuestionAnswer(number = "") {
  let passQuestion2 = getQuestion(number).question;
  let passAnswer2 = getAnswer(number).answer;
  const questionAnswerObj = new Object();
  if (parseInt(number) <= getQuestions().length && parseInt(number) >= 1) {
    questionAnswerObj.error = "";
    questionAnswerObj.question = passQuestion2;
    questionAnswerObj.answer = passAnswer2;
    questionAnswerObj.number = parseInt(number);
  } else if (parseInt(number) > getQuestions().length) {
    questionAnswerObj.error = `Question number must be less than the number of questions (${
      getQuestions().length
    })`;
    questionAnswerObj.question = "";
    questionAnswerObj.answer = "";
    questionAnswerObj.number = "";
  } else if (parseInt(number) < 1) {
    questionAnswerObj.error = "Question number must be >= 1";
    questionAnswerObj.question = "";
    questionAnswerObj.answer = "";
    questionAnswerObj.number = "";
  } else {
    questionAnswerObj.error = "Answer number must be an integer";
    questionAnswerObj.question = "";
    questionAnswerObj.answer = "";
    questionAnswerObj.number = "";
  }
  return questionAnswerObj;
}
//console.log(getQuestionAnswer((number = "1")), "getQuestionAnswer(num) test");

//Add Question Answer
function addQuestionAnswer(info = {}) {
  if (info.question != undefined && info.answer != undefined) {
    data.push(info);
    let number = info.question.split("Q");
    return { error: "", message: "Question added", number: parseInt(number[1]) };
  } else if (info.question == undefined && info.answer != undefined) {
    return {
      error: "Object question property required",
      message: "",
      number: -1,
    };
  } else if (info.answer == undefined && info.question != undefined) {
    return {
      error: "Object answer property required",
      message: "",
      number: -1,
    };
  } else {
    return {
      error: "Object question property required",
      message: "",
      number: -1,
    };
  }
}
//console.log(data.question.split("Q"))
//Update Question Answer
function updateQuestionAnswer(info = {}) {
  if (
    info.question != undefined &&
    info.answer != undefined &&
    info.number <= data.length
  ) {
    for (let i = 0; i < getQuestions().length; i++) {
      let questionSplit = getQuestions()[i].split("Q");
      if (questionSplit[1] == info.number) {
        data[i].question = info.question;
        data[i].answer = info.answer;
      }
    }
    return {
      error: "",
      message: `Question ${info.number} updated`,
      number: parseInt(info.number),
    };
  } else if (info.question != undefined && info.answer != undefined) {
    return {
      error: "Object number property must be a valid integer",
      message: "",
      number: "",
    };
  } else if (info.question == undefined && info.answer != undefined) {
    return {
      error: "Object number property must be a valid integer",
      message: "",
      number: "",
    };
  } else if (info.answer == undefined && info.question != undefined) {
    return {
      error: "Object number property must be a valid integer",
      message: "",
      number: "",
    };
  } else {
    return {
      error: "Object question property or answer property required",
      message: "",
      number: "",
    };
  }
}

//Delete Question Answer
function deleteQuestionAnswer(info = {}) {
  if (info <= data.length && info >= 1) {
    for (let i = 0; i < getQuestions().length; i++) {
      let questionSplit = getQuestions()[i].split("Q");
      if (questionSplit[1] == info) {
        let removed = getQuestions()[i];
        data.splice(removed, 1);
      }
    }
    return {
      error: "",
      message: `Question ${info} deleted`,
      number: parseInt(info),
    };
  } else if (info.number < 1) {
    return {
      error: "Question/answer number must be >= 1",
      message: "",
      number: "",
    };
  } else {
    return {
      error: "Question/Object number property must be a valid integer",
      message: "",
      number: "",
    };
  }
}

/*****************************
  Module function testing
******************************/
function testing(category, ...args) {
  console.log(`\n** Testing ${category} **`);
  console.log("-------------------------------");
  for (const o of args) {
    console.log(`-> ${category}${o.d}:`);
    console.log(o.f);
  }
}

// Set a constant to true to test the appropriate function
const testGetQs = false;
const testGetAs = false;
const testGetQsAs = false;
const testGetQ = false;
const testGetA = false;
const testGetQA = false;
const testAdd = false; // Extra credit
const testUpdate = false; // Extra credit
const testDelete = false; // Extra credit

// getQuestions()
if (testGetQs) {
  testing("getQuestions", { d: "()", f: getQuestions() });
}

// getAnswers()
if (testGetAs) {
  testing("getAnswers", { d: "()", f: getAnswers() });
}

// getQuestionsAnswers()
if (testGetQsAs) {
  testing("getQuestionsAnswers", { d: "()", f: getQuestionsAnswers() });
}

// getQuestion()
if (testGetQ) {
  testing(
    "getQuestion",
    { d: "()", f: getQuestion() }, // Extra credit: +1
    { d: "(0)", f: getQuestion(0) }, // Extra credit: +1
    { d: "(1)", f: getQuestion(1) },
    { d: "(4)", f: getQuestion(4) } // Extra credit: +1
  );
}

// getAnswer()
if (testGetA) {
  testing(
    "getAnswer",
    { d: "()", f: getAnswer() }, // Extra credit: +1
    { d: "(0)", f: getAnswer(0) }, // Extra credit: +1
    { d: "(1)", f: getAnswer(1) },
    { d: "(4)", f: getAnswer(4) } // Extra credit: +1
  );
}

// getQuestionAnswer()
if (testGetQA) {
  testing(
    "getQuestionAnswer",
    { d: "()", f: getQuestionAnswer() }, // Extra credit: +1
    { d: "(0)", f: getQuestionAnswer(0) }, // Extra credit: +1
    { d: "(1)", f: getQuestionAnswer(1) },
    { d: "(4)", f: getQuestionAnswer(4) } // Extra credit: +1
  );
}

// addQuestionAnswer()
if (testAdd) {
  testing(
    "addQuestionAnswer",
    { d: "()", f: addQuestionAnswer() },
    { d: "({})", f: addQuestionAnswer({}) },
    { d: '(question: "Q4")', f: addQuestionAnswer({ question: "Q4" }) },
    { d: '(answer: "A4")', f: addQuestionAnswer({ answer: "A4" }) },
    {
      d: '(question: "Q4", answer: "A4")',
      f: addQuestionAnswer({ question: "Q4", answer: "A4" }),
    }
  );
}

// updateQuestionAnswer()
if (testUpdate) {
  testing(
    "updateQuestionAnswer",
    { d: "()", f: updateQuestionAnswer() },
    { d: "({})", f: updateQuestionAnswer({}) },
    { d: '(question: "Q1U")', f: updateQuestionAnswer({ question: "Q1U" }) },
    { d: '(answer: "A1U")', f: updateQuestionAnswer({ answer: "A1U" }) },
    {
      d: '(question: "Q1U", answer: "A1U")',
      f: updateQuestionAnswer({ question: "Q1U", answer: "A1U" }),
    },
    {
      d: '(number: 1, question: "Q1U", answer: "A1U")',
      f: updateQuestionAnswer({ number: 1, question: "Q1U", answer: "A1U" }),
    }
  );
  console.log(data);
}

// deleteQuestionAnswer()
if (testDelete) {
  testing(
    "deleteQuestionAnswer",
    { d: "()", f: deleteQuestionAnswer() },
    { d: "(0)", f: deleteQuestionAnswer(0) },
    { d: "(1)", f: deleteQuestionAnswer(1) },
    { d: "(0)", f: deleteQuestionAnswer(4) }
  );
  console.log(data);
}
