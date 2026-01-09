export const IMAGE_CONFIG = {
  baseUrl: 'https://meusite.com/img', // USER should change this
  patterns: {
    components: (id: number, drawable: number, texture: number) => `/components/${id}/${drawable}_${texture}.png`,
    props: (id: number, drawable: number, texture: number) => `/props/${id}/${drawable}_${texture}.png`,
    headBlend: (type: 'face' | 'skin', id: number) => `/parents/${type}_${id}.png`,
  },
  placeholder: 'https://via.placeholder.com/150?text=No+Image',
};
