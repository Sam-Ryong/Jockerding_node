const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// flask가 이미지를 받을 수 있게 열어놓기
app.get('/image', async(req,res) => { 
  fs.readFile('uploads/captured-image.jpg', (err, data) =>{
    if (err) {
      res.status(500).send('error!');
      console.log("ok");
  } else {
      res.send(data);
  }
  });
})

// flask가 이미지 분석한 것을 언제 보낼지 모르니 듣고있다가 받으면 바로 작성하기
app.post('/image1', async(req,res) =>{
  fs.writeFile(`uploads/captured-image.txt`,req.body.msg_helmet, async (err) => {
    if (err) {
      console.error('Failed to save the image:', err);
      return res.status(500).send('Failed to save the image.');
    }

    else {
      res.send('Received msg_helmet from Python server: ' + req.body.msg_helmet);
    }
  })
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
