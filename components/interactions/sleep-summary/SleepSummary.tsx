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

  // Group dialogues by dialogueId (since keys now combine dialogueId and submissionId)
  const groupedDialogues: Record<string, Dialogue[]> = {};

  Object.entries(dialogues).forEach(([_key, dialogue]) => {
    // Each dialogue already has its own dialogueId and submissionId
    const { dialogueId } = dialogue;

    if (!groupedDialogues[dialogueId]) {
      groupedDialogues[dialogueId] = [];
    }

    groupedDialogues[dialogueId].push(dialogue);
  });

  // Sort dialogues within each group by submitted_at date (newest first)
  Object.keys(groupedDialogues).forEach(dialogueId => {
    groupedDialogues[dialogueId].sort((a, b) => {
      const dateA = a.submitted_at ? new Date(a.submitted_at).getTime() : 0;
      const dateB = b.submitted_at ? new Date(b.submitted_at).getTime() : 0;
      return dateB - dateA; // Newest first
    });
  });

  return (
    <div className='space-y-8'>
      <h2 className='text-2xl font-bold'>Sleep Report Summary</h2>

      {Object.entries(groupedDialogues).map(([dialogueId, dialogueList]) => (
        <div key={dialogueId} className='space-y-4'>
          <h3 className='text-xl font-semibold capitalize'>
            {dialogueId} Assessment
          </h3>

          {dialogueList.map((dialogue, index) => (
            <Card key={dialogue.submissionId || index}>
              <CardHeader>
                <CardTitle className='flex justify-between items-center'>
                  <span className='capitalize'>{dialogue.title}</span>
                  {index === 0 && (
                    <span className='text-sm bg-green-100 text-green-800 px-2 py-1 rounded'>
                      Latest
                    </span>
                  )}
                </CardTitle>
                <div className='text-sm text-muted-foreground space-y-1'>
                  <div>Version: {dialogue.version}</div>
                  <div>Status: {formatStatus(dialogue.status)}</div>
                  {dialogue.submitted_at && (
                    <div>
                      Submitted:{' '}
                      {format(new Date(dialogue.submitted_at), 'PPp')}
                    </div>
                  )}
                  {dialogue.score !== undefined && (
                    <div>Score: {dialogue.score}</div>
                  )}
                  {dialogue.submissionId && (
                    <div className='text-xs text-gray-400'>
                      ID: {dialogue.submissionId}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className='space-y-6'>
                  <div className='space-y-4'>
                    <h3 className='font-semibold'>Responses</h3>
                    <ul className='space-y-4'>
                      {dialogue.answers.map((answer: Answer, ansIndex) => (
                        <li
                          key={`${dialogue.submissionId || index}-${ansIndex}`}
                          className='text-sm space-y-1'
                        >
                          <div className='font-medium text-base'>
                            {answer.step.question}
                          </div>
                          <div className='text-muted-foreground'>
                            {answer.value
                              .map((choiceValue: ChoiceValue) => {
                                const selectedChoice = answer.step.choices.find(
                                  (choice: Choice) =>
                                    choice.value === choiceValue
                                );
                                return selectedChoice
                                  ? `${selectedChoice.text} (${choiceValue.numericValue})`
                                  : choiceValue.stringValue;
                              })
                              .join(', ')}
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
      ))}
    </div>
  );
}
