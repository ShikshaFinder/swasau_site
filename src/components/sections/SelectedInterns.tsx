"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, ExternalLink, Github, Linkedin, Globe } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

interface Intern {
  id: number;
  name: string;
  email: string;
  qualification: string;
  skills: string;
  photoUrl?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  selectedAt?: string;
  adminNotes?: string;
  isSelected: boolean;
}

export function SelectedInterns() {
  const [selectedInterns, setSelectedInterns] = useState<Intern[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSelectedInterns();
  }, []);

  const fetchSelectedInterns = async () => {
    try {
      const response = await fetch("/api/interns");
      const data = await response.json();

      if (response.ok) {
        // Filter only selected interns
        const selected = data.interns.filter(
          (intern: Intern) => intern.isSelected
        );
        setSelectedInterns(selected);
      }
    } catch (error) {
      console.error("Failed to fetch selected interns:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (selectedInterns.length === 0) {
    return null; // Don't show section if no selected interns
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Meet Our Selected Interns
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Talented individuals who have joined our team to work on exciting
              embedded systems and IoT projects
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedInterns.map((intern) => (
            <ScrollReveal key={intern.id}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    {intern.photoUrl ? (
                      <img
                        src={intern.photoUrl}
                        alt={intern.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-primary">
                        {intern.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {intern.name}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {intern.qualification}
                  </CardDescription>
                  {intern.selectedAt && (
                    <Badge className="bg-green-100 text-green-800 mt-2">
                      Joined {formatDate(intern.selectedAt)}
                    </Badge>
                  )}
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Skills
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {intern.skills.split(",").map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {skill.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {intern.adminNotes && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        About
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {intern.adminNotes}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-center gap-2 pt-4">
                    {intern.github && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={intern.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    {intern.linkedin && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={intern.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    {intern.portfolio && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={intern.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Globe className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Want to join our team?</p>
            <Button asChild size="lg">
              <a href="/internship">Apply for Internship</a>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
