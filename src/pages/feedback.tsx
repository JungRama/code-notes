export function getServerSideProps() {
  return {
    redirect: {
      permanent: false,
      destination: 'https://jungrama.com/',
    },
  };
}

export default function Feedback() {
  return <></>;
}
