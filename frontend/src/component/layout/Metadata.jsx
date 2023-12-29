import { Helmet } from "react-helmet-async";

export default function Metadata({ title }) {
  return (
    <Helmet>
      <title>{`${title} -jvl cart`}</title>
    </Helmet>
  );
}
