import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Award, Download, Calendar, Hash } from 'lucide-react';
import type { Certificate } from '@shared/schema';

export default function Certificates() {
  const { data: certificates, isLoading } = useQuery<Certificate[]>({
    queryKey: ['/api/certificates'],
  });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDownload = (cert: Certificate) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('תעודת הצטיינות', canvas.width / 2, 150);

    ctx.font = '32px Arial';
    ctx.fillStyle = '#6b7280';
    ctx.fillText('FullStackEDU', canvas.width / 2, 200);

    ctx.font = '28px Arial';
    ctx.fillText('מאשר בזאת כי', canvas.width / 2, 280);

    ctx.font = 'bold 42px Arial';
    ctx.fillStyle = '#3b82f6';
    ctx.fillText(cert.userDisplayName, canvas.width / 2, 350);

    ctx.font = '28px Arial';
    ctx.fillStyle = '#1f2937';
    ctx.fillText('השלים/ה בהצלחה את הקורס', canvas.width / 2, 420);

    ctx.font = 'bold 36px Arial';
    ctx.fillStyle = '#3b82f6';
    ctx.fillText(cert.courseTitleHE, canvas.width / 2, 490);

    ctx.font = '22px Arial';
    ctx.fillStyle = '#6b7280';
    ctx.fillText(`תאריך: ${formatDate(cert.completedAt)}`, canvas.width / 2, 580);
    ctx.fillText(`מספר תעודה: ${cert.certificateNumber}`, canvas.width / 2, 620);

    ctx.font = 'bold 28px Arial';
    ctx.fillStyle = '#1f2937';
    ctx.fillText('מזל טוב על ההישג!', canvas.width / 2, 720);

    const link = document.createElement('a');
    link.download = `תעודה-${cert.courseSlug}-${cert.certificateNumber}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-right">
          <h1 className="text-4xl font-bold text-foreground mb-2">התעודות שלי</h1>
          <p className="text-xl text-muted-foreground">כל התעודות שקיבלת על סיום קורסים</p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-8 w-full mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-6 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : certificates && certificates.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {certificates.map((cert) => (
              <Card key={cert._id} className="hover-elevate transition-all" data-testid={`card-certificate-${cert.courseSlug}`}>
                <CardHeader className="text-right">
                  <div className="flex items-start justify-between mb-2">
                    <Award className="h-8 w-8 text-primary" />
                    <Badge variant="secondary" className="text-xs">
                      <Calendar className="h-3 w-3 ml-1" />
                      {formatDate(cert.completedAt)}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl mb-2">{cert.courseTitleHE}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground justify-end">
                    <span className="font-mono">{cert.certificateNumber}</span>
                    <Hash className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(cert)}
                      className="gap-2"
                      data-testid={`button-download-${cert.courseSlug}`}
                    >
                      <Download className="h-4 w-4" />
                      הורד תעודה
                    </Button>
                    <Link href={`/course/${cert.courseSlug}`}>
                      <Button variant="ghost" size="sm" data-testid={`button-view-course-${cert.courseSlug}`}>
                        צפה בקורס
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
                <Award className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">עדיין אין לך תעודות</h3>
              <p className="text-lg text-muted-foreground mb-6">
                השלם קורס מלא כדי לקבל את התעודה הראשונה שלך
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  התחל ללמוד
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
