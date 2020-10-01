'use strict';

{
  const question = document.getElementById('question'); //ID取得
  const choices = document.getElementById('choices'); //ID取得
  const btn = document.getElementById('btn'); //ID取得
  const result = document.getElementById('result'); //ID取得
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = shuffle([ //問題の配列
    {q:'世界で一番大きな湖は？',c:['カスピ海','カリブ海','琵琶湖']},
    {q:'2の8乗は?',c:['256','64','1024']},
    {q:'次のうち、最初にリリースされた言語は？?',c:['Python','JavaScript','HTML']},
  ]);
  let currentNum = 0; //今何問目のクイズを説いているか
  let isAnswered;
  let score = 0;

  

  function shuffle(arr) {
    
    for(let i = arr.length -1; i > 0; i--){ //ランダムに選ぶ終点のインデックスi
      const j = Math.floor(Math.random() * (i + 1)); //配列のなかからランダムに要素を選ぶ0〜iばんめ
      [arr[j],arr[i]] = [arr[i],arr[j]];
    }
    return arr;
  }

  function checkAnswer(li){
    if(isAnswered){
      return;
    }
    isAnswered = true;

    if(li.textContent === quizSet[currentNum].c[0]){
      li.classList.add('correct')
      score++;
    }else{
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');

   
  }

  function setQuiz(){
    isAnswered = false;
    question.textContent = quizSet[currentNum].q;//問題を配列から表示

    while(choices.firstChild){
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li'); //liを作成
      li.textContent = choice; //liを表示
      li.addEventListener('click',() => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

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
      scoreLabel.textContent = `Score:${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    }else{
      currentNum++;
      setQuiz();
      
    }
  });








}