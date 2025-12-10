import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/card'

const FormLayout = ({ heading, description, form, wide = false }) => {
  const widthClass = wide ? "max-w-3xl" : "max-w-md";
  return (
    <section className="min-h-screen flex justify-center items-center px-4 py-8">
      <Card className={`w-full ${widthClass} shadow-lg`}>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">{heading}</CardTitle>
          {description && <CardDescription className="text-muted-foreground">{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          {form}
        </CardContent>
      </Card>
    </section>
  )
}

export default FormLayout
