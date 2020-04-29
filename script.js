const subm = (ev) => {
  ev.preventDefault()
  formReq()
};

const formReq = () => {
  function error(mesage, field = '') {
    console.log(mesage, field) // Сделать модалку?
    alert(mesage, field)
  }

  const form = document.forms.calc;
  const sex = form.elements.sex.value
  const age = form.elements.age.value
  const weight = form.elements.weight.value
  const height = form.elements.height.value
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
    return error('Для верного расчёта необходимы значения роста от 140 до 240 кг')
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
      const manResult = ((10 * weight) + (6.25 * height) - (5 * age + 5)) * activity;
      return manResult;
    }
    if(func === 'dev') {
      const devine = (50 + 2.3) * (0.394 * height - 60)
      return devine;
    }
    if(func === 'har') {
      const haris = (66 + (13.7 * weight) + (5 * height) - (6.76 * age)) * activity
      return haris;
    }
    if(func === 'calor') {
      const calor = NaN;
      switch(age) {
        case (age >= 18 && age <= 30) : {
          calor = (0.0630 * weight + 2.8927) * 240;
          break;
        }
        case (age >= 31 && age <= 60) : {
          calor = (0.0484 * weight + 3.6534) * 240;
          break;
        }
        case (age > 60): {
          calor = (0.0491 * weight + 2.4587) * 240;
          break;
        }
        default: {
          calor = 'Не допустимый возраст';
          break;
        }
      }
      return calor;
    }

  }

  const woman = (func) => {
    if (func === 'mif') {
      const womanResult = ((10 * weight) + (6.25 * height) - (5 * age - 161)) * activity;
      return womanResult;
    }
    if(func === 'dev') {
      const devine = (45.5 + 2.3) * (0.394 * height - 60)
      return devine;
    }
    if(func === 'har') {
      const haris = (655 + (9.6 * weight) + (1.8 * height) - (4.7 * age)) * activity
      return haris;
    }
       
    if(func === 'calor') {
      let calor = NaN;
      switch(age) {
        case (age >= 18 && age <= 30) : {
          calor = (0.0621 * weight + 2.0357) * 240;
          break;
        }
        case (age >= 31 && age <= 60) : {
          calor = (0.0342 * weight + 3.5377) * 240;
          break;
        }
        case (age > 60): {
          calor = (0.0377 * weight + 2.7546) * 240;
          break;
        }
        default: {
          calor = 'Не допустимый возраст';
          break;
        }
      }
      return calor;
    }
  }

 
  // Имт
  const heightMet = height / 100;
  const bmi = weight / (heightMet * heightMet);
  let bmiText = '';

  switch (bmi) {
    case (bmi >= 0 && bmi < 16): {
      bmiText = 'Выраженный дефицит массы тела'
      break;
    }
    case (bmi >= 16 && bmi < 18.5): {
      bmiText = 'Недостаточная (дефицит) масса тела'
      break;
    }
    case (bmi >= 18.5 && bmi <= 24.99): {
      bmiText = 'Нормальная масса тела'
      break;
    }
    case (bmi >= 25 && bmi < 30): {
      bmiText = 'Избыточная масса тела (предожирение)'
      break;
    }
    case (bmi >= 30 && bmi < 35): {
      bmiText = 'Ожирение'
      break;
    }
    case (bmi >= 35 && bmi <= 40): {
      bmiText = 'Ожирение резкое'
      break;
    }
    case (bmi > 40): {
      bmiText = 'Ожирение очень резкое'
      break;
    }
    default: {
      bmiText = 'Ошибка расчёта, проверьте введённые данные'
      break;
    }
  }

   // Мифф
   const miff = sex === 1 ? man('mif') : woman('mif');
 

   // Devine

   const devine = sex === 1 ? man('dev') : woman('dev');

   // Haris 
 
   const harris = sex === 1 ? man('har') : woman('har');
 
   // Сalories
 
   const who = sex === 1 ? man('calor') : woman('calor');
   
   // Water
   
   const water = sex === 1 ? weight * 0.04 : weight * 0.03; 


  const addToTable = () => {
    const container = document.querySelector('.result_container');
    
    const mif = container.querySelector('.result_mif');
    mif.innerText = miff;

    const devin = container.querySelector('.result_devin');
    devin.innerText = devine;

    const haris = container.querySelector('.result_harris');
    haris.innerText = harris;

    const calorWho = container.querySelector('.result_who');
    calorWho.innerText = who;

    const waterReq = container.querySelector('.water');
    waterReq.innerText = water;

    const mifLos = container.querySelector('.result_mif--losing');
    mifLos.innerText = miff * 0.8;

    const devinLos = container.querySelector('.result_devin--losing');
    devinLos.innerText = devine * 0.8;

    const harisLos = container.querySelector('.result_harris--losing');
    harisLos.innerText = harris * 0.8;

    const calorWhoLos = container.querySelector('.result_who--losing');
    calorWhoLos.innerText = who * 0.8;

    const waterX = container.querySelector('.result_who--losing');
    waterX.innerText = water;


  }

  addToTable();
//  div class="result_container">
//         <table>
//             <caption>Расчётная калорийность для вас - поддержание веса</caption>
//             <tr>
//                 <td class="result_mif">Число</td>
//                 <td>Формула Миффлина-Сан Жеора для расчета суточной нормы калорий</td>
//             </tr>
//             <tr>
//                 <td class="result_devin">Число</td>
//                 <td>Формула Девина для расчета идеального веса</td>
//             </tr>
//             <tr>
//                 <td class="result_harris">Число</td>
//                 <td>Формула Харриса-Бенедикта для расчета суточной нормы калорий</td>
//             </tr>
//             <tr>
//                 <td class="result_who">Число</td>
//                 <td>Рекомендации ВОЗ</td>
//             </tr>
//         </table>
//         <table>
//             <caption>Расчётная калорийность для вас - похудение</caption>
//             <tr>
//                 <td class="result_mif--losing">Число</td>
//                 <td>Формула Миффлина-Сан Жеора для расчета суточной нормы калорий</td>
//             </tr>
//             <tr>
//                 <td class="result_devin--losing">Число</td>
//                 <td>Формула Девина для расчета идеального веса</td>
//             </tr>
//             <tr>
//                 <td class="result_harris--losing">Число</td>
//                 <td>Формула Харриса-Бенедикта для расчета суточной нормы калорий</td>
//             </tr>
//             <tr>
//                 <td class="result_who--losing">Число</td>
//                 <td>Рекомендации ВОЗ</td>
//             </tr>
//         </table>
//         <table>
//             <caption>Примерное суточное потребление воды</caption>
//             <tr>
//                 <td class="water">Число</td>
//                 <td>потребление воды (л)</td>
//             </tr>
}