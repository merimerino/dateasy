db = db.getSiblingDB("taskdb");

db.createCollection("Rooms", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["room_name", "password", "users"],
            properties: {
                room_name: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                password: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                users: {
                    bsonType: "object",
                    additionalProperties: {
                        bsonType: "bool"
                    },
                    description: "must be an object with usernames as keys and boolean values to indicate presence in the room"
                }
            }
        }
    }
});


db.createCollection("MultipleChoice", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["room_name", "name", "multiple_answers", "text", "options"],
            properties: {
                room_name: {
                    bsonType: "string",
                    description: "must be an string and is required"
                },
                name: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                multiple_answers: {
                    bsonType: "bool",
                    description: "must be a boolean and is required"
                },
                text: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                options: {
                    bsonType: "array",
                    items: {
                        bsonType: "string"
                    },
                    description: "must be an array of strings and is required"
                }
            }
        }
    }
});

db.MultipleChoice.insertMany([
    {
        room_name: "testing",
        name: "Geography Quiz",
        multiple_answers: false,
        text: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"]
    },
    {
        room_name: "againtest",
        name: "Math Quiz",
        multiple_answers: false,
        text: "What is 2 + 2?",
        options: ["3", "4", "5", "6"]
    }
]);

db.createCollection("ShortTask", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["room_name", "name", "text", "max_characters_allowed"],
            properties: {
                room_name: {
                    bsonType: "string",
                    description: "must be an string and is required"
                },
                name: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                text: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                max_characters_allowed: {
                    bsonType: "int",
                    description: "must be an integer and is required"
                }
            }
        }
    }
});

db.ShortTask.insertMany([
    {
        room_name: "testing",
        name: "Short Task 1",
        text: "Write a short description of your favorite book.",
        max_characters_allowed: 250
    },
    {
        room_name: "something_else",
        name: "Short Task 2",
        text: "Describe your perfect day.",
        max_characters_allowed: 300
    }
]);

db.createCollection("Description", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["room_name", "description"],
            properties: {
                room_name: {
                    bsonType: "string",
                    description: "must be an string and is required"
                },
                description: {
                    bsonType: "string",
                    description: "must be a string and is required"
                }
            }
        }
    }
});

db.Description.insertMany([
    {
        room_name: "againtest",
        description: "Write a short description of your favorite book."
    },
    {
        room_name: "something_else_else",
        description: "Something to fill empty space"
    }
]);

db.createCollection("TableTask", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["room_name", "name", "columns", "rows", "show_graf", "allow_adding_of_rows", "new_row_name"],
            properties: {
                room_name: {
                    bsonType: "string",
                    description: "must be an string and is required"
                },
                name: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                columns: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                rows: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                show_graf: {
                    bsonType: "bool",
                    description: "must be a boolean and is required"
                },
                allow_adding_of_rows: {
                    bsonType: "bool",
                    description: "must be a boolean and is required"
                },
                new_row_name: {
                    bsonType: "string",
                    description: "must be a string and is required"
                }
            }
        }
    }
});

db.TableTask.insertMany([
    {
        room_name: "againtest",
        name: "MyName of this task",
        columns: "first,second,third",
        rows: "last,last1",
        show_graf: true,
        allow_adding_of_rows: true,
        new_row_name: "MarijaVoliMatiju"
    },
    {
        room_name: "vidisnestodrugo",
        name: "MyName of this task",
        columns: "first,second,third",
        rows: "last,last1",
        show_graf: false,
        allow_adding_of_rows: true,
        new_row_name: "MatijaVoliMariju"
    }
]);

db.createCollection("MapTask", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["room_name", "name", "text", "add_mark", "coord_x", "coord_y"],
            properties: {
                room_name: {
                    bsonType: "string",
                    description: "must be an string and is required"
                },
                name: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                text: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                add_mark: {
                    bsonType: "bool",
                    description: "must be a boolean and is required"
                },
                coord_x: {
                    bsonType: "double",
                    description: "must be a double and is required"
                },
                coord_y: {
                    bsonType: "double",
                    description: "must be a double and is required"
                }
            }
        }
    }
});

db.MapTask.insertMany([
    {
        room_name: "againtest",
        name: "Some Map test",
        text: "This is a test description",
        add_mark: false,
        coord_x: new Double("6.4000"),
        coord_y: new Double("6.4000")
    },
    {
        room_name: "idonthaveinspiration",
        name: "reallydont",
        text: "This is another test description",
        add_mark: true,
        coord_x: new Double("6.4000"),
        coord_y: new Double("6.4000")
    }
]);
db.createCollection("NumbersTask", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["room_name", "name", "text", "min_num", "max_num"],
            properties: {
                room_name: {
                    bsonType: "string",
                    description: "must be an string and is required"
                },
                name: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                text: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                min_num: {
                    bsonType: "int",
                    description: "must be an integer and is required"
                },
                max_num: {
                    bsonType: "int",
                    description: "must be an integer and is required"
                }
            }
        }
    }
});

db.NumbersTask.insertMany([
    {
        room_name: "againtest",
        name: "Big test",
        text: "something something",
        min_num: 1,
        max_num: 100
    },
    {
        room_name: "testing",
        name: "Big testtt",
        text: "something i need to write about something",
        min_num: 1,
        max_num: 1900
    }
]);