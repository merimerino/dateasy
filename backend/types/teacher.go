package types

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type EditMultipleChoice struct {
	ID              primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name            string             `json:"name" bson:"name"`
	MultipleAnswers bool               `json:"multiple_answers" bson:"multiple_answers"`
	Text            string             `json:"text" bson:"text"`
	Options         []string           `json:"options" bson:"options"`
	OrderNumber     int                `json:"order_number" bson:"order_number"`
}
type EditShortTask struct {
	ID                   primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name                 string             `json:"name" bson:"name"`
	OrderNumber          int                `json:"order_number" bson:"order_number"`
	Text                 string             `json:"text" bson:"text"`
	MaxCharactersAllowed int                `json:"max_characters_allowed" bson:"max_characters_allowed"`
}

type EditDescription struct {
	ID          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Text string             `json:"text" bson:"text"`
	OrderNumber int                `json:"order_number" bson:"order_number"`
}

type EditTableTask struct {
	ID                primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name              string             `json:"name" bson:"name"`
	Text string             `json:"text" bson:"text"`
	OrderNumber       int                `json:"order_number" bson:"order_number"`
	Columns           string             `json:"columns" bson:"columns"`
	Rows              int             `json:"rows" bson:"rows"`
	ShowGraf          bool               `json:"show_graf" bson:"show_graf"`
	AllowAddingOfRows bool               `json:"allow_adding_of_rows" bson:"allow_adding_of_rows"`
	NewRowName        string             `json:"new_row_name" bson:"new_row_name"`
}

type EditMapTask struct {
	ID          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name        string             `json:"name" bson:"name"`
	OrderNumber int                `json:"order_number" bson:"order_number"`
	Text        string             `json:"text" bson:"text"`
	AddMark     bool               `json:"add_mark" bson:"add_mark"`
	CoordX      float64            `json:"coord_x" bson:"coord_x"`
	CoordY      float64            `json:"coord_y" bson:"coord_y"`
}

type EditNumbersTask struct {
	ID          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name        string             `json:"name" bson:"name"`
	OrderNumber int                `json:"order_number" bson:"order_number"`
	Text        string             `json:"text" bson:"text"`
	MinNum      int                `json:"min_num" bson:"min_num"`
	MaxNum      int                `json:"max_num" bson:"max_num"`
}

type Delete struct {
	ID primitive.ObjectID `json:"id" bson:"_id,omitempty"`
}

type Answer struct {
	Username string `json:"username" bson:"username"`
	Answer   string `json:"answer" bson:"answer"`
}

type GiveAnswer struct {
	ID     primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Answer string             `json:"answer" bson:"answer"`
}

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
	Text string `json:"text" bson:"text"`
}

type AddTableTask struct {
	Name              string `json:"name" bson:"name"`
	Columns           string `json:"columns" bson:"columns"`
	Text string             `json:"text" bson:"text"`
	Rows              int `json:"rows" bson:"rows"`
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
	ID              primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	RoomName        string             `json:"room_name" bson:"room_name"`
	Name            string             `json:"name" bson:"name"`
	TaskType        string             `json:"task_type" bson:"task_type"`
	OrderNumber     int                `json:"order_number" bson:"order_number"`
	MultipleAnswers bool               `json:"multiple_answers" bson:"multiple_answers"`
	Text            string             `json:"text" bson:"text"`
	Options         []string           `json:"options" bson:"options"`
	Answers         []Answer           `json:"answers" bson:"answers"`
}

type ShortTask struct {
	ID                   primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	RoomName             string             `json:"room_name" bson:"room_name"`
	Name                 string             `json:"name" bson:"name"`
	TaskType             string             `json:"task_type" bson:"task_type"`
	OrderNumber          int                `json:"order_number" bson:"order_number"`
	Text                 string             `json:"text" bson:"text"`
	MaxCharactersAllowed int                `json:"max_characters_allowed" bson:"max_characters_allowed"`
	Answers              []Answer           `json:"answers" bson:"answers"`
}

type Description struct {
	ID          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	RoomName    string             `json:"room_name" bson:"room_name"`
	Text string             `json:"text" bson:"text"`
	TaskType    string             `json:"task_type" bson:"task_type"`
	OrderNumber int                `json:"order_number" bson:"order_number"`
	Answers     []Answer           `json:"answers" bson:"answers"`
}

type TableTask struct {
	ID                primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	RoomName          string             `json:"room_name" bson:"room_name"`
	Name              string             `json:"name" bson:"name"`
	Text string             `json:"text" bson:"text"`
	TaskType          string             `json:"task_type" bson:"task_type"`
	OrderNumber       int                `json:"order_number" bson:"order_number"`
	Columns           string             `json:"columns" bson:"columns"`
	Rows              int             `json:"rows" bson:"rows"`
	ShowGraf          bool               `json:"show_graf" bson:"show_graf"`
	AllowAddingOfRows bool               `json:"allow_adding_of_rows" bson:"allow_adding_of_rows"`
	NewRowName        string             `json:"new_row_name" bson:"new_row_name"`
	Answers           []Answer           `json:"answers" bson:"answers"`
}

type MapTask struct {
	ID          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	RoomName    string             `json:"room_name" bson:"room_name"`
	Name        string             `json:"name" bson:"name"`
	TaskType    string             `json:"task_type" bson:"task_type"`
	OrderNumber int                `json:"order_number" bson:"order_number"`
	Text        string             `json:"text" bson:"text"`
	AddMark     bool               `json:"add_mark" bson:"add_mark"`
	CoordX      float64            `json:"coord_x" bson:"coord_x"`
	CoordY      float64            `json:"coord_y" bson:"coord_y"`
	Answers     []Answer           `json:"answers" bson:"answers"`
}

type NumbersTask struct {
	ID          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	RoomName    string             `json:"room_name" bson:"room_name"`
	Name        string             `json:"name" bson:"name"`
	TaskType    string             `json:"task_type" bson:"task_type"`
	OrderNumber int                `json:"order_number" bson:"order_number"`
	Text        string             `json:"text" bson:"text"`
	MinNum      int                `json:"min_num" bson:"min_num"`
	MaxNum      int                `json:"max_num" bson:"max_num"`
	Answers     []Answer           `json:"answers" bson:"answers"`
}

// Define an interface for retrieving the OrderNumber field
type Task interface {
	OrderNumberField() int
	GetID() primitive.ObjectID
}

// Implement OrderNumberField for each task type
func (t MultipleChoice) OrderNumberField() int { return t.OrderNumber }
func (t ShortTask) OrderNumberField() int      { return t.OrderNumber }
func (t Description) OrderNumberField() int    { return t.OrderNumber }
func (t TableTask) OrderNumberField() int      { return t.OrderNumber }
func (t MapTask) OrderNumberField() int        { return t.OrderNumber }
func (t NumbersTask) OrderNumberField() int    { return t.OrderNumber }

func (m *MultipleChoice) GetID() primitive.ObjectID {
	return m.ID
}
func (m *ShortTask) GetID() primitive.ObjectID {
	return m.ID
}
func (m *Description) GetID() primitive.ObjectID {
	return m.ID
}
func (m *TableTask) GetID() primitive.ObjectID {
	return m.ID
}
func (m *MapTask) GetID() primitive.ObjectID {
	return m.ID
}
func (m *NumbersTask) GetID() primitive.ObjectID {
	return m.ID
}
