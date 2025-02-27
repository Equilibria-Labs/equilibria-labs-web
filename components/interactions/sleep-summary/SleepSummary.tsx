import { Answer, Dialogue, QuestionStep, ChoiceValue, Choice } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialogue as SharedDialogue } from '@/types/shared/dialogue';

export interface SleepSummaryProps {
  dialogues: Record<string, Dialogue>;
}

export default function SleepSummary({ dialogues }: SleepSummaryProps) {
  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-bold'>Sleep Report Summary</h2>
      {Object.entries(dialogues).map(([dialogueId, dialogue]) => (
        <Card key={dialogueId}>
          <CardHeader>
            <CardTitle className='capitalize'>
              {dialogueId.replace('-', ' ')} Responses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className='space-y-4'>
              {dialogue.answers.map((answer: Answer, index) => (
                <li
                  key={`${dialogueId}-${index}`}
                  className='text-sm space-y-1'
                >
                  <div className='font-medium text-base'>
                    {answer.step.question}
                  </div>
                  <div className='text-muted-foreground'>
                    {Array.isArray(answer.value)
                      ? answer.value
                          .map((v: ChoiceValue) => {
                            const choice = answer.step.choices.find(
                              (c: Choice) => c.value === v
                            );
                            return choice ? choice.text : v;
                          })
                          .join(', ')
                      : answer.value}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
