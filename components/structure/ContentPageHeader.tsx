import { BodyText, Heading } from '../common/Typography';
import BackButton from '../navigation/BackButton';
import Row from './Row';
import { Button } from '../ui/button';

interface ContentPageHeaderProps {
  isBackButtonHome: boolean;
  title: string;
  newItemHandler?: () => void;
}

export default function ContentPageHeader({
  isBackButtonHome,
  title,
  newItemHandler,
}: ContentPageHeaderProps) {
  return (
    <Row justify='space-between' align='center'>
      <BackButton isHome={isBackButtonHome} />
      <Heading>{title}</Heading>
      {newItemHandler && (
        <Button
          variant='ghost'
          size='icon'
          onClick={newItemHandler}
          iconName='plus'
          aria-label='Add new card'
        />
      )}
    </Row>
  );
}
