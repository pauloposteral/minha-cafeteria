export const CUSTOMER_NAMES = [
  'Ana', 'Pedro', 'Julia', 'Lucas', 'Maria', 'Gabriel', 'Beatriz', 'Rafael',
  'Larissa', 'Matheus', 'Fernanda', 'Gustavo', 'Camila', 'Bruno', 'Amanda',
  'Diego', 'Leticia', 'Felipe', 'Isabela', 'Rodrigo', 'Carolina', 'Thiago',
  'Mariana', 'Leonardo', 'Daniela', 'Eduardo', 'Patricia', 'Marcelo',
  'Vanessa', 'Ricardo', 'Renata', 'Andre', 'Priscila', 'Carlos', 'Tatiana',
  'Vinicius', 'Juliana', 'Fabio', 'Luciana', 'Henrique', 'Monica', 'Paulo',
  'Aline', 'Sergio', 'Natalia', 'Roberto', 'Raquel', 'Fernando', 'Bianca',
  'Alexandre',
];

export const BARISTA_NAMES = [
  'Joao', 'Maria Clara', 'Enzo', 'Valentina', 'Arthur', 'Helena',
  'Davi', 'Alice', 'Bernardo', 'Sophia', 'Heitor', 'Laura',
  'Lorenzo', 'Isabella', 'Theo', 'Manuela', 'Miguel', 'Cecilia',
  'Samuel', 'Liz',
];

export const BARISTA_AVATARS = [
  '👨‍🍳', '👩‍🍳', '🧑‍🍳', '👨', '👩', '🧑', '👦', '👧',
  '🧔', '👱‍♀️', '👱', '🧑‍🦱', '👩‍🦱', '🧑‍🦰', '👩‍🦰',
];

export const CUSTOMER_TYPE_CONFIG: Record<string, {
  emoji: string;
  name: string;
  patienceMult: number;
  payMultiplier: number;
  unlockLevel: number;
}> = {
  regular: { emoji: '🧑', name: 'Regular', patienceMult: 1, payMultiplier: 1, unlockLevel: 1 },
  hipster: { emoji: '🧔', name: 'Hipster', patienceMult: 1.2, payMultiplier: 2, unlockLevel: 5 },
  executivo: { emoji: '👔', name: 'Executivo', patienceMult: 0.6, payMultiplier: 3, unlockLevel: 8 },
  influencer: { emoji: '📸', name: 'Influencer', patienceMult: 0.8, payMultiplier: 2, unlockLevel: 10 },
  turista: { emoji: '🌍', name: 'Turista', patienceMult: 1.3, payMultiplier: 4, unlockLevel: 13 },
  critico: { emoji: '👑', name: 'Critico', patienceMult: 0.7, payMultiplier: 3, unlockLevel: 16 },
  celebridade: { emoji: '⭐', name: 'Celebridade', patienceMult: 0.5, payMultiplier: 10, unlockLevel: 20 },
  juiz: { emoji: '🏆', name: 'Juiz do Cafe', patienceMult: 0.8, payMultiplier: 5, unlockLevel: 25 },
};

export const REVIEW_TEMPLATES = {
  good: [
    'Cafe excelente! Voltarei com certeza.',
    'Ambiente incrivel e o barista arrasou!',
    'Melhor espresso da regiao.',
    'Adorei a experiencia, atendimento rapido.',
    'Que cappuccino divino! Nota 10.',
    'Lugar perfeito para trabalhar com um bom cafe.',
    'O cold brew aqui e sensacional!',
  ],
  medium: [
    'Cafe bom, mas a espera foi um pouco longa.',
    'Ambiente agradavel, cafe poderia ser melhor.',
    'OK, nada de especial mas cumpre o papel.',
    'Bom cafe, porem o ambiente precisa melhorar.',
  ],
  bad: [
    'Esperei demais, sai sem pedir.',
    'O cafe estava frio e sem sabor.',
    'Precisa melhorar muito o atendimento.',
    'Nao recomendo, experiencia frustrante.',
  ],
};
