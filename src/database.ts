const stagesList = [
  { title: "Queue", ID: undefined, tasksList: [] },
  {
    title: "Shopping",
    ID: undefined,
    tasksList: [
      {
        title: "Go shopping",
        stageID: undefined,
        description: "You should pick some grocery at your nearest location.",
        attachments: [
          "https://www.biedronka.pl/pl?gad_source=1&gclid=Cj0KCQiAi_G5BhDXARIsAN5SX7olAg3_W6NQuZf3IK-H8p9rU9kqCOFKbyQJfLgBjPWSzXDuu1d_rcsaAoxkEALw_wcB",
          "https://zakupy.auchan.pl/?utm_source=google&utm_medium=cpc&utm_campaign=GRM+%7C+Auchan+Ecom+%7C+Pure+Brand+%7C+C%26C+%7C+RSA&utm_id=21885820469&gad_source=1&gclid=Cj0KCQiAi_G5BhDXARIsAN5SX7oNquECjyI9L7k3HlPNw1wDs2VNo_8bL8C9yNobLRl7AoU_BhiHviAaAmZQEALw_wcB",
        ],
        taskType: "common",
        deadline: "11/20/2024",
        priority: "high",
        assignedPerson: "Paweł",
      },
      {
        title: "Plan a Weekend Getaway",
        stageID: 3,
        description:
          "Research and plan a short trip to a nearby destination for relaxation.",
        attachments: [
          "https://www.lonelyplanet.com/",
          "https://www.tripadvisor.com/",
        ],
        taskType: "leisure",
        deadline: "11/25/2024",
        priority: "medium",
        assignedPerson: "Anna",
      },
      {
        title: "Team Presentation Preparation",
        stageID: 7,
        description:
          "Prepare slides and rehearse for the upcoming quarterly review meeting.",
        attachments: [
          "https://docs.google.com/presentation",
          "https://www.canva.com/",
        ],
        taskType: "work",
        deadline: "11/30/2024",
        priority: "critical",
        assignedPerson: "John",
      },
    ],
  },
  {
    title: "Cooking",
    ID: undefined,
    tasksList: [
      {
        title: "Prepare a meal",
        stageID: undefined,
        description: "Take cabbage, take some meat. Combine.",
        attachments: [
          "https://www.biedronka.pl/pl?gad_source=1&gclid=Cj0KCQiAi_G5BhDXARIsAN5SX7olAg3_W6NQuZf3IK-H8p9rU9kqCOFKbyQJfLgBjPWSzXDuu1d_rcsaAoxkEALw_wcB",
          "https://zakupy.auchan.pl/?utm_source=google&utm_medium=cpc&utm_campaign=GRM+%7C+Auchan+Ecom+%7C+Pure+Brand+%7C+C%26C+%7C+RSA&utm_id=21885820469&gad_source=1&gclid=Cj0KCQiAi_G5BhDXARIsAN5SX7oNquECjyI9L7k3HlPNw1wDs2VNo_8bL8C9yNobLRl7AoU_BhiHviAaAmZQEALw_wcB",
        ],
        taskType: "common",
        deadline: "11/20/2024",
        priority: "high",
        assignedPerson: "Paweł",
      },
      {
        title: "Fix the Leaky Faucet",
        stageID: 2,
        description:
          "Identify the cause of the leak and replace any necessary parts to stop the dripping.",
        attachments: ["https://www.homedepot.com/", "https://www.lowes.com/"],
        taskType: "maintenance",
        deadline: "11/22/2024",
        priority: "high",
        assignedPerson: "Mike",
      },
      {
        title: "Write a Blog Post on Sustainability",
        stageID: 5,
        description:
          "Draft and publish a blog post about the benefits of adopting sustainable practices in daily life.",
        attachments: ["https://www.greenpeace.org/", "https://www.nrdc.org/"],
        taskType: "creative",
        deadline: "12/01/2024",
        priority: "medium",
        assignedPerson: "Sophia",
      },
      {
        title: "Organize Office Holiday Party",
        stageID: undefined,
        description:
          "Coordinate decorations, catering, and activities for the office holiday celebration.",
        attachments: [
          "https://www.partycity.com/",
          "https://www.eventbrite.com/",
        ],
        taskType: "event",
        deadline: "12/15/2024",
        priority: "low",
        assignedPerson: "Emily",
      },
    ],
  },
  { title: "Done", ID: undefined, tasksList: [] },
];

export default stagesList;
