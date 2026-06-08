"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";
import { Users, Heart, Globe, Award, Target, BookOpen, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const teamMembers = [
  { name: "María Nsue", role: "Fundadora & CEO", image: "/team/maria.jpg", bio: "Apasionada por la preservación de lenguas africanas." },
  { name: "Carlos Mbomio", role: "Director de Tecnología", image: "/team/carlos.jpg", bio: "Experto en e-learning e IA." },
  { name: "Rosa Ondo", role: "Especialista en Lingüística", image: "/team/rosa.jpg", bio: "Doctora en lenguas bantúes." },
  { name: "Jesús Nguema", role: "Diseñador de Experiencia", image: "/team/jesus.jpg", bio: "Crea interfaces inclusivas y atractivas." },
];

const values = [
  { icon: Heart, title: "Preservación Cultural", description: "Mantenemos vivas las lenguas y tradiciones de nuestros ancestros." },
  { icon: Users, title: "Comunidad Global", description: "Conectamos estudiantes con hablantes nativos de todo el mundo." },
  { icon: Globe, title: "Acceso Universal", description: "Nuestra plataforma es gratuita y está abierta a todos." },
  { icon: Award, title: "Calidad Educativa", description: "Contenido diseñado por lingüistas y pedagogos expertos." },
];

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col w-full bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black py-20 md:py-28">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-900 rounded-full mix-blend-overlay filter blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-900 rounded-full mix-blend-overlay filter blur-3xl opacity-20" />
        <div className="mx-auto max-w-7xl px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Acerca de{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Mbolo
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Somos una plataforma educativa comprometida con la revitalización y enseñanza de las lenguas vernáculas de Guinea Ecuatorial y África Central.
          </p>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-16 bg-black border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full text-emerald-300 text-sm">
                <Target className="w-4 h-4" />
                Nuestra Misión
              </div>
              <h2 className="text-3xl font-bold text-white">Preservar la identidad lingüística</h2>
              <p className="text-gray-300 leading-relaxed">
                En Mbolo creemos que cada lengua es un universo de conocimiento y cultura. Nuestra misión es
                proporcionar herramientas accesibles y efectivas para que las nuevas generaciones aprendan y
                valoren las lenguas vernáculas de Guinea Ecuatorial, fortaleciendo su identidad y conectando
                a las comunidades africanas dentro y fuera del continente.
              </p>
            </div>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full text-emerald-300 text-sm">
                <Globe className="w-4 h-4" />
                Nuestra Visión
              </div>
              <h2 className="text-3xl font-bold text-white">Un futuro multilingüe y unido</h2>
              <p className="text-gray-300 leading-relaxed">
                Soñamos con un mundo donde cada persona pueda aprender su lengua materna de forma digital,
                donde las lenguas minoritarias tengan un espacio en la tecnología y donde la diversidad
                lingüística sea celebrada. Aspiramos a ser la plataforma de referencia para el aprendizaje
                de lenguas africanas en todo el mundo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 bg-black/50 border-y border-gray-800">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Nuestros Valores</h2>
            <p className="text-gray-400 mt-2">Lo que nos mueve cada día</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="bg-gray-900/30 p-6 rounded-2xl border border-gray-800 text-center group hover:border-emerald-500 transition-all">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-500 transition-colors">
                  <value.icon className="w-6 h-6 text-emerald-400 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estadísticas de Impacto */}
      <section className="py-16 bg-black">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Nuestro Impacto</h2>
            <p className="text-gray-400 mt-2">Lo que hemos logrado juntos</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-400">10k+</div>
              <p className="text-gray-400 mt-1">Estudiantes activos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-400">5</div>
              <p className="text-gray-400 mt-1">Lenguas vernáculas</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-400">50+</div>
              <p className="text-gray-400 mt-1">Comunidades locales</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-400">200+</div>
              <p className="text-gray-400 mt-1">Lecciones interactivas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo (opcional, con imágenes placeholder) */}
      <section className="py-16 bg-black/30 border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Equipo Mbolo</h2>
            <p className="text-gray-400 mt-2">Personas apasionadas por las lenguas africanas</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="bg-gray-900/40 rounded-2xl overflow-hidden border border-gray-800 hover:border-emerald-500 transition-all">
                <div className="aspect-square relative bg-gray-800 flex items-center justify-center">
                  <Users className="w-16 h-16 text-gray-500" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-white">{member.name}</h3>
                  <p className="text-sm text-emerald-400">{member.role}</p>
                  <p className="text-xs text-gray-400 mt-2">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-8">
            * Las imágenes son ilustrativas. Conoce al equipo real pronto.
          </p>
        </div>
      </section>

      {/* Mapa de lenguas o sección geográfica */}
      <section className="py-16 bg-black">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full text-emerald-300 text-sm mb-4">
                <MapPin className="w-4 h-4" />
                Nuestras Raíces
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Guinea Ecuatorial, corazón de África</h2>
              <p className="text-gray-300 leading-relaxed">
                Nacimos en Malabo y extendemos nuestras alas a todo el continente. Las lenguas que enseñamos
                (Fang, Bubi, Ndowe, Bisio, Annobonés) son parte del patrimonio cultural ecuatoguineano y
                queremos que trasciendan fronteras.
              </p>
              <Link href="/courses">
                <Button className="mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                  Explora los cursos
                </Button>
              </Link>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-800 border border-gray-700 flex items-center justify-center">
              <Globe className="w-32 h-32 text-emerald-500 mx-auto opacity-30" />
              <p className="text-gray-400 text-sm absolute bottom-4">Mapa de África Central</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-900 rounded-full mix-blend-overlay filter blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-900 rounded-full mix-blend-overlay filter blur-3xl opacity-20" />
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Únete a nuestra misión</h2>
          <p className="text-xl text-gray-300 mb-8">
            Ya seas estudiante, profesor o hablante nativo, hay un lugar para ti en Mbolo.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/learn">
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3">
                Comienza a aprender gratis
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="border border-emerald-500 text-emerald-400 hover:bg-emerald-900/20">
  Contáctanos
</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}