import Bin from '../img/Bin.webp'
import Energy from '../img/Energy.webp'
import Water from '../img/Water.webp'
import World from '../img/World.webp'
import Huerta from '../img/Huerta.png'
import Conservar from '../img/Conservar.webp'
import Biodiversidad from '../img/Tortugas.webp'
import Consumo from '../img/Consumo.webp'

export const courses = [
  {
    id: 1,
    name: 'Reciclaje basico',
    description: 'Aprende a separar residuos y a crear habitos simples para reciclar mejor en casa y en tu barrio.',
    level: 'Basico',
    category: 'Residuos',
    image: Bin,
  },
  {
    id: 2,
    name: 'Energia y ahorro',
    description: 'Descubre acciones cotidianas para usar menos energia y reducir el impacto ambiental en tus espacios.',
    level: 'Basico',
    category: 'Energia',
    image: Energy,
  },
  {
    id: 3,
    name: 'Cuidado del agua',
    description: 'Conoce estrategias para cuidar fuentes hidricas y disminuir el desperdicio de agua en la vida diaria.',
    level: 'Basico',
    category: 'Agua',
    image: Water,
  },
  {
    id: 4,
    name: 'Conservacion',
    description: 'Explora practicas para proteger ecosistemas, fauna y flora con acciones sostenibles y comunitarias.',
    level: 'Intermedio',
    category: 'Naturaleza',
    image: Conservar,
  },
  {
    id: 5,
    name: 'Consumo responsable',
    description: 'Aprende a tomar decisiones de compra mas conscientes para reducir residuos y apoyar productos sostenibles.',
    level: 'Intermedio',
    category: 'Habitos',
    image: Consumo,
  },
  {
    id: 6,
    name: 'Huerta urbana',
    description: 'Crea tu propia huerta en casa y descubre como cultivar alimentos frescos en espacios pequenos.',
    level: 'Intermedio',
    category: 'Cultivo',
    image: Huerta,
  },
  {
    id: 7,
    name: 'Cambio climatico',
    description: 'Comprende las causas del cambio climatico, sus efectos y las acciones que ayudan a enfrentarlo.',
    level: 'Avanzado',
    category: 'Clima',
    image: World,
  },
  {
    id: 8,
    name: 'Biodiversidad',
    description: 'Reconoce la importancia de la biodiversidad y como proteger las especies en tu entorno cercano.',
    level: 'Avanzado',
    category: 'Naturaleza',
    image: Biodiversidad,
  },
]
