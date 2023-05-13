import express, { Request, Response } from 'express';
import { Schema, model, connect } from 'mongoose';


const app = express();
const port = 3000;

app.use(express.json());

interface IUser extends Document {
  userId: number;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  userId: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = model<IUser>('User', userSchema);


type MentallyUser = {
  userId: number
  email: string
  password: string
}

type Message = {
  userId: number
  text: string
  type: string
}


const users: MentallyUser[] = [
  {
    userId: 1,
    email: "daniel@paul.com",
    password: "password"
  },
  {
    userId: 2,
    email: "chiara@zeus.com",
    password: "password"
  }
]

const messages: Message[] = [

]

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express!');
});

app.get('/user', (req: Request, res: Response) => {
  res.send(users);
});

async function createUser(user: MentallyUser){
  const mongoUser = new UserModel(
    user
  )
  await connect('mongodb+srv://paul:iLoveTaco@test.sami5qp.mongodb.net/')
  await mongoUser.save();
}

app.post('/user', (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user: MentallyUser = {
      userId: 5, //TODO: make incremental
      email: email,
      password: password
    }

    users.push(user)
    createUser(user).then(() => res.send(email))
    .catch(err => res.send(err))
  });

  app.post('/authenticate', (req: Request, res: Response) => {
    const { email, password } = req.body;

    users.map((user) => {
      if(user.email == email && user.password == password) {
        res.send("jwtToken")
      }
    })

    res.send("wrong user or password");
  });

  app.get('/message', (req: Request, res: Response) => {
    res.send(messages);
  });

  function saveMessage(message: Message){
    messages.push(message)
  }

  app.post('/message', (req: Request, res: Response) => {
    const { userId, text} = req.body;

    const type = "user";

    saveMessage({
      userId: userId,
      text: text,
      type: type
    })

    if (type == "user") {
      invokeAssistant(text)
    }
    

    res.send("message send");
  });

  function invokeAssistant(text: string) {
    let type = "bot"
    if(text == "schedule me an appointment") {
      type = "scheduling"
    }

    saveMessage({
      userId: 0,
      text: "this is a bot response",
      type
    })
  }

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

