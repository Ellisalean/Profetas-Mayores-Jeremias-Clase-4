
import { Lesson } from '../types';

export const JEREMIAS_LESSON_4: Lesson = {
  id: 'jeremias-clase-4',
  title: 'Jeremías: El Profeta Llorón',
  subtitle: 'Clase 4: El Juicio a Judá (Cap. 1-25)',
  totalSlides: 12,
  slides: [
    {
      id: 'c4-s1-intro',
      type: 'hermeneutics',
      title: 'Jeremías: El Designado',
      subtitle: '626–586 a.C. | Anatot',
      chapterReference: 'Jeremías 1:1-3',
      visual: { 
        type: 'image', 
        source: 'https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/e5e78b92-88b7-4faf-ad1f-0e590bc810a2_rw_1920.jpg?h=be1bab22f27e73fe613c0e4270452b34',
        position: 'left'
      },
      content: 'Nombre: "A quien Jehová ha designado". Jeremías es el profeta de quien más conocemos su vida personal y emocional.',
      interaction: {
        type: 'grid-cards',
        revealItems: [
          { 
            title: 'Perfil', 
            text: 'Sensible y Perseguido.', 
            icon: 'User', 
            longContent: 'Vivió en Anatot, una villa sacerdotal. Fue el profeta más perseguido: sacerdotes, profetas, príncipes y el pueblo se volvieron contra él. Solo Dios estuvo con él.' 
          },
          { 
            title: 'El Llorón', 
            text: 'Oh si mi cabeza se hiciese aguas.', 
            icon: 'Droplets', 
            longContent: 'Conocido universalmente como "el profeta llorón" (9:1). Tuvo la triste tarea de anunciar la caída de su propia nación y ver a Jerusalén destruida.' 
          }
        ]
      }
    },
    {
      id: 'c4-s2-calling',
      type: 'hermeneutics',
      title: 'El Llamamiento',
      subtitle: 'Santificado antes de nacer',
      chapterReference: 'Jeremías 1:4-10',
      visual: { 
        type: 'image', 
        source: 'https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/5aeab75d-5c37-4184-a57b-ed963de824de_rw_1920.jpg?h=0bc1ccac328ada20a36f1c79f3c035a5',
        position: 'right'
      },
      content: '"No digas: Soy un niño... porque a todo lo que te envíe irás tú".',
      interaction: {
        type: 'grid-cards',
        revealItems: [
          { 
            title: 'Misión Cuádruple', 
            text: 'Arrancar, destruir, arruinar, derribar.', 
            icon: 'Zap', 
            longContent: 'Pero también para edificar y plantar. Se debe limpiar el terreno (predicación evangelística) antes de construir lo nuevo.' 
          },
          { 
            title: 'Dos Visiones', 
            text: 'Almendro y Olla.', 
            icon: 'Eye', 
            longContent: 'Vara de Almendro: Dios apresura Su palabra para cumplirla. Olla hirviente: El juicio viene desde el norte (Babilonia).' 
          }
        ]
      }
    },
    {
      id: 'c4-s3-treason',
      type: 'info-menu-reveal',
      title: 'La Traición de Judá',
      subtitle: 'Capítulos 2 al 6: Pecados Gemelos',
      chapterReference: 'Jeremías 2–6',
      visual: { type: 'icon', source: 'Scissors' },
      interaction: {
        type: 'menu-reveal',
        revealItems: [
          { 
            title: 'Cisternas Rotas', 
            text: 'Dejaron la fuente de agua viva.', 
            icon: 'Droplet', 
            image: 'https://www.unrudodespertar.tv/wp-content/uploads/2023/10/shutterstock_1885397023.jpg',
            longContent: 'Jeremías 2:13 define dos males: Dejar a Dios y buscar alianzas extranjeras (Egipto y Asiria) que no retienen agua.' 
          },
          { 
            title: 'Diógenes Espiritual', 
            text: 'Buscando un hombre íntegro.', 
            icon: 'Search', 
            image: 'https://preview.redd.it/k9720ipwd3b01.jpg?width=1080&crop=smart&auto=webp&s=44401acf459d53b76b2d014d6211f4142aabb1cc',
            longContent: 'Capítulo 5: Dios desafía a Jeremías a encontrar un solo hombre honesto en Jerusalén para perdonar la ciudad. No lo halló.' 
          },
          { 
            title: 'Sendas Antiguas', 
            text: 'No quisieron andar.', 
            icon: 'Navigation', 
            image: 'https://bouldercolorado.gov/sites/default/files/styles/hero_image_977x557/public/2021-06/chautauqua-trail-boulder-senderos-de-boulder_0.jpg?itok=PwDO_Pm4',
            longContent: 'Capítulo 6: "Preguntad por las sendas antiguas... y hallaréis descanso". Pero respondieron: "No andaremos". Eran plata desechada.' 
          }
        ]
      }
    },
    {
      id: 'c4-s4-temple-sermon',
      type: 'stepped-overlay',
      title: 'Falsa Confianza',
      subtitle: 'Capítulo 7: El Sermón del Templo',
      chapterReference: 'Jeremías 7',
      visual: { type: 'image', source: 'https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/829ceabd-ede9-4976-8e97-5febbf0f5a13_rw_1920.jpg?h=76f4ac9bdc32f4a50042431c562fd21e', position: 'background' },
      interaction: {
        type: 'stepped-reveal',
        revealItems: [
          { 
            title: 'Seguridad Falsa', 
            text: 'Templo de Jehová, Templo de Jehová.', 
            icon: 'Home', 
            image: 'https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/d3939924-edf6-4aa6-a36e-8fa65569cd1c_rw_1920.jpg?h=f8e45b7e9716f188d989615bcbbb4e82',
            longContent: 'La gente creía que por tener el edificio estaban a salvo. Jeremías les recordó Silo: Dios puede destruir Su propio santuario si hay desobediencia.' 
          },
          { 
            title: 'Obediencia vs Sacrificio', 
            text: 'Oíd mi voz.', 
            icon: 'Volume2', 
            image: 'https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/ff36253d-0fc4-435c-b198-01f3003b15f0_rw_1920.jpg?h=46e449bde733c303d9b8225e2d62c3ac',
            longContent: 'Dios no pidió sacrificios al salir de Egipto, pidió obediencia. Jeremías predica una religión espiritual y no formal.' 
          },
          { 
            title: 'Valle de Matanza', 
            text: 'Tofet en Hinom.', 
            icon: 'Flame', 
            image: 'https://ingeoexpert.com/wp-content/uploads/2025/06/33055376815_e63f979515_k-1536x795.webp',
            longContent: 'Ofrecían a sus hijos en fuego a Moloc. El valle de Hinom (Gehena) se convertiría en un cementerio masivo por el juicio de Dios.' 
          }
        ]
      }
    },
    {
      id: 'c4-s5-covenant',
      type: 'hermeneutics',
      title: 'El Pacto Quebrantado',
      subtitle: 'Capítulos 11–12: Conspiración en Anatot',
      chapterReference: 'Jeremías 11–12',
      visual: { 
        type: 'image', 
        source: 'https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/9ee4cde8-0a00-4781-bbd9-202aa3de8852_rw_1920.jpg?h=59aa554b0d44bcc228cc85767526a948',
        position: 'left'
      },
      content: '"Si corriste con los de a pie y te cansaron, ¿cómo contenderás con los caballos?"',
      interaction: {
        type: 'grid-cards',
        revealItems: [
          { 
            title: 'Traición Familiar', 
            text: 'Cordero al matadero.', 
            icon: 'Users', 
            longContent: 'Los hombres de su propia ciudad natal, Anatot, tramaron matarlo. Dios le reveló el complot secreto antes de que actuaran.' 
          },
          { 
            title: 'Dificultades Futuras', 
            text: 'La espesura del Jordán.', 
            icon: 'TrendingUp', 
            longContent: 'Dios advierte a Jeremías: si la persecución en Anatot le fatiga, ¿qué hará cuando enfrente a los reyes y la jungla enmarañada de Jerusalén?' 
          }
        ]
      }
    },
    {
      id: 'c4-s6-potter',
      type: 'split-slider',
      title: 'El Alfarero y el Barro',
      subtitle: 'Capítulos 18–19: Poder y Quebranto',
      chapterReference: 'Jeremías 18–19',
      visual: { type: 'image', source: 'https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/9c0c6cef-00fa-44eb-9187-9c1d43dc6098_rw_1920.jpg?h=85f3de5bd5a1629288d653a788d9b632' },
      interaction: {
        type: 'internal-slider',
        revealItems: [
          { 
            title: 'La Vasija Rajada', 
            text: 'Volver a moldear.', 
            icon: 'RefreshCw', 
            image: 'https://scontent-mia3-2.xx.fbcdn.net/v/t39.30808-6/484965830_1411733249802375_4929009617860525332_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=x8ls_wd7yMUQ7kNvwGQg2RN&_nc_oc=AdkAC4HcXXAt-BkNIoo61ZAhI8OH1imvS5pxAOiSdR1DCm6riQ83Rj45NCBuuBM7mUI6VT0G0q_iMlB0GAFGRMBc&_nc_zt=23&_nc_ht=scontent-mia3-2.xx&_nc_gid=y8geB_1mBEPAgfH1lRqv2A&oh=00_Afv-n0kpbBDu0HsMzX73F3t76DTBOFg4bsnk0pyLib7F8g&oe=698D2912',
            longContent: 'Capítulo 18: Jeremías observa al alfarero. La vasija se arruina pero él la vuelve a hacer. Símbolo de esperanza: el arrepentimiento permite a Dios moldearnos de nuevo.' 
          },
          { 
            title: 'La Vasija Quebrada', 
            text: 'Juicio Irreversible.', 
            icon: 'Trash', 
            image: 'https://totenart.com/tutoriales/wp-content/uploads/2014/11/totenart-barro-768x456.jpg',
            longContent: 'Capítulo 19: Dios ordena romper una vasija de barro terminada frente a los ancianos. Símbolo de juicio: Judá sería quebrantada sin remedio.' 
          }
        ]
      }
    },
    {
      id: 'c4-s7-symbols',
      type: 'info-menu-reveal',
      title: 'Paráables de Acción',
      subtitle: 'La Vida como Mensaje Profético',
      chapterReference: 'Jeremías 13–16',
      visual: { type: 'icon', source: 'Activity' },
      interaction: {
        type: 'menu-reveal',
        revealItems: [
          { 
            title: 'Cinto Podrido', 
            text: 'Escondido en el Éufrates.', 
            icon: 'Lock', 
            image: 'https://metamorfosecrista.wordpress.com/wp-content/uploads/2016/04/linen-belt.png?w=1200&h=800&crop=1',
            longContent: 'Un cinto de lino podrido simboliza el orgullo de Judá. Para ninguna cosa eran buenos ya ante Dios.' 
          },
          { 
            title: 'Celibato de Jeremías', 
            text: 'No tomarás esposa.', 
            icon: 'HeartOff', 
            image: 'https://www.omnesmag.com/wp-content/uploads/2023/06/celibato.jpg',
            longContent: 'Dios le prohibió casarse como señal de los horrores que vendrían sobre las familias en la destrucción inminente.' 
          },
          { 
            title: 'Inscrito con Diamante', 
            text: 'Pecado indeleble.', 
            icon: 'PenTool', 
            image: 'https://finagarcia.com/cdn/shop/articles/selective-focus-of-big-and-small-diamonds-on-brown-2021-09-01-14-45-13-utc-2-1_d099cba1-4365-48d8-9d17-5fa164881cfd.jpg?v=1681752681',
            longContent: '17:1 - "El pecado de Judá escrito está con cincel de hierro y con punta de diamante". No podía borrarse por medios humanos.' 
          }
        ]
      }
    },
    {
      id: 'c4-s8-pashur',
      type: 'hermeneutics',
      title: 'Conflicto con Pasur',
      subtitle: 'Cepo, Burlas y Fuego',
      chapterReference: 'Jeremías 20',
      visual: { 
        type: 'image', 
        source: 'https://cambiocolombia.com/media/photologue/photos/2024-08/cepo-parque-nacional.jpg',
        position: 'right'
      },
      content: '"Había en mi corazón como un fuego ardiente metido en mis huesos... traté de sufrirlo y no pude".',
      interaction: {
        type: 'grid-cards',
        revealItems: [
          { 
            title: 'El Cepo', 
            text: 'Prisión en el Templo.', 
            icon: 'Lock', 
            longContent: 'Pasur el sacerdote castigó a Jeremías y lo puso en el cepo. Al salir, el profeta predijo que Pasur moriría en Babilonia.' 
          },
          { 
            title: 'Fuego en los Huesos', 
            text: 'Imposible callar.', 
            icon: 'Flame', 
            longContent: 'Jeremías decidió no hablar más por las burlas, pero la palabra era fuego. No pudo contenerla.' 
          }
        ]
      }
    },
    {
      id: 'c4-s9-kings',
      type: 'info-menu-reveal',
      title: 'Reyes y Pastores',
      subtitle: 'Capítulos 21–24: Los Últimos Reyes de Judá',
      chapterReference: 'Jeremías 21–24',
      visual: { type: 'icon', source: 'Crown' },
      interaction: {
        type: 'menu-reveal',
        revealItems: [
          { 
            title: 'Higos Buenos y Malos', 
            text: 'Jeconías vs Sedequías.', 
            icon: 'Grid', 
            image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjpfLadHoDUvaoAkMl95RL6fFVErQlJsBaPAoDuIWt8pqx-f020qkk6uLI9L6Rh2VbAaozuK8qYwgaCqYFOLxwc5Bh0Pn87foyKat2IJsQZ7Z51J8lLpu_XFbxvD-30PlHfDSpP5qMyit5CyBZttggnBFlQ6vbGxGsrkIzVsRMiA6LKNzhMolDy1hxO/s800/Good%20and%20Bad%20Figs.png',
            longContent: 'Higos buenos: Los llevados primero al cautiverio (se volverán a Dios). Higos malos: Los que quedaron en Jerusalén (serán destruidos).' 
          },
          { 
            title: 'Renuevo Justo', 
            text: 'Jehová, justicia nuestra.', 
            icon: 'Sunrise', 
            image: 'https://www.theeconomyjournal.com/imagenes/justiciayrazon1.jpg',
            longContent: 'Profecía Mesiánica (23:5-6). Frente a los pastores infieles, Dios levantará al Rey perfecto de la línea de David.' 
          }
        ]
      }
    },
    {
      id: 'c4-s10-70years',
      type: 'flashcards',
      title: '70 Años de Captiverio',
      subtitle: 'Capítulo 25: El Fin del Tiempo',
      chapterReference: 'Jeremías 25',
      visual: { type: 'icon', source: 'Clock' },
      interaction: {
        type: 'flashcards',
        revealItems: [
          { title: 'Duración Exacta', text: '70 Años.', icon: 'Calendar', longContent: 'Respuesta: La predicción más sorprendente de Jeremías fue la duración del exilio.\n\nReflexión: Daniel estudió estas palabras años después para orar por la liberación.' },
          { title: 'Batalla de Carquemis', text: 'Año 605 a.C.', icon: 'Sword', longContent: 'Respuesta: Punto de inflexión histórico donde Babilonia derrota a Egipto y Judá queda a su merced.' },
          { title: 'Copa de Ira', text: 'A todas las naciones.', icon: 'Droplet', longContent: 'Respuesta: Jeremías ve a todas las naciones bebiendo de la copa del juicio de Dios, comenzando por Jerusalén.' }
        ]
      }
    },
    {
      id: 'c4-s11-trivia',
      type: 'quiz',
      title: 'Desafío del Profeta',
      subtitle: 'Jeremías 1–25',
      chapterReference: 'Examen de Consolidación',
      visual: { type: 'icon', source: 'Zap' },
      interaction: {
        type: 'multiple-choice',
        quiz: [
          {
            question: '¿Qué simbolizaba la olla hirviente en la visión de Jeremías?',
            options: ['La abundancia de alimentos', 'El juicio que viene desde el norte', 'La purificación del templo', 'El arrepentimiento de Judá'],
            correctIndex: 1,
            explanation: 'Correcto. La olla inclinada desde el norte simbolizaba a los invasores mesopotámicos (Babilonia) descendiendo sobre Judá.'
          },
          {
            question: '¿Por qué Jeremías es conocido como el "Profeta Llorón"?',
            options: ['Porque era de carácter débil', 'Por su profunda agonía ante la caída de su pueblo', 'Porque siempre estaba en prisión', 'Por una enfermedad en sus ojos'],
            correctIndex: 1,
            explanation: 'Exacto. Su sensibilidad ante el pecado y el castigo de su nación lo llevaban a desear que sus ojos fueran fuentes de lágrimas (9:1).'
          },
          {
            question: '¿Qué lección recibió Jeremías en la casa del Alfarero?',
            options: ['Que el juicio era instantáneo', 'Que Dios puede volver a moldear al arrepentido', 'Que el barro era de mala calidad', 'Que debía dedicarse a la artesanía'],
            correctIndex: 1,
            explanation: '¡Bien! La vasija arruinada que es rehecha simboliza la oportunidad divina de restauración a través del arrepentimiento.'
          }
        ]
      }
    },
    {
      id: 'c4-s12-finish',
      type: 'completion',
      title: '¡Clase Completada!',
      subtitle: 'Jeremías: Corazón de Dios',
      chapterReference: 'Próxima Clase: El Nuevo Pacto',
      content: 'Has explorado el ministerio temprano de Jeremías. Un profeta que sufrió con su pueblo, pero que ardió con la palabra ineludible de Dios.',
      visual: { 
        type: 'image', 
        source: 'https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/e5e78b92-88b7-4faf-ad1f-0e590bc810a2_rw_1920.jpg?h=be1bab22f27e73fe613c0e4270452b34',
        position: 'background'
      }
    }
  ]
};

export const ALL_LESSONS: Record<string, Lesson> = {
  'jeremias-clase-4': JEREMIAS_LESSON_4
};
