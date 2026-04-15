import Residuo from '../img/Residue.webp'
import Light from '../img/Light.webp'
import Shower from '../img/Shower.webp'
import Evitar from '../img/Evitar.webp'
import Walking from '../img/Walking.webp'
import Planta from '../img/Plant.webp'
import Bottle from '../img/Bottle.webp'
import Trash from '../img/Trash.webp'

export const challenges = [
  {
    id: 1,
    name: 'Separa tus residuos por un dia',
    description: 'Clasifica papel, plastico, vidrio y residuos organicos durante toda tu jornada.',
    objective: 'Organiza tres recipientes y separa correctamente cada residuo que generes.',
    difficulty: 'Basico',
    category: 'Residuos',
    status: 'Disponible',
    image: Residuo,
  },
  {
    id: 2,
    name: 'Reduce tu tiempo de ducha',
    description: 'Disminuye algunos minutos de uso de agua para crear un habito mas consciente.',
    objective: 'Toma una ducha de maximo cinco minutos usando alarma o cronometro.',
    difficulty: 'Basico',
    category: 'Agua',
    status: 'Disponible',
    image: Shower,
  },
  {
    id: 3,
    name: 'Evita usar plastico hoy',
    description: 'Busca alternativas reutilizables en tus compras, comidas y desplazamientos del dia.',
    objective: 'Rechaza bolsas, pitillos o empaques plasticos de un solo uso.',
    difficulty: 'Intermedio',
    category: 'Consumo',
    status: 'Disponible',
    image: Evitar,
  },
  {
    id: 4,
    name: 'Apaga luces innecesarias',
    description: 'Haz una revision consciente de los espacios que usas en casa o en tu estudio.',
    objective: 'Apaga luces y desconecta equipos en habitaciones vacias durante el dia.',
    difficulty: 'Basico',
    category: 'Energia',
    status: 'Disponible',
    image: Light,
  },
  {
    id: 5,
    name: 'Camina en vez de usar transporte corto',
    description: 'Convierte un trayecto breve en una oportunidad para reducir emisiones.',
    objective: 'Haz caminando un recorrido corto que normalmente harias en transporte.',
    difficulty: 'Intermedio',
    category: 'Movilidad',
    status: 'Disponible',
    image: Walking,
  },
  {
    id: 6,
    name: 'Cuida una planta durante la semana',
    description: 'Dedica varios dias a observar, regar y proteger una planta de tu entorno.',
    objective: 'Revisa diariamente su riego, luz y estado general durante siete dias.',
    difficulty: 'Intermedio',
    category: 'Naturaleza',
    status: 'Disponible',
    image: Planta,
  },
  {
    id: 7,
    name: 'Reutiliza una botella',
    description: 'Sustituye envases desechables por una botella reutilizable en tus actividades.',
    objective: 'Lleva contigo una botella reutilizable y rellena agua cuando lo necesites.',
    difficulty: 'Basico',
    category: 'Habitos',
    status: 'Disponible',
    image: Bottle,
  },
  {
    id: 8,
    name: 'Recoge residuos de un espacio cercano',
    description: 'Genera impacto positivo limpiando un punto de tu barrio, parque o institucion.',
    objective: 'Recolecta residuos visibles en un espacio cercano y depositalos correctamente.',
    difficulty: 'Avanzado',
    category: 'Comunidad',
    status: 'Disponible',
    image: Trash,
  },
]
