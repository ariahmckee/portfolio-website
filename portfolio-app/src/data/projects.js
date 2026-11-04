export const startupBrandIcons = [
  { id: 'android', icon: 'fa-brands fa-android', href: 'https://www.android.com/' },
  { id: 'apple', icon: 'fa-brands fa-apple', href: 'https://www.apple.com/' },
  { id: 'amazon', icon: 'fa-brands fa-amazon', href: 'https://www.amazon.com/' },
  { id: 'xbox', icon: 'fa-brands fa-xbox', href: 'https://www.xbox.com/' },
  { id: 'aws', icon: 'fa-brands fa-aws', href: 'https://aws.amazon.com/' },
  { id: 'cloudflare', icon: 'fa-brands fa-cloudflare', href: 'https://www.cloudflare.com/' },
  { id: 'playstation', icon: 'fa-brands fa-playstation', href: 'https://www.playstation.com/' },
  { id: 'zoom', icon: 'fa-brands fa-zoom', href: 'https://zoom.us/' },
  { id: 'lyft', icon: 'fa-brands fa-lyft', href: 'https://www.lyft.com/' },
  { id: 'airbnb', icon: 'fa-brands fa-airbnb', href: 'https://www.airbnb.com/' },
]

export const softwareTechIcons = [
  { id: 'javascript', icon: 'fa-brands fa-js', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { id: 'react', icon: 'fa-brands fa-react', href: 'https://react.dev/' },
  { id: 'node', icon: 'fa-brands fa-node-js', href: 'https://nodejs.org/' },
  { id: 'python', icon: 'fa-brands fa-python', href: 'https://www.python.org/' },
  { id: 'css3', icon: 'fa-brands fa-css3-alt', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { id: 'html5', icon: 'fa-brands fa-html5', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { id: 'typescript', icon: 'fa-brands fa-jsfiddle', href: 'https://www.typescriptlang.org/' },
  { id: 'database', icon: 'fa-solid fa-database', href: 'https://www.postgresql.org/' },
  { id: 'docker', icon: 'fa-brands fa-docker', href: 'https://www.docker.com/' },
  { id: 'git', icon: 'fa-brands fa-git-alt', href: 'https://git-scm.com/' },
]

export const bimTechIcons = [
  { id: 'revit', icon: 'fa-solid fa-building-columns', href: 'https://www.autodesk.com/products/revit/' },
  { id: 'cad', icon: 'fa-solid fa-drafting-compass', href: 'https://www.autodesk.com/products/autocad/' },
  { id: 'python', icon: 'fa-brands fa-python', href: 'https://www.python.org/' },
  { id: 'ruler', icon: 'fa-solid fa-ruler-combined', href: 'https://en.wikipedia.org/wiki/Technical_drawing' },
  { id: 'layers', icon: 'fa-solid fa-layer-group', href: 'https://www.autodesk.com/products/revit/' },
  { id: 'cubes', icon: 'fa-solid fa-cubes', href: 'https://www.autodesk.com/products/revit/' },
  { id: 'file', icon: 'fa-regular fa-file-code', href: 'https://www.python.org/' },
  { id: 'design', icon: 'fa-solid fa-wand-magic-sparkles', href: 'https://www.autodesk.com/products/revit/' },
  { id: 'graph', icon: 'fa-solid fa-chart-line', href: 'https://www.autodesk.com/products/revit/' },
  { id: 'api', icon: 'fa-solid fa-code', href: 'https://developer.mozilla.org/en-US/docs/Web/API' },
]

export const projects = [
  {
    id: 'mechanic-shop-api',
    title: 'Mechanic Shop API',
    summary: 'Backend service for shop operations and inventory.',
    category: 'software-engineering',
    technologies: [
      { id: 'node', icon: 'fa-brands fa-node-js', href: '#' },
      { id: 'js', icon: 'fa-brands fa-js', href: '#' },
      { id: 'database', icon: 'fa-solid fa-database', href: '#' },
      { id: 'api', icon: 'fa-solid fa-code', href: '#' },
    ],
  },
  {
    id: 'ecommerce-app',
    title: 'E-Commerce App',
    summary: 'Modern storefront experience with customer flows.',
    category: 'software-engineering',
    technologies: [
      { id: 'react', icon: 'fa-brands fa-react', href: '#' },
      { id: 'css3', icon: 'fa-brands fa-css3-alt', href: '#' },
      { id: 'html5', icon: 'fa-brands fa-html5', href: '#' },
      { id: 'npm', icon: 'fa-brands fa-npm', href: '#' },
    ],
  },
  {
    id: 'bim-automation-suite',
    title: 'BIM Automation Suite',
    summary: 'Automated workflows for BIM and project coordination.',
    category: 'bim-vdc',
    technologies: [
      { id: 'revit', icon: 'fa-solid fa-building-columns', href: '#' },
      { id: 'python', icon: 'fa-brands fa-python', href: '#' },
      { id: 'file', icon: 'fa-regular fa-file-code', href: '#' },
      { id: 'cubes', icon: 'fa-solid fa-cubes', href: '#' },
    ],
  },
  {
    id: 'architectural-design',
    title: 'Architectural Design',
    summary: 'Design coordination and model-driven planning.',
    category: 'bim-vdc',
    technologies: [
      { id: 'cad', icon: 'fa-solid fa-drafting-compass', href: '#' },
      { id: 'layers', icon: 'fa-solid fa-layer-group', href: '#' },
      { id: 'ruler', icon: 'fa-solid fa-ruler-combined', href: '#' },
      { id: 'wand', icon: 'fa-solid fa-wand-magic-sparkles', href: '#' },
    ],
  },
]

export default projects
