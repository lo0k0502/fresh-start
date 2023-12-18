export const handler = () => {
  const headers = new Headers();
  headers.set('location', '/');

  return new Response(null, { status: 302, headers });
};

export default function Error404() {
  return <div class='text-4xl font-bold'>404 - Page not found</div>;
}
