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

    if(!sex || !age || !weight || !height) {
      let fields = '';      
      return error('Заполните все поля')
    }

    if(age < 12 || age > 80) {
      return error('Для верного расчёта необходимы значения возраста от 12 до 80 лет')
    }

    if(weight < 20 || weight > 200) {
      return error('Для верного расчёта необходимы значения веса от 20 до 200 кг')
    }

    if(height < 140 || height > 240) {
      return error('Для верного расчёта необходимы значения роста от 140 до 240 кг')
    } else {
      return calculate(formArr);
    }

  };

  const buttonSubmit = document.querySelector('#calculate');

  buttonSubmit.addEventListener('click', event => subm(event))

const calculate = (arr) => {
  const resultMiff = arr[0] === 1 ? man() : woman();
   const man = () => {
    // (10 x вес (кг) + 6.25 x рост (см) – 5 x возраст (г) + 5) x A
    const manResult = ((10 * arr[2]) + (6.25 * arr[3]) - (5 * arr[1] + 5)) * arr[4];
    return manResult;
   }

   const woman = () => {
    // (10 x вес (кг) + 6.25 x рост (см) – 5 x возраст (г) - 161) x A
    const manResult = ((10 * arr[2]) + (6.25 * arr[3]) - (5 * arr[1] - 161)) * arr[4];
    return manResult;
   }

}