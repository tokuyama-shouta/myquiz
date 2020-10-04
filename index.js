'use strict';
//10の質問
//質問を選ぶと次の質問へ
//yesの数で採点



{
  const question = document.getElementById('question'); //ID取得
  const choices = document.getElementById('choices'); //ID取得
  const btn = document.getElementById('btn'); //ID取得
  const result = document.getElementById('result'); //ID取得
  const scoreLabel = document.querySelector('#result > p');
  

  const quizSet = shuffle([ //問題の配列
    {q:'休みの日は何してるの？と聞かれた',c:['Yes','No']},
    {q:'好きな食べ物、苦手な食べ物を聞かれた',c:['Yes','No']},
    {q:'今度の休みの予定を聞かれた',c:['Yes','No']},
    {q:'クリスマスの予定を聞かれた?',c:['Yes','No']},
    {q:'小さい時はどんな子供だったの？と聞かれた?',c:['Yes','No']},
    {q:'どんなタイプの女性が好きなの？と聞かれた?',c:['Yes','No']},
    {q:'趣味に関する細かい質問をされた',c:['Yes','No']},
    {q:'出身地や生い立ちに関する質問をされた?',c:['Yes','No']},
    {q:'親や兄弟など家族に関する質問をされた?',c:['Yes','No']},
    {q:'血液型は何？と聞かれた',c:['Yes','No']},
    
  ]);
  let currentNum = 0; //今何問目のクイズを説いているか
  let isAnswered;
  let score = 0;

  

  function shuffle(arr) {
    //ランダムに選ぶ終点のインデックスi
    for(let i = arr.length -1; i > 0; i--){ 
      //配列のなかからランダムに要素を選ぶ0〜iばんめ
      const j = Math.floor(Math.random() * (i + 1)); 
      [arr[j],arr[i]] = [arr[i],arr[j]];
    }
    return arr;
  }

  function checkAnswer(li){
    if(isAnswered){
      return;
    }
    isAnswered = true;

    //もし選ばれたコンテントが答えの配列の一番始めなら
    if(li.textContent === quizSet[currentNum].c[0]){
      //選択した時に色をつけるcorrectクラスをつける
      li.classList.add('correct')
      //YESの数だけスコアを足す
      score++;
    }else{
      //選択した時に色をつけるcorrectクラスをつける
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');

   
  }

  function setQuiz(){
    isAnswered = false;
    //問題を配列から表示
    question.textContent = quizSet[currentNum].q;

    while(choices.firstChild){
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = [...quizSet[currentNum].c];
    
    shuffledChoices.forEach(choice => {
      //liを作成
      const li = document.createElement('li'); 
      //liを表示
      li.textContent = choice; 
      li.addEventListener('click',() => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    //問題が終わるとスコア表示
    if(currentNum === quizSet.length -1){
      btn.textContent = 'Show Score';
    }
  }

  setQuiz();

  btn.addEventListener('click',() => {
    if(btn.classList.contains('disabled')){
      return;
    }
    btn.classList.add('disabled');

    if(currentNum === quizSet.length -1){
      // console.log(`Score:${score} / ${quizSet.length}`);
      if(score >= 7){
        scoreLabel.textContent = `脈ありです！告白しよう！Score:${score} / ${quizSet.length}`
      }else if(score >= 4 && score < 7){
        scoreLabel.textContent = `後少し頑張ってみて！Score:${score} / ${quizSet.length}`
      }else{
        scoreLabel.textContent = `脈なしです！次の恋へ！Score:${score} / ${quizSet.length}`
      }
      result.classList.remove('hidden');
    }else{
      currentNum++;
      setQuiz();
      
    }
  });

  let startBtn = document.getElementById('startBtn');
  let box = document.getElementById('box');

  startBtn.addEventListener('click', function(){
    box.classList.add('fadeout');
    setTimeout(function(){ 
      box.style.display = "none"; 
    }, 1000);
  }, false);
  








}