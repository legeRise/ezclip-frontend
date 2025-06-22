import React from 'react'

const FormLayout = ({ heading, description, form, wide = false }) => {
  const widthClass = wide ? "max-w-3xl" : "max-w-md";
  return (
    // This section ensures the form is centered and fills at least the visible viewport height
    <section className="min-h-screen flex justify-center items-center px-4">
      {/* Card container for the form with shadow, padding, and rounded corners */}
      <div className={`bg-white shadow-lg p-8 rounded-xl w-full ${widthClass}`}>
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-600">{heading}</h1>
        <p className="text-gray-600 mb-8 text-center">{description}</p>
        {form}
      </div>
    </section>
  )
}

export default FormLayout
