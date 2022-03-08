import { Form } from "remix";

export default function Index() {
  return (
    <>
      <Form>
        <label>
          Sökterm
          <input type="search" name="live-code-search-field" />
        </label>
      </Form>
    </>
  );
}
