'use client'
import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

export const SectionHeroVideo = () => {
    const currentSectionRef = useRef(null)
    const nextSectionRef = useRef(null)


    useGSAP(() => {
        const currentSection = currentSectionRef.current
        const nextSection = nextSectionRef.current

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: currentSection,
                start: "top top",
                end: "+=180%",
                scrub: 1,
                pin: true,
                markers: true, // Quitar en producción
            },
        })

        // Animación de la sección actual
        tl.fromTo(
            currentSection,
            {
                scale: 0.5,
                borderRadius: "30px",
                start: "top top",
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
            ease: "power2.in",
        })





        // Animación de la siguiente sección
        // tl.fromTo(
        //     nextSection,
        //     {
        //         // yPercent: 100,
        //         scale: 0.9,
        //     },
        //     {
        //         // yPercent: 0,
        //         scale: 1,
        //         duration: 1,
        //         ease: "none",
        //     },
        //     // "-=1" // Comienza esta animación un poco antes
        // )







        let tl1 = gsap.timeline({
            scrollTrigger: {
                trigger: nextSection,
                start: "top top",
                end: "+=200%",
                scrub: 1,
                pin: true,
                markers: true, // Quitar en producción
            },
        })

        tl1.fromTo(
            nextSection,
            {
                scale: 0.9,
                borderRadius: "30px",
            },
            {
                scale: 1,
                borderRadius: "0px",
                duration: 1,
                ease: "power2.out",
            }
        )
        .to(nextSection, {
            scale: 0.9,
            borderRadius: "30px",
            duration: 1,
            ease: "power2.in",
        })
    })

    return (                                      
        <div className="relative w-full">
            <section className="fixed top-0 left-0 justify-center items-center bg-slate-100 w-full h-screen">
                <h1>Primera sección </h1>
            </section>
            <section                 
                className=" items-center w-full h-[200vh] "            
            >
                <div
                    ref={currentSectionRef} 
                    className="w-full h-screen flex justify-center items-center bg-blue-500">
                    <h2 className="text-white text-2xl text-center">Sección dos</h2>
                </div>
            </section>
            <section 
                ref={nextSectionRef}
                className="relative w-full h-screen  flex items-center justify-center"
            >
                <div className="w-full h-full flex justify-center items-center bg-green-500">
                    <h2 className="text-white text-2xl text-center">Sección tres</h2>
                </div>
            </section>
        </div>
    )
}
