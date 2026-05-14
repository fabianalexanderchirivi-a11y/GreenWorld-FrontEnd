import Bin from '../img/Bin.webp'
import Energy from '../img/Energy.webp'
import Water from '../img/Water.webp'
import World from '../img/World.webp'
import Huerta from '../img/Huerta.png'
import Conservar from '../img/Conservar.webp'
import Biodiversidad from '../img/Tortugas.webp'
import Consumo from '../img/Consumo.webp'
import Residuo from '../img/Residue.webp'
import Light from '../img/Light.webp'
import Shower from '../img/Shower.webp'
import Evitar from '../img/Evitar.webp'
import Walking from '../img/Walking.webp'
import Planta from '../img/Plant.webp'
import Bottle from '../img/Bottle.webp'
import Trash from '../img/Trash.webp'

const imageMap = {
  'Bin.webp': Bin,
  'Energy.webp': Energy,
  'Water.webp': Water,
  'World.webp': World,
  'Huerta.png': Huerta,
  'Conservar.webp': Conservar,
  'Tortugas.webp': Biodiversidad,
  'Consumo.webp': Consumo,
  'Residue.webp': Residuo,
  'Light.webp': Light,
  'Shower.webp': Shower,
  'Evitar.webp': Evitar,
  'Walking.webp': Walking,
  'Plant.webp': Planta,
  'Bottle.webp': Bottle,
  'Trash.webp': Trash
}

export const resolveImage = (image, fallback = Bin) => {
  if (!image) {
    return fallback
  }

  if (image.startsWith('http') || image.startsWith('/') || image.startsWith('data:')) {
    return image
  }

  return imageMap[image] || fallback
}
