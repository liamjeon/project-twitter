import express from "express";
import "express-async-errors";

const router = express.Router();

const tweets = [
  {
    id: "1",
    test: "첫번째 트윗!",
    createdAt: Date.now().toString(),
    name: "bob",
    username: "bob",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
  { 
    id: "2",
    test: "두번째 트윗!",
    createdAt: Date.now().toString(),
    name: "liam",
    username: "liam",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
];
//GET /tweets
//GET /tweets?username=:username
router.get("/", (req, res, next) => {
  const username = req.query.username;
  const data = username
    ? tweets.filter((tweet) => tweet.username === username)
    : tweets;
    res.status(200).json(data);
});

//GET /tweets/:id
router.get('/:id', (req,res,next)=>{
    const id = req.params.id;
    const tweet = tweets.find((t)=>t.id === id);
    if(tweet){
        res.status(200).json(tweet);
    }else{
        res.status(400).json({message: `Tweet id(${id}) not found`});
    }
})

//POST /tweets
router.post('/', (req, res, next)=>{
    
})

//PUT /teets/:id
//DELETE /teets/:id


export default router;
