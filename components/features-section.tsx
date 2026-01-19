'use client'

import { Card } from '@/components/ui/card'
import { Zap, Shield, Gauge, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get quality assessments in just 2 seconds using advanced AI models'
  },
  {
    icon: Gauge,
    title: 'Highly Accurate',
    description: 'Trained on thousands of samples with 98% accuracy rate'
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your images are processed securely and never stored'
  },
  {
    icon: TrendingUp,
    title: 'Detailed Analytics',
    description: 'Get comprehensive reports with actionable recommendations'
  }
]

export default function FeaturesSection() {
  return (
    <section id="features" className="border-b border-border bg-card px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to grade areca nuts with confidence
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="bg-background border-border p-6 hover:border-primary/50 transition-colors group">
                <div className="mb-4 inline-block p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
