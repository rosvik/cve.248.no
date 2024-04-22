// https://nextjs.org/docs/pages/api-reference/next-config-js/images
export default function imageLoader({ src, width }) {
  return `https://img.248.no/image.jpg?w=${width}&url=${src}`;
}
