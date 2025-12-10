import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/shadcn/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/card";
import { Home, AlertCircle } from "lucide-react";

const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-background px-4">
    <Card className="w-full max-w-md text-center">
      <CardHeader>
        <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>
        <CardTitle className="text-6xl font-bold text-muted-foreground">404</CardTitle>
        <CardDescription className="text-lg">Page Not Found</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="w-full gap-2">
            <Home className="w-4 h-4" />
            Go to Home
          </Button>
        </Link>
      </CardContent>
    </Card>
  </div>
);

export default NotFoundPage;
