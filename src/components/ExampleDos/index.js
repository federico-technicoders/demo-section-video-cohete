'use client'
import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"


gsap.registerPlugin(ScrollTrigger)

export const ExampleDos = () => {
    const currentSectionRef = useRef(null)
    const nextSectionRef = useRef(null)

    useGSAP(() => {
        const currentSection = currentSectionRef.current
        const nextSection = nextSectionRef.current

        // Timeline para la sección 2 (actual)
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: currentSection,
                start: "top top",
                end: "+=520%",
                scrub: 1,
                pin: true,
                markers: true, // Quitar en producción
            }
        })

        // Animación para la sección 2: se achica y se queda centrada
       
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
            },
            
        )
        tl.fromTo(
            currentSection,
            {
                scale: 1,
                borderRadius: "0px",
            },
            {
                scale: 0.9,
                borderRadius: "30px",
                duration: 1,
                ease: "power2.out",
            },
            
        )

        // Timeline para la sección 3 (siguiente)
        let tl1 = gsap.timeline({
            scrollTrigger: {
                trigger: nextSection,
                start: "top top",
                end: "+=100%",
                scrub: 1,
                pin: true,
                markers: true, // Quitar en producción
            },
        })

        // Sección 3 entra con el mismo tamaño que la sección 2 (achicada)
        tl1.fromTo(
            nextSection,
            {
                scale: 0.9, // Empieza con el mismo tamaño que la sección 2
                borderRadius: "30px",
            },
            {
                scale: 0.9, // Mantiene el tamaño mientras cubre la sección 2
                borderRadius: "30px",
                duration: 1,
                ease: "none", // Sin efecto adicional mientras cubre
            },
            
        )
        .to(nextSection, {
            // Sección 3 se agranda para llenar la pantalla
            scale: 1,
            borderRadius: "0px",
            duration: 1,
            ease: "power2.out",
        })
        // .to(nextSection, {
        //     // Sección 3 sigue subiendo sin achicarse
        //     yPercent: -100, // Hace que la sección 3 suba
        //     ease: "power2.inOut",
        //     duration: 1,
        // })
    })

    return (                                      
        <div className="relative w-full">
            <section className="fixed top-0 left-0 justify-center items-center bg-slate-100 w-full h-screen">
                <h1>Primera sección </h1>
            </section>
            <section                 
                className=" items-center w-full h-[500vh]"            
            >
                <div
                    ref={currentSectionRef} 
                    className="w-full h-screen flex justify-center items-center bg-blue-500 z-0 bg-[url('/andres.webp')] bg-cover bg-no-repeat ">
                    <h2 className="text-white text-2xl text-center">Sección dos</h2>
                    {/* <img src="andres.webp" className="absolute top-0 left-0 w-full h-full -z-10" alt="imgan andres" /> */}
                </div>
            </section>
            <section 
                ref={nextSectionRef}
                className="relative w-full h-screen  flex items-center justify-center bg-green-500"
            >
                <div className="w-full h-full flex justify-center items-center">
                    <h2 className="text-white text-2xl text-center">programa de despegue empresarial</h2>
                    
                </div>
            </section>
        </div>
    )
}