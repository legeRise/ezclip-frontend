import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/shadcn/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/card";
import { Badge } from "@/components/shadcn/badge";
import { Sparkles, Play, Zap, Clock, CheckCircle } from "lucide-react";

const HomePage = ({ isAuthenticated }) => (
  <div className="min-h-screen bg-background">
    {/* Hero Section */}
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4 px-4 py-1">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered Video Generation
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Where Your Words Become{" "}
            <span className="text-primary">Stories</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
            Effortlessly turn your text, story, or script into stunning videos.
            No editing skills required — just paste and create.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={isAuthenticated ? "/generate-video" : "/signup"}>
              <Button size="lg" className="gap-2 px-8">
                <Sparkles className="w-4 h-4" />
                {isAuthenticated ? "Generate Video" : "Get Started Free"}
              </Button>
            </Link>
            {!isAuthenticated && (
              <Link to="/login">
                <Button size="lg" variant="outline" className="gap-2 px-8">
                  <Play className="w-4 h-4" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="border-0 shadow-md bg-card">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Generate professional videos in minutes, not hours. Our AI handles all the heavy lifting.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-card">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Easy to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Just paste your text and click generate. No complex editing software needed.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-card">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Save Time</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Focus on your content while EzClip transforms it into engaging videos automatically.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    {/* Demo Videos Section */}
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Demo Videos</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            See EzClip in Action
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch how EzClip transforms text into professional videos in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Vertical Video */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <Badge className="w-fit mb-2" variant="secondary">Portrait 9:16</Badge>
              <CardTitle className="text-lg">What is EzClip</CardTitle>
              <CardDescription>
                See how EzClip turns your text into videos in seconds.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <video
                  src="/ezclip_demo_2.mp4"
                  controls
                  className="w-full max-w-[280px] rounded-lg border shadow-sm"
                  style={{ background: "#000" }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Landscape Video */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <Badge className="w-fit mb-2" variant="secondary">Landscape 16:9</Badge>
              <CardTitle className="text-lg">A Teacher's Journey</CardTitle>
              <CardDescription>
                Professional landscape videos generated with EzClip.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <video
                src="/ezclip_demo.mp4"
                controls
                className="w-full rounded-lg border shadow-sm"
                style={{ objectFit: "cover", background: "#000" }}
              />
              <p className="text-xs text-muted-foreground mt-3 italic text-center">
                "He tried editing — it drained his evenings. He tried hiring help —
                it drained his wallet. One night, frustrated, he typed his lesson
                into a strange website…"
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Ready to Create Amazing Videos?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Join thousands of creators who are already using EzClip to bring their stories to life.
        </p>
        <Link to={isAuthenticated ? "/generate-video" : "/signup"}>
          <Button size="lg" className="gap-2 px-8">
            <Sparkles className="w-4 h-4" />
            {isAuthenticated ? "Start Creating" : "Get Started Free"}
          </Button>
        </Link>
      </div>
    </section>
  </div>
);

export default HomePage;
