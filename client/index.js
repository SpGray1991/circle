import "regenerator-runtime/runtime";
import axios from "axios";

dragElement(document.getElementById("mydiv"));

const setDataToDB = async (location) => {
  return await axios
    .post(`http://localhost:5000/`, location)
    .then((response) => {
      return response.data;
    });
};

const getDataToDB = async () => {
  return await axios.get(`http://localhost:5000/`).then((response) => {
    console.log("GET success");
    console.log(response.data);
    return response.data;
  });
};

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // если присутствует, заголовок - это место, откуда вы перемещаете DIV:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // в противном случае переместите DIV из любого места внутри DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // получить положение курсора мыши при запуске:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // вызов функции при каждом перемещении курсора:
    document.onmousemove = elementDrag;
    console.log("Circle", e);
  }

  async function elementDrag(e) {
    e = e || window.event;

    e.preventDefault();

    const read = { pos1, pos2 };
    console.log(read);
    await setDataToDB(read);

    // вычислить новую позицию курсора:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // установите новое положение элемента:
    /* elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px"; */
    console.log("Circle2", e);
  }
  let x = setInterval(async () => {
    let res = await getDataToDB();
    /*  if (res.pos1=)  */
    elmnt.style.top = elmnt.offsetTop - res.pos2 + "px";

    elmnt.style.left = elmnt.offsetLeft - res.pos1 + "px";
  }, 10);

  function closeDragElement() {
    // остановка перемещения при отпускании кнопки мыши:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
