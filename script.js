const subm = (ev) => {
  ev.preventDefault()
  formReq()
};

const formReq = () => {
  function error(mesage, field = '') {
    alert(mesage, field)
  }

  const form = document.forms.calc;
  const sex = parseInt(form.elements.sex.value, 10)
  const age = parseInt(form.elements.age.value, 10)
  const weight = parseInt(form.elements.weight.value, 10)
  const height = parseInt(form.elements.height.value, 10)
  const activity = form.elements.activity.value
  const formArr = [sex, age, weight, height, activity]

  if (!sex || !age || !weight || !height) {
    let fields = '';
    return error('Заполните все поля')
  }

  if (age < 12 || age > 80) {
    return error('Для верного расчёта необходимы значения возраста от 12 до 80 лет')
  }

  if (weight < 20 || weight > 200) {
    return error('Для верного расчёта необходимы значения веса от 20 до 200 кг')
  }

  if (height < 140 || height > 240) {
    return error('Для верного расчёта необходимы значения роста от 140 до 240 см')
  } else {
    return calculate(formArr);
  }

};

const buttonSubmit = document.querySelector('#calculate');

buttonSubmit.addEventListener('click', event => subm(event))

const calculate = (arr) => {
  const sex = arr[0];
  const age = arr[1];
  const weight = arr[2];
  const height = arr[3];
  const activity = arr[4];
  
  const man = (func) => {
    if (func === 'mif') {
      const manResult = (10 * weight + 6.25 * height - 5 * age + 5) * activity;
      return manResult;
    }
    if(func === 'dev') {
      const devine = 50 + (2.3 * (0.394 * height - 60));
	  return devine;
    }
    if(func === 'har') {
      const haris = (66 + (13.7 * weight) + (5 * height) - (6.76 * age)) * activity
      return haris;
    }

    if(func === 'calor') {
     
      switch(true) {
        case age >= 18 && age <= 30:
          return (0.0630 * weight + 2.8927) * 240;
        
        case age >= 31 && age <= 60:
          return (0.0484 * weight + 3.6534) * 240;
        
        case age > 60:
          return (0.0491 * weight + 2.4587) * 240;
        
        default:
          return 0;
        
      }
    }

  }

  const woman = (func) => {
    if (func === 'mif') {
      const womanResult = (10 * weight + 6.25 * height - 5 * age - 161) * activity;
      return womanResult;
    }
    if(func === 'dev') {
      const devine = 45.5 + (2.3 * (0.394 * height - 60))
      return devine;
    }
    if(func === 'har') {
      const haris = (655 + (9.6 * weight) + (1.8 * height) - (4.7 * age)) * activity
      return haris;
    }
       
    if(func === 'calor') {
      
      switch(true) {
        case age >= 18 && age <= 30: 
         return (0.0621 * weight + 2.0357) * 240;

         case age >= 31 && age <= 60: 
         return (0.0342 * weight + 3.5377) * 240;

         case age > 60: 
         return (0.0377 * weight + 2.7546) * 240;

         default: 
         return 'Не допустимый возраст';
          
      }
      return calor;
    }
  }

 
  // Имт
  const heightMet = height / 100;
  const bmi = +((weight / (heightMet ** 2)).toFixed(2));
  //let bmiText = '';
const bmiText = () => {
  switch (true) {
    case (bmi >= 0 && bmi < 16): 
      return 'Выраженный дефицит массы тела'
      break;
    
    case (bmi >= 16 && bmi < 18.5): 
      return 'Недостаточная (дефицит) масса тела'
      break;
    
    case (bmi >= 18.5 && bmi <= 24.99): 
      return 'Нормальная масса тела'
      break;
    
    case (bmi >= 25 && bmi < 30): 
      return 'Избыточная масса тела (предожирение)'
      break;
    
    case (bmi >= 30 && bmi < 35): 
      return 'Ожирение'
      break;
    
    case (bmi >= 35 && bmi <= 40): 
      return 'Ожирение резкое'
      break;
    
    case (bmi > 40): 
      return 'Ожирение очень резкое'
      break;
    
    default: 
      return 'Ошибка расчёта, проверьте введённые данные'
      break;
    
  }
}
   // Мифф
   const miff = (sex === 1 ? man('mif') : woman('mif')).toFixed(2);
 

   // Devine

   const devine = sex === 1 ? man('dev') : woman('dev');

   // Haris 
 
   const harris = (sex === 1 ? man('har') : woman('har')).toFixed(2);
 
   // Сalories
 
   const who = (sex === 1 ? man('calor') : woman('calor')).toFixed(2);
   
   // Water
   
   const water = (sex === 1 ? weight * 0.04 : weight * 0.03).toFixed(2); 
  
  const addToTable = () => {
    const container = document.querySelector('.result_container');

    const bmiTable = document.querySelector('.bmi_text');
    bmiTable.innerText = `${bmi} ${bmiText()}`;
    
    const mif = container.querySelector('.result_mif');
    mif.innerText = miff;

    const devin = container.querySelector('.result_devin');
    devin.innerText = devine.toFixed(2);

    const haris = container.querySelector('.result_harris');
    haris.innerText = harris;

    const calorWho = container.querySelector('.result_who');
    calorWho.innerText = who;

    const waterReq = container.querySelector('.water');
    waterReq.innerText = water;

    const mifLos = container.querySelector('.result_mif--losing');
    mifLos.innerText = (miff * 0.8).toFixed(2);

    const harisLos = container.querySelector('.result_harris--losing');
    harisLos.innerText = (harris * 0.8).toFixed(2);

    const calorWhoLos = container.querySelector('.result_who--losing');
    calorWhoLos.innerText = (Number(who) * 0.8).toFixed(2);

  }

  addToTable();
}