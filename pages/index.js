import Link from "next/link";

const Home = () => (
  <div>
    <Link href="/">
      <a>Home Page</a>
    </Link>
    <Link href="/about">
      <a>About Page</a>
    </Link>
    <p>Hello Next.js</p>
  </div>
);

export default Home;
