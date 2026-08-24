import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

export default function NotFound() {
  return (
    <PageWrapper>
      <section className="section notfound">
        <span className="eyebrow">404</span>
        <h2>This page hasn't been <span className="gradient-text">deployed yet.</span></h2>
        <Link to="/" className="btn btn-primary cursor-hover">Back to Home</Link>
      </section>
    </PageWrapper>
  );
}
