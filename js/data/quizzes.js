/* ================================================================
   QUIZ DATA — js/data/quizzes.js
   ----------------------------------------------------------------
   The questions for the Quizzes tab. One key per quiz (partnerA, partnerB, us),
   each with a title and a list of questions. Every question has:
     q       the question text
     options the answer choices (any number, usually 4)
     correct index of the right answer, starting at 0
   Optional extras on a question:
     correctSpecial     custom message when it's answered correctly
     wrongSpecial       custom message when it's answered wrong
     wrongSpecialIdx    only show wrongSpecial for this wrong answer
   The cheering / scoring messages live in app.js (search QUIZ_MSGS).
   Everything below is placeholder text — replace it with your own.
   ================================================================ */

const QUIZ_DATA = {
  partnerB: {
    title: `${CONFIG.names.partnerB}'s Quiz`,
    questions: [
      {
        q: `Sample question 1: replace this with a question about ${CONFIG.names.partnerB}.`,
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 0,
      },
      {
        q: `Sample question 2: replace this with a question about ${CONFIG.names.partnerB}.`,
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 1,
      },
      {
        q: `Sample question 3: replace this with a question about ${CONFIG.names.partnerB}.`,
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 2,
      },
      {
        q: `Sample question 4: replace this with a question about ${CONFIG.names.partnerB}.`,
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 3,
      },
      {
        q: `Sample question 5: replace this with a question about ${CONFIG.names.partnerB}.`,
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 0,
      },
      {
        q: `Sample question 6: replace this with a question about ${CONFIG.names.partnerB}.`,
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 1,
      },
      {
        q: `Sample question 7: replace this with a question about ${CONFIG.names.partnerB}.`,
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 2,
      },
      {
        q: `Sample question 8: replace this with a question about ${CONFIG.names.partnerB}.`,
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 3,
      },
      {
        q: `Sample question 9: replace this with a question about ${CONFIG.names.partnerB}.`,
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 0,
      },
      {
        q: `Sample question 10: replace this with a question about ${CONFIG.names.partnerB}.`,
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 1,
      },
    ],
  },
  partnerA: {
    title: `${CONFIG.names.partnerA}'s Quiz`,
    questions: [
      {
        q: `Sample question 1: replace this with a question about ${CONFIG.names.partnerA}.`,
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 0,
      },
      {
        q: `Sample question 2: replace this with a question about ${CONFIG.names.partnerA}.`,
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 1,
      },
      {
        q: `Sample question 3: replace this with a question about ${CONFIG.names.partnerA}.`,
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 2,
      },
      {
        q: `Sample question 4: replace this with a question about ${CONFIG.names.partnerA}.`,
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 3,
      },
      {
        q: `Sample question 5: replace this with a question about ${CONFIG.names.partnerA}.`,
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 0,
      },
      {
        q: `Sample question 6: replace this with a question about ${CONFIG.names.partnerA}.`,
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 1,
      },
      {
        q: `Sample question 7: replace this with a question about ${CONFIG.names.partnerA}.`,
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 2,
      },
      {
        q: `Sample question 8: replace this with a question about ${CONFIG.names.partnerA}.`,
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 3,
      },
      {
        q: `Sample question 9: replace this with a question about ${CONFIG.names.partnerA}.`,
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 0,
      },
      {
        q: `Sample question 10: replace this with a question about ${CONFIG.names.partnerA}.`,
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 1,
      },
    ],
  },
  us: {
    title: "Us Together Quiz",
    questions: [
      {
        q: "Sample question 1: replace this with a question about us.",
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 0,
      },
      {
        q: "Sample question 2: replace this with a question about us.",
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 1,
      },
      {
        q: "Sample question 3: replace this with a question about us.",
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 2,
      },
      {
        q: "Sample question 4: replace this with a question about us.",
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 3,
      },
      {
        q: "Sample question 5: replace this with a question about us.",
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 0,
      },
      {
        q: "Sample question 6: replace this with a question about us.",
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 1,
      },
      {
        q: "Sample question 7: replace this with a question about us.",
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 2,
      },
      {
        q: "Sample question 8: replace this with a question about us.",
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 3,
      },
      {
        q: "Sample question 9: replace this with a question about us.",
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 0,
      },
      {
        q: "Sample question 10: replace this with a question about us.",
        options: [
          "Answer A (placeholder)",
          "Answer B (placeholder)",
          "Answer C (placeholder)",
          "Answer D (placeholder)",
        ],
        correct: 1,
      },
    ],
  },
};
