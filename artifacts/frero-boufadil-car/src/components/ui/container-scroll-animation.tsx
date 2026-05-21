"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const [isMobile, setIsMobile] = React.useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const rotateDesktop = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const rotateMobile  = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const rotate = isMobile ? rotateMobile : rotateDesktop;

  const scaleDesktop = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const scaleMobile  = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const scale = isMobile ? scaleMobile : scaleDesktop;

  const translateDesktop = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const translateMobile  = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const translate = isMobile ? translateMobile : translateDesktop;

  return (
    <div
      className="h-[46rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
      style={{ position: "relative" }}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{ perspective: isMobile ? "600px" : "1000px" }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: { translate: MotionValue<number>; titleComponent: React.ReactNode }) => {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[22rem] md:h-[40rem] w-full border-4 border-[#C8A96E]/40 p-2 md:p-3 bg-[#111111] rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-[#0A0A0A]">
        {children}
      </div>
    </motion.div>
  );
};
