db = db.getSiblingDB("taskdb");

db.createCollection("Rooms", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["room_name", "password", "users"],
      properties: {
        room_name: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        password: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        users: {
          bsonType: "object",
          additionalProperties: {
            bsonType: "bool",
          },
          description:
            "must be an object with usernames as keys and boolean values to indicate presence in the room",
        },
      },
    },
  },
});

db.createCollection("MultipleChoice", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "room_name",
        "name",
        "order_number",
        "task_type",
        "multiple_answers",
        "text",
        "options",
        "answers",
      ],
      properties: {
        room_name: {
          bsonType: "string",
          description: "must be an string and is required",
        },
        name: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        order_number: {
          bsonType: "int",
          description: "must be a int and is required",
        },
        task_type: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        multiple_answers: {
          bsonType: "bool",
          description: "must be a boolean and is required",
        },
        text: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        options: {
          bsonType: "array",
          items: {
            bsonType: "string",
          },
          description: "must be an array of strings and is required",
        },
        answers: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              username: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              answer: {
                bsonType: "string",
                description: "must be a string and is required",
              },
            },
          },
          description: "must be an array of answer objects",
        },
      },
    },
  },
});

db.MultipleChoice.insertMany([
  {
    room_name: "testing",
    name: "Geography Quiz",
    task_type: "multichoice",
    order_number: 1,
    multiple_answers: false,
    text: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answers: [], // Initialize with empty answers array
  },
  {
    room_name: "againtest",
    name: "Math Quiz",
    task_type: "multichoice",
    order_number: 1,
    multiple_answers: false,
    text: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answers: [], // Initialize with empty answers array
  },
]);

db.createCollection("ShortTask", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "room_name",
        "name",
        "order_number",
        "task_type",
        "text",
        "max_characters_allowed",
        "answers",
      ],
      properties: {
        room_name: {
          bsonType: "string",
          description: "must be an string and is required",
        },
        name: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        order_number: {
          bsonType: "int",
          description: "must be a int and is required",
        },
        task_type: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        text: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        max_characters_allowed: {
          bsonType: "int",
          description: "must be an integer and is required",
        },
        answers: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              username: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              answer: {
                bsonType: "string",
                description: "must be a string and is required",
              },
            },
          },
          description: "must be an array of answer objects",
        },
      },
    },
  },
});

db.ShortTask.insertMany([
  {
    room_name: "testing",
    name: "Short Task 1",
    task_type: "short_task",
    order_number: 2,
    text: "Write a short description of your favorite book.",
    max_characters_allowed: 250,
    answers: [], // Initialize with empty answers array
  },
  {
    room_name: "something_else",
    name: "Short Task 2",
    task_type: "short_task",
    order_number: 1,
    text: "Describe your perfect day.",
    max_characters_allowed: 300,
    answers: [], // Initialize with empty answers array
  },
]);

db.createCollection("Description", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["room_name", "text", "task_type", "order_number"],
      properties: {
        room_name: {
          bsonType: "string",
          description: "must be an string and is required",
        },
        text: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        task_type: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        order_number: {
          bsonType: "int",
          description: "must be a int and is required",
        },
      },
    },
  },
});

db.Description.insertMany([
  {
    room_name: "againtest",
    order_number: 2,
    task_type: "description",
    text: "Write a short description of your favorite book.",
  },
  {
    room_name: "something_else_else",
    order_number: 3,
    task_type: "description",
    text: "Something to fill empty space",
  },
]);

db.createCollection("TableTask", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "room_name",
        "name",
        "order_number",
        "text",
        "task_type",
        "columns",
        "rows",
        "show_graf",
        "allow_adding_of_rows",
        "new_row_name",
        "answers",
      ],
      properties: {
        room_name: {
          bsonType: "string",
          description: "must be an string and is required",
        },
        name: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        order_number: {
          bsonType: "int",
          description: "must be a int and is required",
        },
        text: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        task_type: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        columns: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        rows: {
          bsonType: "int",
          description: "must be a string and is required",
        },
        show_graf: {
          bsonType: "bool",
          description: "must be a boolean and is required",
        },
        allow_adding_of_rows: {
          bsonType: "bool",
          description: "must be a boolean and is required",
        },
        new_row_name: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        answers: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              username: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              answer: {
                bsonType: "string",
                description: "must be a string and is required",
              },
            },
          },
          description: "must be an array of answer objects",
        },
      },
    },
  },
});

db.TableTask.insertMany([
  {
    room_name: "testing",
    name: "MyName of this task",
    task_type: "table_task",
    text: "Ovo je test",
    order_number: 3,
    columns: "first,second,third",
    rows: 2,
    show_graf: true,
    allow_adding_of_rows: true,
    new_row_name: "MarijaVoliMatiju",
    answers: [], // Initialize with empty answers array
  },
  {
    room_name: "vidisnestodrugo",
    name: "MyName of this task",
    text: "Ovo je test",
    task_type: "table_task",
    order_number: 1,
    columns: "first,second,third",
    rows: 1,
    show_graf: false,
    allow_adding_of_rows: true,
    new_row_name: "MatijaVoliMariju",
    answers: [], // Initialize with empty answers array
  },
]);

db.createCollection("MapTask", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "room_name",
        "name",
        "order_number",
        "task_type",
        "text",
        "add_mark",
        "coord_x",
        "coord_y",
        "answers",
      ],
      properties: {
        room_name: {
          bsonType: "string",
          description: "must be an string and is required",
        },
        name: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        order_number: {
          bsonType: "int",
          description: "must be a int and is required",
        },
        task_type: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        text: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        add_mark: {
          bsonType: "bool",
          description: "must be a boolean and is required",
        },
        coord_x: {
          bsonType: "double",
          description: "must be a double and is required",
        },
        coord_y: {
          bsonType: "double",
          description: "must be a double and is required",
        },
        answers: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              username: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              answer: {
                bsonType: "string",
                description: "must be a string and is required",
              },
            },
          },
          description: "must be an array of answer objects",
        },
      },
    },
  },
});

db.MapTask.insertMany([
  {
    room_name: "againtest",
    name: "Some Map test",
    task_type: "map_task",
    order_number: 4,
    text: "This is a test description",
    add_mark: false,
    coord_x: new Double("6.4000"),
    coord_y: new Double("6.4000"),
    answers: [], // Initialize with empty answers array
  },
  {
    room_name: "idonthaveinspiration",
    name: "reallydont",
    task_type: "map_task",
    order_number: 1,
    text: "This is another test description",
    add_mark: true,
    coord_x: new Double("6.4000"),
    coord_y: new Double("6.4000"),
    answers: [], // Initialize with empty answers array
  },
]);
db.createCollection("NumbersTask", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "room_name",
        "name",
        "order_number",
        "task_type",
        "text",
        "min_num",
        "max_num",
        "answers",
      ],
      properties: {
        room_name: {
          bsonType: "string",
          description: "must be an string and is required",
        },
        name: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        order_number: {
          bsonType: "int",
          description: "must be a int and is required",
        },
        task_type: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        text: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        min_num: {
          bsonType: "int",
          description: "must be an integer and is required",
        },
        max_num: {
          bsonType: "int",
          description: "must be an integer and is required",
        },
        answers: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              username: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              answer: {
                bsonType: "string",
                description: "must be a string and is required",
              },
            },
          },
          description: "must be an array of answer objects",
        },
      },
    },
  },
});

db.NumbersTask.insertMany([
  {
    room_name: "againtest",
    name: "Big test",
    task_type: "numbers_task",
    order_number: 5,
    text: "something something",
    min_num: 1,
    max_num: 100,
    answers: [], // Initialize with empty answers array
  },
  {
    room_name: "testing",
    name: "Big testtt",
    task_type: "numbers_task",
    order_number: 4,
    text: "something i need to write about something",
    min_num: 1,
    max_num: 1900,
    answers: [], // Initialize with empty answers array
  },
]);
