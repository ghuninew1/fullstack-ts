import { useState } from "react";
// import { cx } from "#utils";

export default function About() {
    const [count, setCount] = useState(0);

    return <h1>{count}</h1>;
}

