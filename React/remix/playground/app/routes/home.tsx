import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Suspense } from "react";
import { Await, useLoaderData } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const timeout = (ms: number) => new Promise((res) => setTimeout(res, ms));

export function loader() {
  return {
    courses: timeout(2000).then(() => ["A", "B", "C"])
  }
}

export default function Home() {
  const { courses } = useLoaderData();
  return (
    <main>
      <header>
        <h1>Courses</h1>
      </header>
      <Suspense fallback={<ul><li>Loading Courses...</li></ul>}>
        <Await resolve={courses}>
          {(crs) => <ul>{crs.map((course: string, index: number) => (
            <li key={index}>{course}</li>
          ))}</ul>}
        </Await>
      </Suspense>
    </main>
  )
}
