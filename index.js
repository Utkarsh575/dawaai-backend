import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(express.json());

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
    // name: "admin",
    phone: "+916200402119",
    bloodGroup: "B+",
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
    phone: req.body.phone,
    bloodGroup: req.body.bloodGroup,
  });

  res
    .send({ message: "user added successfully", status: 201, user: users })
    .status(201);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(users);
  let user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    res.send({ message: "user not found", status: 400 }).status(400);
  } else {
    res
      .send({
        message: "user data retrieved successfully",
        status: 200,
        user: user,
      })
      .status(200);
  }
});

app.post("/addMedicine", (req, res) => {
  const {
    name,
    type,
    strength,
    strengthUnit,
    Image,
    taken,
    toBeTaken,
    nextDoseTime,
    dosageType,
    dosage,
    quantity,
    expiryDate,
    startDate,
    remindForReorder,
    breakfast,
    lunch,
    dinner,
    notifyTimes,
  } = req.body.medicine;

  const { id } = req.body.userId;

  let idx = users.findIndex((user) => user.id == id);
  let currlength = users[idx][medicines].length;
  let med = {
    id: currlength + 1,
    ...req.body.medicine,
  };
  users[idx][medicines].push(med);

  console.log(users[idx]);

  res
    .send({ message: "Medicine added successfully ", status: 201 })
    .status(201);
});
app.post("/getMedicineByUserId", (req, res) => {
  const { userId } = req.body;

  let idx = users.findIndex((user) => user.id === userId);
  let userMedicines = users[idx][medicines];

  res
    .send({
      message: "fetched medicines of the user",
      status: 200,
      medicines: userMedicines,
    })
    .status(200);
});

app.post("/createFamilyCode", (req, res) => {
  const { userId } = req.body.userId;
  let idx = users.findIndex((user) => user.id === userId);
  users[idx][familyCode] = uuidv4().split("-")[0];

  res
    .send({
      message: "family group create successfully",
      status: 201,
      user: user[idx],
      familyCode: user[idx][familyCode],
    })
    .status(201);
});

app.post("/joinFamily", (req, res) => {
  const { userId, familyCode } = req.body;
  let idx = users.findIndex((user) => user.id === userId);
  users[idx][familyCode] = familyCode;

  let familyGroup = [];
  users.forEach((user, idx) => {
    user.familyCode === familyCode ? familyGroup.push(users[idx]) : "";
  });
  res
    .send({
      message: "you have been added to family",
      status: 200,
      familyGroup: familyGroup,
    })
    .status(200);
});
app.listen(3000, () => {
  console.log(`Server listening on port ${3000}`);
});
