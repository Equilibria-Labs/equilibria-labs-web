import { Answer, Dialogue, ChoiceValue, Choice } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

export interface SleepSummaryProps {
  dialogues: Record<string, Dialogue>;
}

export default function SleepSummary({ dialogues }: SleepSummaryProps) {
  const formatStatus = (status: Dialogue['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-bold'>Sleep Report Summary</h2>
      {Object.entries(dialogues).map(([dialogueId, dialogue]) => (
        <Card key={dialogueId}>
          <CardHeader>
            <CardTitle className='capitalize'>{dialogue.title}</CardTitle>
            <div className='text-sm text-muted-foreground space-y-1'>
              <div>Version: {dialogue.version}</div>
              <div>Status: {formatStatus(dialogue.status)}</div>
              {dialogue.submittedAt && (
                <div>
                  Submitted: {format(new Date(dialogue.submittedAt), 'PPp')}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-6'>
              <div className='space-y-4'>
                <h3 className='font-semibold'>Responses</h3>
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
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
