import { Form, LoaderFunction, useLoaderData } from "remix";
import { getFacts } from "~/facts";

interface Fact {
  title: string;
  filename: string;
}

export const loader: LoaderFunction = async ({ request }) => {
  let url = new URL(request.url);
  let q = url.searchParams.get("live-code-search-field");
  return getFacts(q);
};

export default function Index() {
  const facts = useLoaderData<Fact[]>();
  return (
    <>
      <Form>
        <label>
          Sökterm
          <input type="search" name="live-code-search-field" />
        </label>
      </Form>
      <ul>
        {facts.map((fact) => (
          <li key={fact.title}>{fact.title}</li>
        ))}
      </ul>
    </>
  );
}
