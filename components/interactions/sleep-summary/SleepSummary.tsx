import { Answer } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SleepSummaryProps {
  answers: Record<string, Answer[]>;
}

export default function SleepSummary({ answers }: SleepSummaryProps) {
  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-bold'>Sleep Report Summary</h2>
      {Object.entries(answers).map(([sectionId, sectionAnswers]) => (
        <Card key={sectionId}>
          <CardHeader>
            <CardTitle className='capitalize'>
              {sectionId.replace('-', ' ')} Responses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className='space-y-2'>
              {sectionAnswers.map((answer, index) => (
                <li key={`${answer.questionId}-${index}`} className='text-sm'>
                  <span className='font-medium'>
                    Question {answer.questionId}:{' '}
                  </span>
                  {Array.isArray(answer.value)
                    ? answer.value.join(', ')
                    : answer.value}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
