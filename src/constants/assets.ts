const PEXELS_BASE = 'https://images.pexels.com/photos';

export const BACKGROUNDS = {
  cafeteria: `${PEXELS_BASE}/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=800`,
  cafeteriaEmpty: `${PEXELS_BASE}/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=800`,
  sunrise: `${PEXELS_BASE}/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800`,
};

export const CITY_BANNERS: Record<string, string> = {
  'Sao Paulo': `${PEXELS_BASE}/2049422/pexels-photo-2049422.jpeg?auto=compress&cs=tinysrgb&w=400`,
  'Rio de Janeiro': `${PEXELS_BASE}/2868242/pexels-photo-2868242.jpeg?auto=compress&cs=tinysrgb&w=400`,
  'Belo Horizonte': `${PEXELS_BASE}/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=400`,
  'Curitiba': `${PEXELS_BASE}/3889854/pexels-photo-3889854.jpeg?auto=compress&cs=tinysrgb&w=400`,
  'Salvador': `${PEXELS_BASE}/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=400`,
  'Brasilia': `${PEXELS_BASE}/3889856/pexels-photo-3889856.jpeg?auto=compress&cs=tinysrgb&w=400`,
  'Porto Alegre': `${PEXELS_BASE}/3889857/pexels-photo-3889857.jpeg?auto=compress&cs=tinysrgb&w=400`,
  'Recife': `${PEXELS_BASE}/3889858/pexels-photo-3889858.jpeg?auto=compress&cs=tinysrgb&w=400`,
  'Florianopolis': `${PEXELS_BASE}/3889859/pexels-photo-3889859.jpeg?auto=compress&cs=tinysrgb&w=400`,
  'Internacional': `${PEXELS_BASE}/3889860/pexels-photo-3889860.jpeg?auto=compress&cs=tinysrgb&w=400`,
};

export const DRINK_IMAGES: Record<string, string> = {
  'cafe-coado': `${PEXELS_BASE}/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'espresso': `${PEXELS_BASE}/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'espresso-duplo': `${PEXELS_BASE}/1170659/pexels-photo-1170659.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'americano': `${PEXELS_BASE}/1233528/pexels-photo-1233528.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'ristretto': `${PEXELS_BASE}/2396220/pexels-photo-2396220.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'lungo': `${PEXELS_BASE}/1727123/pexels-photo-1727123.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'cafe-turco': `${PEXELS_BASE}/2067628/pexels-photo-2067628.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'red-eye': `${PEXELS_BASE}/2615323/pexels-photo-2615323.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'cafe-pingado': `${PEXELS_BASE}/1193335/pexels-photo-1193335.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'macchiato': `${PEXELS_BASE}/1749303/pexels-photo-1749303.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'cappuccino': `${PEXELS_BASE}/302896/pexels-photo-302896.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'latte': `${PEXELS_BASE}/350478/pexels-photo-350478.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'flat-white': `${PEXELS_BASE}/2074122/pexels-photo-2074122.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'mocha': `${PEXELS_BASE}/1727492/pexels-photo-1727492.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'chai-latte': `${PEXELS_BASE}/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'cafe-com-leite': `${PEXELS_BASE}/1233535/pexels-photo-1233535.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'cortado': `${PEXELS_BASE}/1749303/pexels-photo-1749303.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'breve': `${PEXELS_BASE}/2318028/pexels-photo-2318028.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'bombon': `${PEXELS_BASE}/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'vienna-coffee': `${PEXELS_BASE}/1727492/pexels-photo-1727492.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'cold-brew': `${PEXELS_BASE}/1193335/pexels-photo-1193335.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'iced-latte': `${PEXELS_BASE}/2396220/pexels-photo-2396220.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'frappe': `${PEXELS_BASE}/2615323/pexels-photo-2615323.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'nitro-coffee': `${PEXELS_BASE}/1170659/pexels-photo-1170659.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'affogato': `${PEXELS_BASE}/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'iced-mocha': `${PEXELS_BASE}/2318028/pexels-photo-2318028.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'cafe-gelado-br': `${PEXELS_BASE}/1233528/pexels-photo-1233528.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'mazagran': `${PEXELS_BASE}/1193335/pexels-photo-1193335.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'japanese-iced': `${PEXELS_BASE}/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'espresso-tonic': `${PEXELS_BASE}/2615323/pexels-photo-2615323.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'v60': `${PEXELS_BASE}/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'chemex': `${PEXELS_BASE}/1727123/pexels-photo-1727123.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'aeropress': `${PEXELS_BASE}/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'siphon': `${PEXELS_BASE}/2067628/pexels-photo-2067628.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'moka': `${PEXELS_BASE}/1749303/pexels-photo-1749303.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'french-press': `${PEXELS_BASE}/1233535/pexels-photo-1233535.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'turkish-sand': `${PEXELS_BASE}/2067628/pexels-photo-2067628.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'espresso-tonic-rosemary': `${PEXELS_BASE}/2615323/pexels-photo-2615323.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'drip-specialty': `${PEXELS_BASE}/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=100`,
  'cafe-jacu': `${PEXELS_BASE}/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=100`,
};

export const MACHINE_IMAGES: Record<string, string> = {
  'cafeteira-simples': `${PEXELS_BASE}/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=120`,
  'chaleira-eletrica': `${PEXELS_BASE}/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=120`,
  'espresso-basica': `${PEXELS_BASE}/1170659/pexels-photo-1170659.jpeg?auto=compress&cs=tinysrgb&w=120`,
  'vaporizador': `${PEXELS_BASE}/350478/pexels-photo-350478.jpeg?auto=compress&cs=tinysrgb&w=120`,
  'cold-brew-tower': `${PEXELS_BASE}/1193335/pexels-photo-1193335.jpeg?auto=compress&cs=tinysrgb&w=120`,
  'espresso-dupla': `${PEXELS_BASE}/2396220/pexels-photo-2396220.jpeg?auto=compress&cs=tinysrgb&w=120`,
  'v60-station': `${PEXELS_BASE}/1727123/pexels-photo-1727123.jpeg?auto=compress&cs=tinysrgb&w=120`,
  'nitro-tap': `${PEXELS_BASE}/1233528/pexels-photo-1233528.jpeg?auto=compress&cs=tinysrgb&w=120`,
  'la-marzocca': `${PEXELS_BASE}/2067628/pexels-photo-2067628.jpeg?auto=compress&cs=tinysrgb&w=120`,
  'siphon-bar': `${PEXELS_BASE}/2615323/pexels-photo-2615323.jpeg?auto=compress&cs=tinysrgb&w=120`,
  'slayer-espresso': `${PEXELS_BASE}/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=120`,
};

export const CUSTOMER_IMAGES: Record<string, string> = {
  regular: `${PEXELS_BASE}/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=80`,
  hipster: `${PEXELS_BASE}/1484806/pexels-photo-1484806.jpeg?auto=compress&cs=tinysrgb&w=80`,
  executivo: `${PEXELS_BASE}/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=80`,
  influencer: `${PEXELS_BASE}/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80`,
  turista: `${PEXELS_BASE}/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=80`,
  critico: `${PEXELS_BASE}/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=80`,
  celebridade: `${PEXELS_BASE}/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=80`,
  juiz: `${PEXELS_BASE}/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=80`,
};

export const BARISTA_IMAGES: Record<string, string[]> = {
  comum: [
    `${PEXELS_BASE}/3771120/pexels-photo-3771120.jpeg?auto=compress&cs=tinysrgb&w=100`,
    `${PEXELS_BASE}/3771106/pexels-photo-3771106.jpeg?auto=compress&cs=tinysrgb&w=100`,
    `${PEXELS_BASE}/4349785/pexels-photo-4349785.jpeg?auto=compress&cs=tinysrgb&w=100`,
  ],
  bom: [
    `${PEXELS_BASE}/3771120/pexels-photo-3771120.jpeg?auto=compress&cs=tinysrgb&w=100`,
    `${PEXELS_BASE}/4349785/pexels-photo-4349785.jpeg?auto=compress&cs=tinysrgb&w=100`,
  ],
  expert: [
    `${PEXELS_BASE}/3771106/pexels-photo-3771106.jpeg?auto=compress&cs=tinysrgb&w=100`,
    `${PEXELS_BASE}/4349785/pexels-photo-4349785.jpeg?auto=compress&cs=tinysrgb&w=100`,
  ],
  mestre: [
    `${PEXELS_BASE}/3771120/pexels-photo-3771120.jpeg?auto=compress&cs=tinysrgb&w=100`,
  ],
  lenda: [
    `${PEXELS_BASE}/4349785/pexels-photo-4349785.jpeg?auto=compress&cs=tinysrgb&w=100`,
  ],
};

export const DECORATION_IMAGES: Record<string, string> = {
  'mesa-simples': `${PEXELS_BASE}/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=80`,
  'mesa-madeira': `${PEXELS_BASE}/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=80`,
  'mesa-premium': `${PEXELS_BASE}/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=80`,
  'poltrona': `${PEXELS_BASE}/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=80`,
  'sofa': `${PEXELS_BASE}/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=80`,
  'balcao-mdf': `${PEXELS_BASE}/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=80`,
  'balcao-marmore': `${PEXELS_BASE}/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=80`,
  'quadro-generico': `${PEXELS_BASE}/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=80`,
  'arte-local': `${PEXELS_BASE}/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=80`,
  'galeria': `${PEXELS_BASE}/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=80`,
  'planta-artificial': `${PEXELS_BASE}/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=80`,
  'planta-real': `${PEXELS_BASE}/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=80`,
  'jardim-vertical': `${PEXELS_BASE}/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=80`,
  'lampada': `${PEXELS_BASE}/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=80`,
  'pendente': `${PEXELS_BASE}/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=80`,
  'edison': `${PEXELS_BASE}/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=80`,
  'radio': `${PEXELS_BASE}/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=80`,
  'playlist': `${PEXELS_BASE}/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=80`,
  'musica-vivo': `${PEXELS_BASE}/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=80`,
  'wifi-basico': `${PEXELS_BASE}/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=80`,
  'wifi-premium': `${PEXELS_BASE}/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=80`,
  'difusor': `${PEXELS_BASE}/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=80`,
  'sala-extra': `${PEXELS_BASE}/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=80`,
  'terraco': `${PEXELS_BASE}/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=80`,
  'segundo-andar': `${PEXELS_BASE}/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=80`,
  'rooftop': `${PEXELS_BASE}/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=80`,
};

export const EVENT_IMAGES: Record<string, string> = {
  'tourist-group': `${PEXELS_BASE}/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400`,
  'rain': `${PEXELS_BASE}/1089440/pexels-photo-1089440.jpeg?auto=compress&cs=tinysrgb&w=400`,
  'influencer-visit': `${PEXELS_BASE}/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400`,
  'happy-hour': `${PEXELS_BASE}/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=400`,
  'coffee-festival': `${PEXELS_BASE}/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400`,
  'review-bomb': `${PEXELS_BASE}/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=400`,
  'rush-hour': `${PEXELS_BASE}/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=400`,
  'celebrity-sighting': `${PEXELS_BASE}/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=400`,
  'barista-day': `${PEXELS_BASE}/3771120/pexels-photo-3771120.jpeg?auto=compress&cs=tinysrgb&w=400`,
  'special-bean': `${PEXELS_BASE}/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400`,
};

export const RARITY_BORDERS: Record<string, string> = {
  comum: 'border-cafe-300',
  bom: 'border-emerald-400',
  expert: 'border-sky-400',
  mestre: 'border-amber-400',
  lenda: 'border-yellow-400',
};

export const RARITY_GLOWS: Record<string, string> = {
  mestre: 'shadow-amber-400/40',
  lenda: 'shadow-yellow-400/60',
};

export const RARITY_BG_GRADIENTS: Record<string, string> = {
  comum: 'from-cafe-100 to-white',
  bom: 'from-emerald-50 to-white',
  expert: 'from-sky-50 to-white',
  mestre: 'from-amber-50 to-white',
  lenda: 'from-yellow-50 via-amber-50 to-white',
};

export const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  espresso: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' },
  leite: { bg: 'bg-stone-50', border: 'border-stone-200', text: 'text-stone-700' },
  gelados: { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-700' },
  specialty: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700' },
};

export const MACHINE_TIERS: Record<number, { label: string; color: string; bg: string }> = {
  1: { label: 'Bronze', color: 'text-amber-700', bg: 'bg-amber-100' },
  2: { label: 'Prata', color: 'text-slate-500', bg: 'bg-slate-100' },
  3: { label: 'Ouro', color: 'text-yellow-600', bg: 'bg-yellow-100' },
  4: { label: 'Platina', color: 'text-sky-600', bg: 'bg-sky-100' },
  5: { label: 'Diamante', color: 'text-cyan-600', bg: 'bg-gradient-to-r from-cyan-100 to-yellow-100' },
};

export function getMachineTier(cost: number): number {
  if (cost >= 50000) return 5;
  if (cost >= 15000) return 4;
  if (cost >= 5000) return 3;
  if (cost >= 2000) return 2;
  return 1;
}
