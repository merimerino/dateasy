package types


type MultipleChoice struct {
    RoomName        string   `json:"room_name" bson:"room_name"`
    Name            string   `json:"name"`
    MultipleAnswers bool     `json:"multiple_answers"`
    Text            string   `json:"text"`
    Options         []string `json:"options"`
}
type ShortTask struct {
    RoomName                string `json:"room_name" bson:"room_name"`
    Name                    string `json:"name" bson:"name"`
    Text                    string `json:"text" bson:"text"`
    MaxCharactersAllowed     int    `json:"max_characters_allowed" bson:"max_characters_allowed"`
}
type Description struct {
    RoomName    string `json:"room_name" bson:"room_name"`
    Description string `json:"description" bson:"description"`
}
type TableTask struct {
    RoomName                 string `json:"room_name" bson:"room_name"`
    Name                     string `json:"name" bson:"name"`
    Columns                  string `json:"columns" bson:"columns"`
    Rows                     string `json:"rows" bson:"rows"`
    ShowGraf                 bool   `json:"show_graf" bson:"show_graf"`
    AllowAddingOfRows       bool   `json:"allow_adding_of_rows" bson:"allow_adding_of_rows"`
    NewRowName              string `json:"new_row_name" bson:"new_row_name"`
}
type MapTask struct {
    RoomName   string  `json:"room_name" bson:"room_name"`
    Name       string  `json:"name" bson:"name"`
    Text       string  `json:"text" bson:"text"`
    AddMark    bool    `json:"add_mark" bson:"add_mark"`
    CoordX     float64 `json:"coord_x" bson:"coord_x"`
    CoordY     float64 `json:"coord_y" bson:"coord_y"`
}
type NumbersTask struct {
    RoomName       string `json:"room_name" bson:"room_name"`
    Name           string `json:"name" bson:"name"`
    Text           string `json:"text" bson:"text"`
    MinNum         int    `json:"min_num" bson:"min_num"`
    MaxNum         int    `json:"max_num" bson:"max_num"`
}