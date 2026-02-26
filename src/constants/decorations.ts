import type { Decoration } from '../types/game';

export const DECORATIONS: Decoration[] = [
  { id: 'mesa-simples', name: 'Mesa Simples', category: 'mobilia', cost: 200, ambiencePoints: 2, icon: '🪑', unlockLevel: 1, description: 'Mesa basica de madeira. +2 lugares.' },
  { id: 'mesa-madeira', name: 'Mesa de Madeira', category: 'mobilia', cost: 800, ambiencePoints: 5, icon: '🪑', unlockLevel: 5, description: 'Mesa de madeira macica. +2 lugares, mais charme.' },
  { id: 'mesa-premium', name: 'Mesa Premium', category: 'mobilia', cost: 3000, ambiencePoints: 12, icon: '🪑', unlockLevel: 12, description: 'Mesa de design. +2 lugares, premium.' },
  { id: 'poltrona', name: 'Poltrona', category: 'mobilia', cost: 500, ambiencePoints: 4, icon: '🛋️', unlockLevel: 3, description: 'Poltrona confortavel. +1 lugar.' },
  { id: 'sofa', name: 'Sofa', category: 'mobilia', cost: 2000, ambiencePoints: 8, icon: '🛋️', unlockLevel: 8, description: 'Sofa aconchegante. +3 lugares.' },
  { id: 'balcao-mdf', name: 'Balcao MDF', category: 'mobilia', cost: 500, ambiencePoints: 3, icon: '🏪', unlockLevel: 1, description: 'Balcao basico de MDF.' },
  { id: 'balcao-marmore', name: 'Balcao Marmore', category: 'mobilia', cost: 5000, ambiencePoints: 15, icon: '🏪', unlockLevel: 10, description: 'Balcao de marmore elegante.' },

  { id: 'quadro-generico', name: 'Quadro Generico', category: 'decoracao', cost: 300, ambiencePoints: 3, icon: '🖼️', unlockLevel: 2, description: 'Um quadro simples na parede.' },
  { id: 'arte-local', name: 'Arte Local', category: 'decoracao', cost: 1500, ambiencePoints: 8, icon: '🎨', unlockLevel: 7, description: 'Obra de artista local.' },
  { id: 'galeria', name: 'Galeria de Arte', category: 'decoracao', cost: 5000, ambiencePoints: 20, icon: '🎨', unlockLevel: 15, description: 'Uma parede inteira de arte.' },
  { id: 'planta-artificial', name: 'Planta Artificial', category: 'decoracao', cost: 200, ambiencePoints: 2, icon: '🌿', unlockLevel: 1, description: 'Planta decorativa artificial.' },
  { id: 'planta-real', name: 'Planta Real', category: 'decoracao', cost: 800, ambiencePoints: 6, icon: '🌱', unlockLevel: 5, description: 'Planta real — mais vida ao ambiente.' },
  { id: 'jardim-vertical', name: 'Jardim Vertical', category: 'decoracao', cost: 4000, ambiencePoints: 18, icon: '🌿', unlockLevel: 14, description: 'Parede verde impressionante.' },

  { id: 'lampada', name: 'Lampada Fluorescente', category: 'ambiente', cost: 100, ambiencePoints: 1, icon: '💡', unlockLevel: 1, description: 'Iluminacao basica.' },
  { id: 'pendente', name: 'Luminaria Pendente', category: 'ambiente', cost: 600, ambiencePoints: 5, icon: '💡', unlockLevel: 4, description: 'Luminaria pendente aconchegante.' },
  { id: 'edison', name: 'Iluminacao Edison', category: 'ambiente', cost: 2000, ambiencePoints: 12, icon: '💡', unlockLevel: 9, description: 'Lampadas Edison vintage.' },
  { id: 'radio', name: 'Radio', category: 'ambiente', cost: 500, ambiencePoints: 4, icon: '🎵', unlockLevel: 3, description: 'Musica ambiente basica.' },
  { id: 'playlist', name: 'Playlist Curada', category: 'ambiente', cost: 2000, ambiencePoints: 10, icon: '🎵', unlockLevel: 8, description: 'Playlist profissional de jazz e bossa.' },
  { id: 'musica-vivo', name: 'Musica ao Vivo', category: 'ambiente', cost: 10000, ambiencePoints: 30, icon: '🎸', unlockLevel: 18, description: 'Musico ao vivo nos fins de semana!' },
  { id: 'wifi-basico', name: 'Wi-Fi Basico', category: 'ambiente', cost: 300, ambiencePoints: 3, icon: '📶', unlockLevel: 2, description: 'Wi-Fi para os clientes.' },
  { id: 'wifi-premium', name: 'Wi-Fi Premium', category: 'ambiente', cost: 1500, ambiencePoints: 8, icon: '📶', unlockLevel: 7, description: 'Wi-Fi rapido e estavel.' },
  { id: 'difusor', name: 'Difusor de Aromas', category: 'ambiente', cost: 400, ambiencePoints: 4, icon: '🌸', unlockLevel: 4, description: 'Aroma de cafe fresco no ar.' },

  { id: 'sala-extra', name: '2a Sala', category: 'expansao', cost: 10000, ambiencePoints: 15, icon: '🏗️', unlockLevel: 10, description: 'Expande sua cafeteria com uma sala extra. +6 lugares.' },
  { id: 'terraco', name: 'Terraco', category: 'expansao', cost: 25000, ambiencePoints: 25, icon: '☀️', unlockLevel: 15, description: 'Area ao ar livre. +8 lugares.' },
  { id: 'segundo-andar', name: '2o Andar', category: 'expansao', cost: 100000, ambiencePoints: 40, icon: '🏢', unlockLevel: 22, description: 'Um andar inteiro novo. +12 lugares.' },
  { id: 'rooftop', name: 'Rooftop', category: 'expansao', cost: 500000, ambiencePoints: 80, icon: '🌆', unlockLevel: 28, description: 'Rooftop premium com vista. +16 lugares.' },
];

export function getSeatsFromDecoration(decorationId: string): number {
  const seatMap: Record<string, number> = {
    'mesa-simples': 2,
    'mesa-madeira': 2,
    'mesa-premium': 2,
    'poltrona': 1,
    'sofa': 3,
    'sala-extra': 6,
    'terraco': 8,
    'segundo-andar': 12,
    'rooftop': 16,
  };
  return seatMap[decorationId] || 0;
}
