import Link from "next/link";

const About = () => (
  <div>
    <Link href="/">
      <a>Home Page</a>
    </Link>
    <Link href="/about">
      <a>About Page</a>
    </Link>
    <p>Hello About Page</p>
  </div>
);

export default About;
