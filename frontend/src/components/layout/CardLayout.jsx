import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function CardLayout({ title, children }) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">{title}</h1>
        </CardHeader>
        <CardContent className="space-y-5">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
