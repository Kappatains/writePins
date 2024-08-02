export interface Pin {
    title?: string;
    tags?: string[];
    description?: string;
    author?: string;
    source?: string;
    date?: string;
    id: number;
  }

  const pin: Pin[] = [
    {
      title: 'Une mine riche',
      tags: ['#education', '#interiorite'],
      description: "Considérez l'homme comme une minne riche en pierres précieuses d'une valeur inestimable. Seule l'éducation peut l'amener à en livrer les trésors et permettre à l'humanité d'en profiter.",
      author: "Bahá'u'lláh",
      source: "Florilège des Écrits de Bahá'u'lláh",
      date: "Créée le 2 mars 2023",
      id: 1,
    },
    {
      title: 'Biscote',
      tags: ['#education', '#interiorite'],
      description: "J'aime me beurrer la biscotte.",
      author: "Hubert Bonisseur de la Bath",
      source: "OSS117",
      date: "19 avril 2006",
      id: 2,
    },
];

export const getPins = () => pin;
export const getPin = (id: number) => pin.find(m => m.id === id);