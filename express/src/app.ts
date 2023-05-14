import express, { Request, Response } from 'express';
import { Schema, model, connect } from 'mongoose';
import { config } from 'dotenv';
config();

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

const UserModel = model<IUser>('users', userSchema);

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

async function listUser(res: Response){
  await connect(`${process.env.DATABASE_URL}`)
  .then(() => {
    console.log(`Running on ENV = ${process.env.NODE_ENV}`);
    console.log('Connected to mongoDB.');
  })
  .catch((error) => {
    console.log('Unable to connect.');
    console.log(error);
  });
  const users = await UserModel.find({});
  res.send(users)
} 

app.get('/user', (req: Request, res: Response) => {
  listUser(res)
});

async function createUser(user: MentallyUser){
  const mongoUser = new UserModel(
    user
  )
  await connect(`${process.env.DATABASE_URL}`)
  .then(() => {
    console.log(`Running on ENV = ${process.env.NODE_ENV}`);
    console.log('Connected to mongoDB.');
  })
  .catch((error) => {
    console.log('Unable to connect.');
    console.log(error);
  });
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
    createUser(user).then((data) => res.send(data))
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

