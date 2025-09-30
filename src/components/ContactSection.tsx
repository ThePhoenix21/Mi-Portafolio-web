import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

const ContactSection: React.FC = () => {
  const { ref: titleRef, isInView: titleInView } = useInViewAnimation();
  const { ref: leftRef, isInView: leftInView } = useInViewAnimation({ delay: 200 });
  const { ref: rightRef, isInView: rightInView } = useInViewAnimation({ delay: 400 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success: boolean; message: string} | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  const contactCards = [
    {
      title: "Correo",
      value: "jamescorcam@gmail.com",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      delay: 100,
    },
    {
      title: "Twitter",
      value: "@DarkGho16702142",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.557c-.883.392-1.832..."/>
        </svg>
      ),
      delay: 200,
    },
    {
      title: "GitHub",
      value: "github.com/ThePhoenix21",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12..."/>
        </svg>
      ),
      delay: 300,
    },
  ];

  const formFields = [
    { name: "nombre", placeholder: "Nombre", type: "text", half: true, required: true },
    { name: "apellido", placeholder: "Apellido", type: "text", half: true, required: true },
    { name: "email", placeholder: "Correo", type: "email", full: true, required: true },
    { name: "asunto", placeholder: "Asunto", type: "text", full: true, required: false },
  ];

  const textareaField = { name: "mensaje", placeholder: "Mensaje...", rows: 5, required: true };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: '¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.'
        });        
        setFormData({
          nombre: '',
          apellido: '',
          email: '',
          asunto: '',
          mensaje: ''
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      setSubmitStatus({
        success: false,
        message: error instanceof Error ? error.message : 'Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className={`text-4xl md:text-5xl font-bold mb-4 text-foreground transition-all duration-800 ${
              titleInView ? 'animate-fade-in-up' : 'animate-hidden'
            }`}
          >
            Ponte en <span className="text-primary-glow">Contacto</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            "Si quieres charlar sobre tecnología o tu próximo proyecto aquí estoy."
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div 
            ref={leftRef}
            className={`space-y-8 transition-all duration-800 ${
              leftInView ? 'animate-fade-in-left' : 'animate-hidden'
            }`}
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Hablemos</h3>
              <p className="text-muted-foreground mb-8">
                Me encanta conocer nuevas ideas y proyectos. Si quieres hacerme una pregunta o simplemente decir hola, ¡estaré encantado de escucharte!
              </p>
            </div>
            
            <div className="space-y-4">
              {contactCards.map(({ title, value, icon, delay }) => (
                <Card key={title} className={`glass animate-delay-${delay}`}>
                  <CardContent className="p-4 flex items-center space-x-4">
                    <div className="text-primary-glow">{icon}</div>
                    <div>
                      <div className="text-sm text-muted-foreground">{title}</div>
                      <div className="text-foreground">{value}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

          </div>
          
          <Card 
            ref={rightRef}
            className={`glass transition-all duration-800 ${
              rightInView ? 'animate-scale-in' : 'animate-hidden'
            }`}
          >
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {formFields.filter(f => f.half).map(f => (
                    <input
                      key={f.name}
                      type={f.type}
                      name={f.name}
                      value={formData[f.name as keyof typeof formData]}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                      className="flex h-10 w-full rounded-md border border-border bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required={f.required}
                    />
                  ))}
                </div>

                {formFields.filter(f => f.full).map(f => (
                  <input
                    key={f.name}
                    type={f.type}
                    name={f.name}
                    value={formData[f.name as keyof typeof formData]}
                    onChange={handleChange}
                    placeholder={f.placeholder}
                    className="flex h-10 w-full rounded-md border border-border bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required={f.required}
                  />
                ))}

                <textarea
                  name={textareaField.name}
                  value={formData[textareaField.name as keyof typeof formData]}
                  onChange={handleChange}
                  placeholder={textareaField.placeholder}
                  rows={textareaField.rows}
                  className="w-full rounded-md bg-background/50 border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-glow focus:border-transparent resize-none"
                  required={textareaField.required}
                />

                <div className="space-y-2">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                    {!isSubmitting && (
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    )}
                  </Button>

                  {submitStatus && (
                    <div className={`p-3 rounded-md text-sm ${
                      submitStatus.success
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {submitStatus.message}
                    </div>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
