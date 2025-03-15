"use client"

import { Suspense } from "react"
import { CardFooter } from "@/components/ui/card"
import Leaderboard from "@/components/leaderboard"
import ConfettiComponent from "@/components/confetti"
import ScoreCard from "@/components/scorecard"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Check, X, HelpCircle, ChevronRight, Share, Trophy } from "lucide-react"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import { useSearchParams } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

function TriviaQuestionContent({ queryParam }: { queryParam: string | null }) {
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
  const [nameUpdated, setNameUpdated] = useState(false)
  const questionLimit = 10

  const [showNamePopup, setShowNamePopup] = useState(false)
  const [showUrlPopup, setShowUrlPopup] = useState(false)
  const [name, setName] = useState("")
  const [shareUrl, setShareUrl] = useState("")
  const [showLeaderboard, setShowLeaderboard] = useState(queryParam ? true : false) // State for leaderboard dialog

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleSubmit = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/trivia/verify`, {
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
  }

  const handleNextClue = () => {
    if (currentClue < clues.length - 1) {
      setCurrentClue(currentClue + 1)
    }
  }

  const shareButton = () => {
    if (!nameUpdated) {
      setShowNamePopup(true)
    } else {
      setShowUrlPopup(true)
    }
  }

  const handleNameSubmit = () => {
    if (name.trim()) {
      setShowNamePopup(false)
      setShowUrlPopup(true)
    }
    if (queryParam) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/game/${queryParam}`,{ 
          method: "POST", 
          headers: { "Content-Type": "application/json" }, 
          body: JSON.stringify({ 
            username: name, 
            correctAnswers: correctCount, 
            wrongAnswers: incorrectCount 
          }) 
        }
      ).then(response => response.json()).then((data) => {
        console.log(data)
        setShareUrl(`https://globetrotter-challenge-alvinbengeorge.vercel.app/game?game=${data.game_id}`)
      })
    } else {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/game`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: name,
          correctAnswers: correctCount,
          wrongAnswers: incorrectCount,
        }),
      }).then(response => response.json()).then((data) => {
        setShareUrl(`https://globetrotter-challenge-alvinbengeorge.vercel.app/game?game=${data.game_id}`)
      })        
    }
    setNameUpdated(true)
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shareUrl)
    alert("URL copied to clipboard!")
    setShowUrlPopup(false)
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
    setConfetti(false)
    setLoading(false)
    setQuestionCount(questionCount + 1)
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
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/trivia`).then((response) => {
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
    console.log(queryParam)
    if (questionCount < questionLimit) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/trivia`).then((response) => {
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
  }, [questionCount, queryParam])

  return (
    <main className="w-full h-full">
      {queryParam && (
        <Dialog open={showLeaderboard} onOpenChange={setShowLeaderboard}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Leaderboard</DialogTitle>
            </DialogHeader>
            <Leaderboard id={queryParam}/>
            <DialogFooter>
              <Button onClick={() => setShowLeaderboard(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={showNamePopup} onOpenChange={setShowNamePopup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Your Name</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <DialogFooter>
            <Button onClick={handleNameSubmit} disabled={!name.trim()}>
              Next
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showUrlPopup} onOpenChange={setShowUrlPopup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share This Game</DialogTitle>
          </DialogHeader>
          <p className="text-sm">Copy the URL below to share:</p>
          <Input type="text" value={shareUrl} readOnly />
          <DialogFooter>
            <Button onClick={handleCopyUrl}>Copy URL</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <section className="grid place-items-center px-4 sm:px-6 lg:px-8 h-screen bg-gradient-to-br from-blue-500 to-purple-600">
        <Card className="w-full mx-auto max-w-md sm:max-w-lg lg:max-w-2xl backdrop-blur-2xl">
          <CardHeader className="bg-primary/5 py-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <CardTitle className="text-base sm:text-lg lg:text-xl">The Globetrotter Challenge</CardTitle>
            </div>
            <CardDescription className="text-sm sm:text-base">The Ultimate Travel Guessing Game!</CardDescription>
            <CardDescription className="text-sm sm:text-base">Guess the place based on the clues</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-4">
              <Progress value={((questionCount + 1) / questionLimit) * 100} className="h-2" />
              {questionCount >= questionLimit ? (
                <h2 className="text-xl sm:text-2xl text-center font-bold mt-4">Game Over!</h2>
              ) : (
                <p className="text-center text-sm sm:text-base mt-1">
                  Question {questionCount + 1} of {questionLimit}
                </p>
              )}

            </div>
            {showGif ? (
              <div className="flex justify-center items-center">
                <Image src="/disintegrating-funny.gif" alt="Incorrect Answer" className="w-40 h-40" width={200} height={200} />
              </div>
            ) : questionCount >= questionLimit ? (
              <div className="grid grid-cols-1 gap-2">
                <ScoreCard correctCount={correctCount} incorrectCount={incorrectCount} />
                <div className="grid place-items-center grid-cols-2 gap-2 p-2">
                  <Button onClick={restartGame} variant="outline" className="w-full text-sm sm:text-base hover:translate-y-1.5 hover:shadow-2xl hover:border-2 flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Restart Game
                  </Button>
                  <Button onClick={shareButton} variant="outline" className="w-full text-sm sm:text-base hover:translate-y-1.5 hover:shadow-2xl hover:border-2 flex items-center gap-2">
                    <Share className="h-4 w-4" />
                    Share
                  </Button>
                </div>
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
                            p-4 rounded-lg border cursor-pointer transition-all text-sm sm:text-base hover:translate-y-1.5 hover:shadow-2xl
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
          {queryParam && (
            <CardFooter>            
              <Button
                onClick={() => setShowLeaderboard(true)}
                variant="outline"
                className="w-full text-sm sm:text-base flex items-center gap-2"
              >
                <Trophy className="h-4 w-4" />
                Leaderboard
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
    </main>
  )
}

function TriviaQuestionWrapper() {
  const searchParams = useSearchParams()
  const queryParam = searchParams.get("game")

  return <TriviaQuestionContent queryParam={queryParam} />
}

export default function TriviaQuestion() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TriviaQuestionWrapper />
    </Suspense>
  )
}

