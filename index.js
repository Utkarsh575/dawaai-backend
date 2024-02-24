import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(express.json());

console.log(uuidv4());

// struct Medicine : Decodable , Identifiable {
//     var id : Int
//     var name : String
//     var type : String
//     var strength : String
//     var strengthUnit : String
//     var Image : String
//     var taken : Int
//     var toBeTake : Int
//     var nextDoseTime : Date
//     var dosageType : String
//     var dosage : Int
//     var quantity : Int
//     var expiryDate : Date
//     var startDate : Date
//     var remindForReorder : Bool
//     var breakfast : Bool
//     var lunch : Bool
//     var dinner : Bool
// }

let totalMedicines = [
  {
    id: 0,
    name: "Dolo650",
    type: "capsule",
    strength: "1000",
    strengthUnit: "mg",
    Image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dcat&psig=AOvVaw3K2qoNaG5jY1P8X1CMbnda&ust=1708767277510000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCJC986WUwYQDFQAAAAAdAAAAABAE",
    taken: 0,
    toBeTaken: 3,
    nextDoseTime: Date(),
    dosageType: "Before Meal",
    dosage: 3,
    quantity: 20,
    expiryDate: Date(),
    startDate: Date(),
    remindForReorder: true,
    breakfast: true,
    lunch: true,
    dinner: true,
    notifyTimes: [Date(), Date(), Date()],
  },
];

let users = [
  {
    id: "a28f7aab-e416-437d-8db5-98c2a54202ba",
    username: "admin",
    password: "admin",
    medicines: [],
    familyCode: "a28f7aab",
  },
];

app.get("/", (req, res) => {
  res.send("Chal rha hu bhaiya ji 🫡");
});

app.get("/getAllMedicines", (req, res) => {
  res.send(totalMedicines).status(200);
});

app.post("/register", (req, res) => {
  users.push({
    id: uuidv4(),
    username: req.body.username,
    password: req.body.password,
    medicines: [],
    familyCode: "",
  });
});

app.post("/login", (req, res) => {});
app.listen(3000, () => {
  console.log(`Server listening on port ${3000}`);
});
