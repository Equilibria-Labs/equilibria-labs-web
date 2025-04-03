import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProgressStepsProps {
  currentStep: number
}

export default function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const steps = [
    { id: 1, name: "Define Worries" },
    { id: 2, name: "Thinking Trap" },
    { id: 3, name: "Balance Thought" },
  ]

  return (
    <div className="bg-gradient-to-r from-violet-400 to-violet-500 p-6 pb-8">
      <div className="relative flex items-center justify-between">
        {/* Progress line */}
        <div className="absolute left-0 top-1/2 h-0.5 w-full bg-white/30 -translate-y-1/2" />

        {steps.map((step) => (
          <div key={step.id} className="relative flex flex-col items-center z-10">
            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border-2 border-white",
                currentStep === step.id && "bg-white",
                currentStep > step.id && "bg-white",
              )}
            >
              {currentStep > step.id ? (
                <Check className="h-6 w-6 text-violet-500" />
              ) : (
                <div
                  className={cn("w-full h-full rounded-full", currentStep === step.id ? "bg-white" : "bg-transparent")}
                />
              )}
            </div>
            <span
              className={cn(
                "mt-2 text-sm font-medium text-white text-center",
                currentStep === step.id && "font-semibold",
              )}
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

