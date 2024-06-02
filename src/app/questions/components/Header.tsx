import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import React from 'react';

export type Props = {
  title: string;
  onTitleClick?: () => void;
  onBack?: () => void;
}
const Header: React.FC<Props> = ({
  title,
  onTitleClick,
  onBack,
}) => {
  return (
    <header className="
    text-2xl text-center border-b-2 border-b-style-double py-2
    items-center
    grid grid-cols-[40px_1fr_40px] gap-3
    "
    >
      {onBack ? (
        <Button variant="ghost" onClick={onBack} size="icon">
          <ArrowLeftIcon className="h-6 w-6" />
        </Button>
      ) : <span />}
      <span onClick={onTitleClick}>
        {title}
      </span>
      <span />
    </header>
  )
};

export default Header;
