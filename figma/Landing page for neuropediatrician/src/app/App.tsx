import { motion, useScroll, useTransform, useInView, AnimatePresence } from "motion/react";
import { Brain, Heart, Sparkles, Calendar, Award, Users, ArrowRight, Activity, Stethoscope, BookOpen, Phone, Mail, MapPin, Clock, Instagram, Menu, X, Layers, Target, Shield } from "lucide-react";
import { useRef, useState, useEffect } from "react";

import heroImage from "figma:asset/299d088432ef1cc45644d2933aeb42f574e285f1.png";
import childImage from "figma:asset/04e5c30c4d5fbb96f4f2cf1af093ad9029f73e57.png";
import babyImage from "figma:asset/998e3eebd56925a2dfb76f1ed61eb91220ecaccd.png";
import consultImage from "figma:asset/53f5d70b4ed7fa16522b381d1e9c3a92020e3ebd.png";
import familyImage from "figma:asset/83cd0b17724b8aa7e00748370894c70552b29d51.png";

// Floating particles background
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Animated counter
function AnimatedCounter({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

// Animated section wrapper
function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Service card with 3D effect
function ServiceCard({ icon: Icon, title, description, delay, index }: { icon: any; title: string; description: string; delay: number; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: -20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 60, rotateX: -20 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -12,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      style={{ transformStyle: "preserve-3d" }}
      className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow relative overflow-hidden group"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
        initial={false}
      />

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
        transition={{ duration: 0.6, delay: delay + 0.2, type: "spring", bounce: 0.5 }}
        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 relative z-10"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>
      </motion.div>

      <h3 className="text-xl mb-3 relative z-10">{title}</h3>
      <p className="text-gray-600 leading-relaxed relative z-10">{description}</p>

      <motion.div
        className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: index * 0.3,
        }}
      />
    </motion.div>
  );
}

// Testimonial carousel
function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [
    {
      name: "Mariana S.",
      role: "Mãe do João, 5 anos",
      content: "A Dra. Aline foi fundamental para o diagnóstico precoce do TEA do nosso filho. Sua abordagem gentil e profissional fez toda a diferença na nossa jornada.",
      avatar: "MS",
    },
    {
      name: "Carlos M.",
      role: "Pai da Sofia, 8 anos",
      content: "Depois de anos buscando respostas, finalmente encontramos a Dra. Aline. Seu diagnóstico de TDAH foi preciso e o plano de tratamento está ajudando muito nossa filha.",
      avatar: "CM",
    },
    {
      name: "Ana L.",
      role: "Responsável pelo Lucas, 6 anos",
      content: "A avaliação neurológica foi muito completa e a Dra. Aline explicou tudo com muita clareza. Nos sentimos acolhidos e confiantes no acompanhamento.",
      avatar: "AL",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="relative max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100, rotateY: -20 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          exit={{ opacity: 0, x: -100, rotateY: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-3xl p-12 shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
            className="text-6xl text-blue-500 mb-6"
          >
            "
          </motion.div>
          <p className="text-xl text-gray-700 mb-8 italic leading-relaxed">
            {testimonials[currentIndex].content}
          </p>
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", bounce: 0.6 }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl"
            >
              {testimonials[currentIndex].avatar}
            </motion.div>
            <div>
              <h4 className="text-lg">{testimonials[currentIndex].name}</h4>
              <p className="text-gray-600">{testimonials[currentIndex].role}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            animate={{ scale: index === currentIndex ? 1.2 : 1 }}
          />
        ))}
      </div>
    </div>
  );
}

// Navbar
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.95)"]
  );
  const shadow = useTransform(
    scrollY,
    [0, 100],
    ["0 2px 10px rgba(0,0,0,0.05)", "0 4px 30px rgba(0,0,0,0.15)"]
  );

  return (
    <motion.nav
      style={{ backgroundColor, boxShadow: shadow }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-lg text-blue-600">Dra. Aline Costa</div>
              <div className="text-xs text-gray-600 tracking-wider uppercase">Neuropediatra</div>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {["Sobre", "Atuação", "Consultório", "Depoimentos"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className="text-gray-700 hover:text-blue-600 transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all" />
              </motion.a>
            ))}
            <motion.a
              href="#agendamento"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
            >
              Agendar Consulta
            </motion.a>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <X /> : <Menu />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 space-y-2"
            >
              {["Sobre", "Atuação", "Consultório", "Depoimentos", "Agendamento"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ x: 5 }}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-gray-700 hover:text-blue-600"
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

export default function App() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 0.2]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <FloatingParticles />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <img
            src={heroImage}
            alt="Cuidado infantil"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/70 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full py-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/30 rounded-full px-5 py-2.5 mb-8"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </motion.div>
              <span className="text-white">Neuropediatria Especializada</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl lg:text-7xl text-white mb-8 leading-[1.1]"
            >
              Cuidando do{" "}
              <motion.span
                className="text-yellow-300 inline-block"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(253, 224, 71, 0.5)",
                    "0 0 40px rgba(253, 224, 71, 0.8)",
                    "0 0 20px rgba(253, 224, 71, 0.5)",
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                desenvolvimento
              </motion.span>{" "}
              infantil com empatia e expertise
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl text-blue-100 mb-12 leading-relaxed max-w-2xl"
            >
              Atendimento especializado em neuropediatria, com foco no diagnóstico e acompanhamento de transtornos do neurodesenvolvimento.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#agendamento"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-900 px-10 py-5 rounded-full flex items-center gap-3 shadow-2xl group"
              >
                <Calendar className="w-6 h-6" />
                Agendar Consulta
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </motion.a>

              <motion.a
                href="#sobre"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/15 backdrop-blur-md border-2 border-white/40 text-white px-10 py-5 rounded-full hover:bg-white/25 transition-colors"
              >
                Saiba Mais
              </motion.a>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-2"
          >
            <motion.div
              className="w-2 h-2 bg-white rounded-full"
              animate={{ y: [0, 20, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 z-5">
          <svg viewBox="0 0 1440 120" className="w-full">
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1 }}
              fill="white"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section id="atuacao" className="py-32 px-6 lg:px-12 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white" />

        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm mb-4"
            >
              Áreas de Atuação
            </motion.div>
            <h2 className="text-5xl lg:text-6xl mb-6">
              Como posso <span className="text-blue-600">ajudar</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Atendimento completo focado no desenvolvimento neurológico e comportamental infantil
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={Layers}
              title="Transtorno do Espectro Autista (TEA)"
              description="Avaliação diagnóstica comprehensiva e acompanhamento multidisciplinar para crianças no espectro autista."
              delay={0.1}
              index={0}
            />
            <ServiceCard
              icon={Activity}
              title="TDAH (Déficit de Atenção)"
              description="Diagnóstico e tratamento do Transtorno do Déficit de Atenção e Hiperatividade em crianças e adolescentes."
              delay={0.2}
              index={1}
            />
            <ServiceCard
              icon={Target}
              title="Atrasos no Desenvolvimento"
              description="Avaliação e intervenção precoce para atrasos motores, cognitivos, da linguagem e sociais."
              delay={0.3}
              index={2}
            />
            <ServiceCard
              icon={BookOpen}
              title="Dificuldades de Aprendizagem"
              description="Identificação e manejo de dificuldades específicas no processo de aprendizagem escolar."
              delay={0.4}
              index={3}
            />
            <ServiceCard
              icon={Stethoscope}
              title="Avaliação Neurológica"
              description="Exame neurológico completo e investigação de condições como enxaqueca, epilepsia e distúrbios do sono."
              delay={0.5}
              index={4}
            />
            <ServiceCard
              icon={Users}
              title="Acompanhamento Multidisciplinar"
              description="Integração com fonoaudiólogos, psicólogos, terapeutas ocupacionais e educadores especiais."
              delay={0.6}
              index={5}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-32 px-6 lg:px-12 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <motion.div
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ duration: 0.4 }}
                className="relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={consultImage}
                    alt="Consulta médica"
                    className="w-full"
                  />
                </div>
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-10 -right-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-3xl blur-3xl -z-10"
                />
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm"
                >
                  Sobre a Dra. Aline Costa
                </motion.div>

                <h2 className="text-5xl lg:text-6xl leading-tight">
                  Experiência e <span className="text-blue-600">dedicação</span> em neuropediatria
                </h2>

                <p className="text-xl text-gray-600 leading-relaxed">
                  Dra. Aline Costa é uma neuropediatra com avaliações excelentes e anos de experiência dedicados ao cuidado da saúde infantil.
                </p>

                <p className="text-lg text-gray-600 leading-relaxed">
                  Especialista em transtornos do neurodesenvolvimento, atua com foco em diagnóstico preciso e acompanhamento personalizado, sempre priorizando o bem-estar da criança e o apoio às famílias.
                </p>

                <div className="grid md:grid-cols-2 gap-6 pt-6">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-lg"
                  >
                    <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Award className="w-7 h-7 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg mb-1">Formação Especializada</h3>
                      <p className="text-sm text-gray-600">Residência em Pediatria e especialização em Neuropediatria</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5 }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-lg"
                  >
                    <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-7 h-7 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg mb-1">Atendimento Humanizado</h3>
                      <p className="text-sm text-gray-600">Cuidado integral que considera toda a família</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 relative overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-12 text-white text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <motion.div
                className="text-6xl mb-3"
                whileHover={{ scale: 1.1 }}
              >
                <AnimatedCounter end={10} suffix="+" />
              </motion.div>
              <div className="text-blue-200 text-lg">Anos de experiência</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="text-6xl mb-3"
                whileHover={{ scale: 1.1 }}
              >
                <AnimatedCounter end={1000} suffix="+" />
              </motion.div>
              <div className="text-blue-200 text-lg">Crianças atendidas</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="text-6xl mb-3"
                whileHover={{ scale: 1.1 }}
              >
                <AnimatedCounter end={98} suffix="%" />
              </motion.div>
              <div className="text-blue-200 text-lg">Satisfação das famílias</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="consultorio" className="py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm mb-4"
            >
              Consultório
            </motion.div>
            <h2 className="text-5xl lg:text-6xl mb-6">
              Um ambiente <span className="text-blue-600">acolhedor</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Espaço pensado para o conforto e bem-estar das crianças e suas famílias
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[childImage, babyImage, familyImage].map((img, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.4 }}
                  className="relative h-96 rounded-3xl overflow-hidden shadow-xl group"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <img src={img} alt={`Ambiente ${index + 1}`} className="w-full h-full object-cover" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="py-32 px-6 lg:px-12 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm mb-4"
            >
              Depoimentos
            </motion.div>
            <h2 className="text-5xl lg:text-6xl mb-6">
              O que os <span className="text-blue-600">pais dizem</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Depoimentos de famílias que confiam no trabalho da Dra. Aline Costa
            </p>
          </AnimatedSection>

          <TestimonialCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section id="agendamento" className="py-32 px-6 lg:px-12 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 relative overflow-hidden">
        <FloatingParticles />

        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-3xl"
        />

        <AnimatedSection className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl lg:text-6xl text-white mb-6">
            Agende sua consulta
          </h2>
          <p className="text-xl text-blue-100 mb-12 leading-relaxed max-w-2xl mx-auto">
            Estamos prontos para acompanhar o desenvolvimento do seu filho com todo cuidado e atenção que ele merece.
          </p>

          <motion.a
            href="https://wa.me/5544999445725"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 30px 60px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex bg-white text-blue-900 px-12 py-6 rounded-full text-lg items-center gap-3 shadow-2xl mb-16"
          >
            <Phone className="w-6 h-6" />
            Marcar Consulta via WhatsApp
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-6 h-6" />
            </motion.div>
          </motion.a>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
            >
              <Phone className="w-8 h-8 mb-3 mx-auto" />
              <div className="text-sm text-blue-200 mb-1">Telefone</div>
              <div className="text-lg">+55 (44) 99944-5725</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
            >
              <Mail className="w-8 h-8 mb-3 mx-auto" />
              <div className="text-sm text-blue-200 mb-1">E-mail</div>
              <div className="text-lg">acl_aline@hotmail.com</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
            >
              <MapPin className="w-8 h-8 mb-3 mx-auto" />
              <div className="text-sm text-blue-200 mb-1">Endereço</div>
              <div className="text-lg">Maringá - PR</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
            >
              <Clock className="w-8 h-8 mb-3 mx-auto" />
              <div className="text-sm text-blue-200 mb-1">Horário</div>
              <div className="text-lg">Seg-Sex: 8h-18h</div>
            </motion.div>
          </div>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl text-white">Dra. Aline Costa</h3>
                  <p className="text-sm text-gray-400">Neuropediatra</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Cuidando do futuro, uma criança por vez
              </p>
              <a
                href="https://instagram.com/alineuropediatra"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
                @alineuropediatra
              </a>
            </div>

            <div>
              <h4 className="text-white mb-4">Links Rápidos</h4>
              <div className="space-y-2">
                {["Sobre", "Atuação", "Consultório", "Depoimentos"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white mb-4">Contato</h4>
              <div className="space-y-2 text-gray-400">
                <p>+55 (44) 99944-5725</p>
                <p>acl_aline@hotmail.com</p>
                <p>Maringá - PR</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-500 mb-2">
              © 2026 Dra. Aline Costa. Todos os direitos reservados.
            </p>
            <p className="text-xs text-gray-600 italic">
              Este site é informativo e não substitui consulta médica presencial.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
