import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

const ContactSection: React.FC = () => {
  const { ref: titleRef, isInView: titleInView } = useInViewAnimation();
  const { ref: leftRef, isInView: leftInView } = useInViewAnimation({ delay: 200 });
  const { ref: rightRef, isInView: rightInView } = useInViewAnimation({ delay: 400 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Manejar el envío del formulario aquí
    console.log('Form submitted');
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
          “Si quieres charlar sobre tecnología o tu próximo proyecto aquí estoy.”
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
              <Card className="glass animate-delay-100">
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="text-primary-glow">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Correo</div>
                    <div className="text-foreground">jamescorcam@gmail.com</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass animate-delay-200">
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="text-primary-glow">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Twitter</div>
                    <div className="text-foreground">@DarkGho16702142</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass animate-delay-300">
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="text-primary-glow">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">GitHub</div>
                    <div className="text-foreground">github.com/ThePhoenix21</div>
                  </div>
                </CardContent>
              </Card>
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
                  <div>
                    <input 
                      type="text"
                      placeholder="First Name" 
                      className="flex h-10 w-full rounded-md border border-border bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    />
                  </div>
                  <div>
                    <input 
                      type="text"
                      placeholder="Last Name" 
                      className="flex h-10 w-full rounded-md border border-border bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    />
                  </div>
                </div>
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="flex h-10 w-full rounded-md border border-border bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
                <input 
                  type="text"
                  placeholder="Subject" 
                  className="flex h-10 w-full rounded-md border border-border bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <div className="relative">
                  <textarea 
                    placeholder="Your Message" 
                    rows={5}
                    className="w-full rounded-md bg-background/50 border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-glow focus:border-transparent resize-none"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  Send Message
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;