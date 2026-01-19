'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Mail } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-card to-background px-4 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 md:gap-8 md:items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-medium text-primary">AI-Powered Quality Assessment</p>
              <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl text-balance">
                Grade Areca Nuts with AI
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl leading-relaxed max-w-md">
                Get instant, accurate quality assessments for your areca nuts using advanced AI technology. Perfect for farmers, traders, and quality inspectors.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 h-12 text-base"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 px-6 h-12 text-base bg-transparent"
              >
                <Mail className="mr-2 h-4 w-4" /> Contact Us
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
              <div>
                <p className="text-2xl font-bold text-primary">98%</p>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">2s</p>
                <p className="text-sm text-muted-foreground">Processing Time</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">10K+</p>
                <p className="text-sm text-muted-foreground">Nuts Graded</p>
              </div>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative h-80 md:h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl border border-border flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl">🌰</div>
              <div className="absolute top-8 right-8 w-16 h-16 bg-primary/30 rounded-full blur-2xl"></div>
              <div className="absolute bottom-8 left-8 w-20 h-20 bg-accent/30 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
