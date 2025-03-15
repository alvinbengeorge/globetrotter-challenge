"use client"

import { CardFooter } from "@/components/ui/card"
import ConfettiComponent from "@/components/confetti"
import ScoreCard from "@/components/scorecard"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Check, X, HelpCircle, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function TriviaQuestion() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [currentClue, setCurrentClue] = useState(0)

  const [options, setOption] = useState([])
  const [clues, setClues] = useState([])
  const [current_id, setCurrentID] = useState("")
  const [fact, setFact] = useState("")
  const [isCorrect, setIsCorrect] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [confetti, setConfetti] = useState(false)
  const [loading, setLoading] = useState(true)
  const [correctCount, setCorrectCount] = useState(0)
  const [incorrectCount, setIncorrectCount] = useState(0)
  const [questionCount, setQuestionCount] = useState(0)
  const [showGif, setShowGif] = useState(false)
  const questionLimit = 10

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleSubmit = () => {
    fetch("http://127.0.0.1:8000/trivia/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answer: selectedAnswer,
        inserted_id: current_id,
      }),
    }).then(response => response.json()).then((data) => {
      console.log(data)
      setCorrectAnswer(data.data.city)
      setIsCorrect(data.correct)
      if (data.correct) {
        setConfetti(true)
        setCorrectCount(correctCount + 1)
        setShowResult(true)
      } else {
        setIncorrectCount(incorrectCount + 1)
        setFact(data.data.fun_fact[0])
        setShowGif(true)
        setTimeout(() => {
          setShowGif(false)
          setShowResult(true)
        }, 2000)
      }
    })
    setQuestionCount(questionCount + 1)
  }

  const handleNextClue = () => {
    if (currentClue < clues.length - 1) {
      setCurrentClue(currentClue + 1)
    }
  }

  const resetQuestion = () => {
    if (questionCount >= questionLimit) return
    setLoading(true)
    setOption([])
    setClues([])
    setCurrentClue(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setCurrentClue(0)
    fetch("http://127.0.0.1:8000/trivia").then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setOption(data.options)
          setClues(data.clues)
          setCurrentID(data.inserted_id)
        })
      }
    })
    setConfetti(false)
    setLoading(false)
  }

  const restartGame = () => {
    setCorrectCount(0)
    setIncorrectCount(0)
    setQuestionCount(0)
    setLoading(true)
    setOption([])
    setClues([])
    setCurrentClue(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setConfetti(false)
    fetch("http://127.0.0.1:8000/trivia").then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setOption(data.options)
          setClues(data.clues)
          setCurrentID(data.inserted_id)
        })
      }
    })
    setLoading(false)
  }

  useEffect(() => {
    if (questionCount < questionLimit) {
      fetch("http://127.0.0.1:8000/trivia").then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setOption(data.options)
            setClues(data.clues)
            setCurrentID(data.inserted_id)
          })
        }
      })
      setLoading(false)
    }
  }, [questionCount])

  return (
    <section className="grid place-items-center px-4 sm:px-6 lg:px-8 h-screen">
      <Card className="w-full mx-auto max-w-md sm:max-w-lg lg:max-w-2xl ">
        <div className="absolute top-2 right-2 text-sm sm:text-base text-muted-foreground">
          {questionCount} / {questionLimit} Questions
        </div>
        <CardHeader className="bg-primary/5 py-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <CardTitle className="text-base sm:text-lg lg:text-xl">Geography Trivia</CardTitle>
          </div>
          <CardDescription className="text-sm sm:text-base">Guess the place based on the clues</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {showGif ? (
            <div className="flex justify-center items-center">
              <Image src="/disintegrating-funny.gif" alt="Incorrect Answer" className="w-40 h-40" width={200} height={200}/>
            </div>
          ) : questionCount >= questionLimit ? (
            <div className="grid grid-cols-1 gap-2">
              <ScoreCard correctCount={correctCount} incorrectCount={incorrectCount} />
              <Button onClick={restartGame} variant="outline" className="w-full text-sm sm:text-base">
                Restart Game
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                {clues.slice(0, currentClue + 1).map((clue, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg text-sm sm:text-base">
                    <p>
                      <span className="font-semibold">Clue {index + 1}:</span> {clue}
                    </p>
                  </div>
                ))}
              </div>
              {currentClue < clues.length - 1 && !showResult && (
                <Button
                  variant="outline"
                  onClick={handleNextClue}
                  className="w-full flex items-center justify-center gap-1 text-sm sm:text-base"
                >
                  <HelpCircle className="h-4 w-4" />
                  Show Next Clue
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
              {!showResult ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {options.map((option) => (
                      <div
                        key={option}
                        onClick={() => handleSelectAnswer(option)}
                        className={`
                          p-4 rounded-lg border cursor-pointer transition-all text-sm sm:text-base
                          ${selectedAnswer === option
                            ? "border-primary bg-primary/10 shadow-sm"
                            : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted"
                          }
                        `}
                      >
                        <p className="font-medium text-center">{option}</p>
                      </div>
                    ))}
                  </div>
                  <Button onClick={handleSubmit} className="w-full text-sm sm:text-base" disabled={!selectedAnswer || loading}>
                    {loading ? "Loading..." : "Submit Answer"}
                  </Button>
                </div>
              ) : (
                <div
                  className={`p-4 rounded-lg text-sm sm:text-base ${isCorrect ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"
                    }`}
                >
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <>
                        <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <p className="font-medium text-green-600 dark:text-green-400">Correct! The answer is {correctAnswer}.</p>
                      </>
                    ) : (
                      <>
                        <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                        <p className="font-medium text-red-600 dark:text-red-400">
                          Incorrect. The correct answer is {correctAnswer}.
                        </p>
                      </>
                    )}
                  </div>
                  <p className="mt-2">{fact}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
        {showResult && questionCount < questionLimit && (
          <CardFooter>
            <Button onClick={resetQuestion} variant="outline" className="w-full text-sm sm:text-base">
              Try Another Question
            </Button>
          </CardFooter>
        )}
        <div className="w-full grid place-items-center">
          <div className="grid place-items-center grid-cols-2 w-fit gap-2">
            <div className="flex items-center text-green-600 dark:text-green-400">
              <Check className="h-4 w-4" />
              <p className="text-sm sm:text-base">{correctCount}</p>
            </div>
            <div className="flex items-center  text-red-600 dark:text-red-400">
              <X className="h-4 w-4" />
              <p className="text-sm sm:text-base">{incorrectCount}</p>
            </div>

          </div>
        </div>
      </Card>
      {confetti && <ConfettiComponent />}
    </section>
  )
}

