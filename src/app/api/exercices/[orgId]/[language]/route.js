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
          defaultCode: `function FizzBuzz(n) {
    // Ecrivez votre code ici
}`,
          markdown:
            "L'objectif de cet exercices est d'écrire un programme qui pour n'importe quelle nombre renvoie le nombre sauf pour les exceptions suivante:" +
            "\n" +
            "- Pour les multiples de 3, on renvoie **'Fizz'** à la place du nombre.\n" +
            "- Pour les multiples de 5, on renvoie **'Buzz'** à la place du nombre.\n" +
            "- Pour les multiples de 3 et 5, on renvoie **'FizzBuzz'** à la place du nombre.",
          difficulty: 1,
          test: [
            { id: 0, title: "Test 1", input: 1, expected: 1 },
            { id: 1, title: "Test 2", input: 3, expected: "Fizz" },
            { id: 2, title: "Test 3", input: 5, expected: "Buzz" },
            { id: 3, title: "Test 4", input: 15, expected: "FizzBuzz" },
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

export const data = new Array({ id: 0, tests: dataOrg1 });

export const GET = (req, { params }) => {
  const { orgId, language } = params;
  const org = data.find(({ id }) => id === parseInt(orgId));
  if (!org) return NextResponse.json([{}]);
  return NextResponse.json({
    data: org.tests.get(language),
  });
};
