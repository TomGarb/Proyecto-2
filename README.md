<div align="center">
  <h1>🌌 Multiverse Clash: Turn-Based RPG</h1>
  <p>
    <strong>A Modular, Multi-Page Application (MPA) Turn-Based Combat Game</strong>
  </p>
  <p>
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/Architecture-MPA-blue?style=for-the-badge" alt="MPA Architecture" />
  </p>
</div>

<br />

## 📖 Descripción del Proyecto

**Multiverse Clash** es un robusto videojuego de rol y combate táctico por turnos desarrollado enteramente en tecnologías web nativas (HTML, CSS y Vanilla JavaScript). Su motor de combate soporta mecánicas complejas como efectos de estado, robo de vida, críticos mediante tiradas de dados (d20) y un sistema de botín procedural (Loot).

El proyecto destaca por su arquitectura **MPA (Multi-Page Application)**, que utiliza `sessionStorage` para garantizar transiciones de estado fluidas, ruteo seguro y persistencia de configuraciones de combate entre distintas ventanas sin depender de bases de datos externas.

---

## 🚀 Características Principales

*   **🌐 5 Universos Integrados:** Elige personajes, jefes y temas visuales exclusivos de 5 sagas legendarias:
    *   ⭐ *Star Wars*
    *   ⚡ *Harry Potter*
    *   💍 *El Señor de los Anillos*
    *   🦸‍♂️ *Marvel*
    *   🌀 *Naruto*
*   **⚔️ Modos de Juego Variados:**
    *   **Modo Historia:** Enfrenta 5 jefes de dificultad ascendente. (Incluye mecánicas de Level-Up).
    *   **Modo Roguelike:** Gana experiencia y elige botín (Loot) entre 10 objetos tácticos al finalizar cada combate.
    *   **Draft 5v5:** Recluta tu escuadrón ideal en un draft dinámico (sin repetidos) y enfrenta a batallones enemigos.
    *   **Supervivencia (Endless):** Sobrevive rondas infinitas contra clones que escalan sus estadísticas un 20% en cada asalto.
    *   **Lado Oscuro:** Juega como los Villanos y derrota a los Héroes de la luz.
*   **🎲 Motor Criptográfico d20:** Cálculos de daño justos impulsados por un dado de 20 caras que decide los fallos, impactos y golpes críticos basándose en los stats pasivos de tu guerrero.
*   **🎨 Diseño Premium:** Vanilla CSS de alto nivel. Integración de Glassmorphism, Micro-animaciones, Theming dinámico (cambio de paleta de colores según la saga) y diseño `Responsive` con Flexbox/Grid.

---

## 🛠️ Arquitectura y Tecnologías

El proyecto fue factorizado para separar responsabilidades de manera profesional:

*   `index.html` & `hub.html`: Gestión del Lobby y selección de configuración.
*   `combat.html`: Renderizador agnóstico de la arena de batalla.
*   **Routing Segurizado:** Redirección automática por validación estricta del `sessionStorage`. Si no hay estado válido, se deniega el acceso a la arena.
*   **Core Logic (`/core`):**
    *   `combat.js`: Motor matemático de daño y alteraciones de estado (Stun, Burn).
    *   `gameModes.js`: Orquestador de turnos y condiciones de victoria/derrota.
    *   `loot.js`: Pool procedural de botín para el modo Roguelike.
*   **Arquitectura de Datos (`/data`):** Bases de datos exportables (`classes.js`, `characters.js`) modulares por cada universo.

---

## 💻 Instalación y Uso

Dado que el juego utiliza `ES6 Modules` (import/export), requiere un servidor HTTP para ser ejecutado (para evitar bloqueos CORS por protocolo `file://`).

### Requisitos
*   Tener **Python** instalado (para el servidor local rápido).

### Pasos
1. Clona el repositorio o descarga los archivos.
2. Abre la consola en el directorio raíz del proyecto (`/VideoJuego_Turnos`).
3. Ejecuta el archivo Batch incluido para lanzar el servidor:
   ```bash
   jugar.bat
   ```
   *Alternativa manual:* `python -m http.server 8000`
4. Abre tu navegador y dirígete a: `http://localhost:8000/`

---

## ⚖️ Balance y Game Design

La curva de dificultad está estrictamente testeada:
*   El **Modo Historia** otorga un crecimiento del 25% (Stats Level-Up) tras derrotar jefes.
*   El daño cuenta con validadores anti-negativos (`Math.max(1, dmg)`).
*   Se eliminaron las "Dead States" (Personajes atacando con 0 de HP).
*   El pool de "Draft 5v5" es inmutable; los personajes ya drafteados se purgan del algoritmo aleatorio.

---

## 👨‍💻 Próximas Mejoras (Roadmap)
- [ ] Implementar Backend Node.js / Socket.io para PvP (Jugador contra Jugador) en tiempo real.
- [ ] Validaciones de ataque Server-Authoritative para sistema Anti-Cheat.
- [ ] Expandir el sistema de "Defensa/Armadura" para escalar a Late-Game.

<br />
<div align="center">
  <sub>Desarrollado con pasión, estrategia y arquitectura limpia.</sub>
</div>
