import React, { useCallback } from "react";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import { color } from "../styles";

export default function ParticleNetwork() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="particle-network"
      init={particlesInit}
      options={{
        background: {
          opacity: 0,
        },
        fpsLimit: 120,
        fullScreen: {
          zIndex: -1,
          enable: true,
        },
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "grab",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: color.brand,
          },
          links: {
            color: color.bitcoin,
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: false,
          },
          move: {
            directions: "none",
            enable: true,
            outModes: {
              default: "out",
            },
            random: true,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.3,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
