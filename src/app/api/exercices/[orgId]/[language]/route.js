import { NextRequest, NextResponse } from "next/server";

const dataOrg1 = new Map([
  [
    "js",
    {
      exercices: [
        {
          id: 1,
          title: "FizzBuzz",
          description: "FizzBuzz",
          markdown:
            "L'objectif de cet exercices est d'écrire un programme qui pour n'importe quelle nombre renvoie le nombre sauf pour les exceptions suivante:" +
            "\n" +
            "- Pour les multiples de 3, on renvoie **'Fizz'** à la place du nombre.\n" +
            "- Pour les multiples de 5, on renvoie **'Buzz'** à la place du nombre.\n" +
            "- Pour les multiples de 3 et 5, on renvoie **'FizzBuzz'** à la place du nombre.",
          difficulty: 1,
          test: [
            { title: "Test 1", input: 1, output: 1 },
            { title: "Test 2", input: 3, output: "Fizz" },
            { title: "Test 3", input: 5, output: "Buzz" },
            { title: "Test 4", input: 15, output: "FizzBuzz" },
          ],
          tags: ["string", "loop"],
        },
        { id: 2, title: "Palindrome" },
        { id: 3, title: "Factorielle" },
      ],
    },
  ],
  [
    "python",
    {
      exercices: [
        { id: 1, title: "FizzBuzz" },
        { id: 2, title: "Palindrome" },
        { id: 3, title: "Factorielle" },
      ],
    },
  ],
]);

const data = new Array({ id: 0, tests: dataOrg1 });

export const GET = (req, { params }) => {
  const { orgId, language } = params;
  const org = data.find(({ id }) => id === parseInt(orgId));
  if (!org) return NextResponse.json([{}]);
  return NextResponse.json({
    data: org.tests.get(language),
  });
};
