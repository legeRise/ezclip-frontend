import React from "react";
import { Separator } from "@/components/shadcn/separator";
import { Sparkles } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-background">
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-md bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-semibold text-primary">EzClip</span>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} EzClip. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;