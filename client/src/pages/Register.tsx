import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Link } from 'wouter';
import { Loader2 } from 'lucide-react';

export default function Register() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'שגיאה',
        description: 'הסיסמאות אינן תואמות',
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        variant: 'destructive',
        title: 'שגיאה',
        description: 'הסיסמה חייבת להכיל לפחות 6 תווים',
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiRequest('POST', '/api/auth/register', {
        email: formData.email,
        password: formData.password,
        displayName: formData.displayName,
      });
      
      login(response.user, response.token);
      toast({
        title: 'נרשמת בהצלחה!',
        description: `ברוך הבא ${response.user.displayName}`,
      });
      // Use hard redirect to ensure state is loaded from localStorage
      window.location.href = '/dashboard';
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'שגיאה בהרשמה',
        description: error.message || 'אירעה שגיאה, נסה שוב',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-b from-muted/30 to-background px-4 py-12">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-right">
          <CardTitle className="text-3xl font-bold">הרשמה</CardTitle>
          <CardDescription className="text-base">
            צור חשבון חדש והתחל ללמוד
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName" className="text-right block">שם מלא</Label>
              <Input
                id="displayName"
                type="text"
                placeholder="ישראל ישראלי"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                required
                disabled={isLoading}
                className="text-right"
                data-testid="input-displayname"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-right block">אימייל</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@fullstackedu.io"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isLoading}
                className="text-right"
                dir="ltr"
                data-testid="input-email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-right block">סיסמה</Label>
              <Input
                id="password"
                type="password"
                placeholder="לפחות 6 תווים"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                disabled={isLoading}
                className="text-right"
                dir="ltr"
                data-testid="input-password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-right block">אישור סיסמה</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="הכנס סיסמה שוב"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                disabled={isLoading}
                className="text-right"
                dir="ltr"
                data-testid="input-confirm-password"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              data-testid="button-submit"
            >
              {isLoading ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  נרשם...
                </>
              ) : (
                'הירשם'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">כבר יש לך חשבון? </span>
            <Link href="/login">
              <a className="text-primary hover:underline font-medium" data-testid="link-login">
                התחבר
              </a>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
