import { PageProps } from '$fresh/server.ts';

export default function FileProfile({ params: { fileURI } }: PageProps) {
  return <div>{fileURI}</div>;
}
