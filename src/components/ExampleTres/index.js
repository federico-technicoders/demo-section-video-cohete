'use client'
import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

export const ExampleTres = () => {
    const currentSectionRef = useRef(null)
    const nextSectionRef = useRef(null)

    useGSAP(() => {
        const currentSection = currentSectionRef.current
        const nextSection = nextSectionRef.current

        // Un solo timeline para ambas secciones
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: currentSection, // Se empieza en la sección 2
                start: "top top",
                end: "+=250%", // Ajusto el end para abarcar ambas secciones
                scrub: 1,
                pin: true,
                markers: true, // Quitar en producción
            },
        })

        // Animación para la sección 2: se agranda y luego se achica
        tl.fromTo(
            currentSection,
            {
                scale: 0.5,
                borderRadius: "30px",
            },
            {
                scale: 1,
                borderRadius: "0px",
                duration: 1,
                ease: "power2.out",
            }
        )
        .to(currentSection, {
            scale: 0.9,
            borderRadius: "30px",
            duration: 1,
            ease: "power2.out",
        })

        // Transición hacia la sección 3: empieza con el mismo tamaño que la sección 2
        .fromTo(
            nextSection,
            {
                scale: 0.9,
                borderRadius: "30px",
            },
            {
                scale: 0.9,
                borderRadius: "30px",
                duration: 1,
                ease: "none",
            },
            // `${currentSection}>=1`
             // Empieza justo cuando termina la animación de la sección 2
        )
        // Sección 3 se agranda para ocupar toda la pantalla
        .to(nextSection, {
            scale: 1,
            borderRadius: "0px",
            duration: 1,
            ease: "power2.out",
        })
        // Luego, la sección 3 sigue subiendo sin achicarse
        .to(nextSection, {
            yPercent: 0, // Hace que la sección 3 suba
            ease: "power2.inOut",
            duration: 1,
        })
    })

    return (                                      
        <div className="relative w-full">
            <section className="fixed top-0 left-0 justify-center items-center bg-slate-100 w-full h-screen">
                <h1>Primera sección</h1>
            </section>
            <section className="items-center w-full h-[200vh]">
                <div
                    ref={currentSectionRef} 
                    className="w-full h-screen flex justify-center items-center bg-blue-500"
                >
                    <h2 className="text-white text-2xl text-center">Sección dos</h2>
                </div>
            </section>
            <section 
                ref={nextSectionRef}
                className="relative w-full h-screen flex items-center justify-center bg-green-500"
            >
                <div className="w-full h-full flex justify-center items-center">
                    <h2 className="text-white text-2xl text-center">Sección tres</h2>
                </div>
            </section>
        </div>
    )
}