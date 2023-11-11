const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "Em que ano nasceu Jaqueline Goes?",
    answers: [
      { text: "2000", correct: false },
      { text: "1990", correct: false },
      { text: "1989", correct: true },
      { text: "1979", correct: false }
    ]
  },
  {
    question: "Jaqueline Goes foi responsável pelo sequenciamento do genoma de qual vírus?",
    answers: [
      { text: "SARS-CoV-2", correct: true },
      { text: "SARS4", correct: false },
      { text: "COVID", correct: false },
      { text: "H1N1", correct: false }
    ]
  },
  {
    question: 'Qual a idéia do projeto "Donas da Rua"?',
    answers: [
      { text: 'Celebrar e homenagear mulheres relevantes na ciência', correct: true },
      { text: 'Nenhuma, é uma brincadeira de criança', correct: false },
      { text: 'Homenagear mulheres de rua', correct: false },
      { text: "Projeto para ajudar mulheres de rua", correct: false }
    ]
  },
  {
    question: 'Jaqueline Goes de Jesus é uma biomédica, doutora em patologia humana e pesquisadora brasileira.',
    answers: [
      { text: "Verdadeiro", correct: true },
      { text: "Falso", correct: false }
    ]
  },
  {
    question: 'Em qual cidade nasceu Jaqueline Goes?',
    answers: [
      { text: 'São Paulo', correct: false },
      { text: 'Salvador', correct: true },
      { text: 'Rio de Janeiro', correct: false },
      { text: 'Fortaleza', correct: false }
    ]
  }
 
]