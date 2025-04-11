import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Button } from "../ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";


export function HitRateChart ({ correctAnswers, totalQuestions, setQuizCompleted, setCurrentQuestion, setOptionSelected }) {
  const hitRate = (correctAnswers / totalQuestions) * 100

  let color = "hsl(var(--destructive))"

  if (hitRate >= 70) {
    color = "hsl(var(--chart-2))" // verde
  } else if (hitRate >= 50) {
    color = "hsl(var(--chart-3))" // amarillo
  }


  const chartData = [
    { name: "Hit Rate", score: hitRate, fill: color },
  ]

  const chartConfig = {
    score: {
      label: "Correct Answers",
    },
  }

  const handleRepeat = () => {
    console.log("handleRepeat")
    setQuizCompleted(false)
    setCurrentQuestion(0)
    setOptionSelected(null)
  }

  return (
    <>
      <Card className="flex flex-col mt-[40px]">
        <CardHeader className="items-center pb-0">
          <CardTitle className="text-xl">Correct Answers</CardTitle>
          <CardDescription>Performance Overview</CardDescription>
        </CardHeader>

        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="min-h-[200px] w-full h-auto aspect-square"
          >
            <RadialBarChart
              data={chartData}
              startAngle={90}
              endAngle={90 + (hitRate * 3.6)} // ✅ Cada 1% = 3.6°
              innerRadius={80}
              outerRadius={140}
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-muted last:fill-background"
                polarRadius={[86, 74]}
              />
              <RadialBar dataKey="score" background />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && viewBox.cx && viewBox.cy) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-4xl font-bold"
                          >
                            {Math.round(hitRate)}%
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy + 24}
                            className="fill-muted-foreground"
                          >
                            Hit Rate
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
        </CardContent>

        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none mt-2">
            {correctAnswers} out of {totalQuestions} correct
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground mt-2">
            Based on your latest quiz results
          </div>
        </CardFooter>
      </Card>
      <Button
        variant="secondary"
        className="mt-6"
        onClick={handleRepeat}
      >
        <FontAwesomeIcon icon={faRepeat} />
        Repeat quiz
      </Button>
    </>
  )
}