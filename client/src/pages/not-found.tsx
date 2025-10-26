import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold text-foreground mb-4">הדף לא נמצא</h2>
        <p className="text-xl text-muted-foreground mb-8">
          הדף שחיפשת לא קיים או הוסר
        </p>
        <Link href="/">
          <Button size="lg" className="gap-2">
            <Home className="h-5 w-5" />
            חזרה לדף הבית
          </Button>
        </Link>
      </div>
    </div>
  );
}
