package types

type AddMultipleChoice struct {
	Name            string   `json:"name" bson:"name"`
	MultipleAnswers bool     `json:"multiple_answers" bson:"multiple_answers"`
	Text            string   `json:"text" bson:"text"`
	Options         []string `json:"options" bson:"options"`
}
type AddShortTask struct {
	Name                 string `json:"name" bson:"name"`
	Text                 string `json:"text" bson:"text"`
	MaxCharactersAllowed int    `json:"max_characters_allowed" bson:"max_characters_allowed"`
}

type AddDescription struct {
	Description string `json:"description" bson:"description"`
}

type AddTableTask struct {
	Name              string `json:"name" bson:"name"`
	Columns           string `json:"columns" bson:"columns"`
	Rows              string `json:"rows" bson:"rows"`
	ShowGraf          bool   `json:"show_graf" bson:"show_graf"`
	AllowAddingOfRows bool   `json:"allow_adding_of_rows" bson:"allow_adding_of_rows"`
	NewRowName        string `json:"new_row_name" bson:"new_row_name"`
}

type AddMapTask struct {
	Name    string  `json:"name" bson:"name"`
	Text    string  `json:"text" bson:"text"`
	AddMark bool    `json:"add_mark" bson:"add_mark"`
	CoordX  float64 `json:"coord_x" bson:"coord_x"`
	CoordY  float64 `json:"coord_y" bson:"coord_y"`
}

type AddNumbersTask struct {
	Name   string `json:"name" bson:"name"`
	Text   string `json:"text" bson:"text"`
	MinNum int    `json:"min_num" bson:"min_num"`
	MaxNum int    `json:"max_num" bson:"max_num"`
}

type MultipleChoice struct {
	RoomName        string   `json:"room_name" bson:"room_name"`
	Name            string   `json:"name" bson:"name"`
	TaskType        string   `json:"task_type" bson:"task_type"`
	OrderNumber     int      `json:"order_number" bson:"order_number"`
	MultipleAnswers bool     `json:"multiple_answers" bson:"multiple_answers"`
	Text            string   `json:"text" bson:"text"`
	Options         []string `json:"options" bson:"options"`
}

type ShortTask struct {
	RoomName             string `json:"room_name" bson:"room_name"`
	Name                 string `json:"name" bson:"name"`
	TaskType             string `json:"task_type" bson:"task_type"`
	OrderNumber          int    `json:"order_number" bson:"order_number"`
	Text                 string `json:"text" bson:"text"`
	MaxCharactersAllowed int    `json:"max_characters_allowed" bson:"max_characters_allowed"`
}

type Description struct {
	RoomName    string `json:"room_name" bson:"room_name"`
	Description string `json:"description" bson:"description"`
	TaskType    string `json:"task_type" bson:"task_type"`
	OrderNumber int    `json:"order_number" bson:"order_number"`
}

type TableTask struct {
	RoomName          string `json:"room_name" bson:"room_name"`
	Name              string `json:"name" bson:"name"`
	TaskType          string `json:"task_type" bson:"task_type"`
	OrderNumber       int    `json:"order_number" bson:"order_number"`
	Columns           string `json:"columns" bson:"columns"`
	Rows              string `json:"rows" bson:"rows"`
	ShowGraf          bool   `json:"show_graf" bson:"show_graf"`
	AllowAddingOfRows bool   `json:"allow_adding_of_rows" bson:"allow_adding_of_rows"`
	NewRowName        string `json:"new_row_name" bson:"new_row_name"`
}

type MapTask struct {
	RoomName    string  `json:"room_name" bson:"room_name"`
	Name        string  `json:"name" bson:"name"`
	TaskType    string  `json:"task_type" bson:"task_type"`
	OrderNumber int     `json:"order_number" bson:"order_number"`
	Text        string  `json:"text" bson:"text"`
	AddMark     bool    `json:"add_mark" bson:"add_mark"`
	CoordX      float64 `json:"coord_x" bson:"coord_x"`
	CoordY      float64 `json:"coord_y" bson:"coord_y"`
}

type NumbersTask struct {
	RoomName    string `json:"room_name" bson:"room_name"`
	Name        string `json:"name" bson:"name"`
	TaskType    string `json:"task_type" bson:"task_type"`
	OrderNumber int    `json:"order_number" bson:"order_number"`
	Text        string `json:"text" bson:"text"`
	MinNum      int    `json:"min_num" bson:"min_num"`
	MaxNum      int    `json:"max_num" bson:"max_num"`
}

// Define an interface for retrieving the OrderNumber field
type Task interface {
	OrderNumberField() int
}

// Implement OrderNumberField for each task type
func (t MultipleChoice) OrderNumberField() int { return t.OrderNumber }
func (t ShortTask) OrderNumberField() int      { return t.OrderNumber }
func (t Description) OrderNumberField() int    { return t.OrderNumber }
func (t TableTask) OrderNumberField() int      { return t.OrderNumber }
func (t MapTask) OrderNumberField() int        { return t.OrderNumber }
func (t NumbersTask) OrderNumberField() int    { return t.OrderNumber }
