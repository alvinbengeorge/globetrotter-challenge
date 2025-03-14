"use client"

import { CardFooter } from "@/components/ui/card"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Check, X, HelpCircle, ChevronRight } from "lucide-react"

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
      setFact(data.data.fun_fact[0])
    })
    setShowResult(true)
  }

  const handleNextClue = () => {
    if (currentClue < clues.length - 1) {
      setCurrentClue(currentClue + 1)
    }
  }

  const resetQuestion = () => {
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
  }

  useEffect(() => {
    fetch("http://127.0.0.1:8000/trivia").then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setOption(data.options)
          setClues(data.clues)
          setCurrentID(data.inserted_id)
        })
      }
    })
  }, [])

  return (
    <section className="grid place-items-center h-screen">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <CardTitle>Geography Trivia</CardTitle>
          </div>
          <CardDescription>Guess the place based on the clues</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              {clues.slice(0, currentClue + 1).map((clue, index) => (
                <div key={index} className="p-3 bg-muted rounded-lg">
                  <p className="text-sm">
                    <span className="font-semibold">Clue {index + 1}:</span> {clue}
                  </p>
                </div>
              ))}
            </div>

            {currentClue < clues.length - 1 && !showResult && (
              <Button
                variant="outline"
                onClick={handleNextClue}
                className="w-full flex items-center justify-center gap-1"
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
                        p-4 rounded-lg border cursor-pointer transition-all
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

                <Button onClick={handleSubmit} className="w-full" disabled={!selectedAnswer}>
                  Submit Answer
                </Button>
              </div>
            ) : (
              <div
                className={`p-4 rounded-lg ${isCorrect ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"}`}
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
                <p className="mt-2 text-sm">
                  {fact}
                </p>
              </div>
            )}
          </div>
        </CardContent>
        {showResult && (
          <CardFooter>
            <Button onClick={resetQuestion} variant="outline" className="w-full">
              Try Another Question
            </Button>
          </CardFooter>
        )}
      </Card>
    </section>
  )
}

