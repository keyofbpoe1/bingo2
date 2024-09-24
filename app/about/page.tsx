export default function AboutPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">About</h1>
      <p>
        This website was created by{" "}
        <a href="https://github.com/joshuakgoldberg" className="text-blue-600">
          Joshua Goldberg
        </a>
        . It is a Next.js application that uses the{" "}
        <a
          href="https://github.com/joshuakgoldberg/fallacy-bingo-data"
          className="text-blue-600"
        >
          Fallacy Bingo data
        </a>{" "}
        repository.
      </p>
    </main>
  );
}
