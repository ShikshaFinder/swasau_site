import { InternshipForm } from "@/components/InternshipForm";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";

export default function InternshipPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-background via-white to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Join Our Team
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Work on cutting-edge embedded systems, IoT projects, and innovative
            technology solutions
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span>• Hands-on experience with real projects</span>
            <span>• Mentorship from industry experts</span>
            <span>• Flexible work arrangements</span>
            <span>• Potential for full-time opportunities</span>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <InternshipForm />

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              What You'll Gain
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive learning experience in embedded systems and IoT
              development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Practical Experience
              </h3>
              <p className="text-muted-foreground">
                Work on real-world projects with actual hardware and software
                development
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Mentorship</h3>
              <p className="text-muted-foreground">
                Learn from experienced engineers and industry professionals
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
              <p className="text-muted-foreground">
                Build your portfolio and gain skills that are in high demand
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-muted-foreground">
                Contribute to cutting-edge technology solutions and products
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Networking</h3>
              <p className="text-muted-foreground">
                Connect with professionals in the embedded systems industry
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Opportunities</h3>
              <p className="text-muted-foreground">
                Potential for full-time positions and long-term career
                development
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
