import { Sprout } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b border-border/50 bg-background/50 backdrop-blur-sm sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <Sprout className="h-7 w-7 text-primary" />
        <h1 className="text-2xl font-bold font-headline text-foreground">
          AGRIX
        </h1>
      </div>
      <Avatar>
        <AvatarImage src="https://picsum.photos/seed/farmer/100/100" data-ai-hint="farmer portrait" alt="Farmer" />
        <AvatarFallback>AF</AvatarFallback>
      </Avatar>
    </header>
  );
}
