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

async function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  var x = 0;
  var y = 0;

  if (document.getElementById(elmnt.id + "header")) {
    // если присутствует, заголовок - это место, откуда вы перемещаете DIV:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // в противном случае переместите DIV из любого места внутри DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  async function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    // получить положение курсора мыши при запуске:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // вызов функции при каждом перемещении курсора:
    document.onmousemove = elementDrag;
  }

  async function elementDrag(e) {
    e = e || window.event;

    e.preventDefault();

    // вычислить новую позицию курсора:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // установите новое положение элемента:
    y = elmnt.offsetTop - pos2;
    x = elmnt.offsetLeft - pos1;

    const read = { x, y };
    await setDataToDB(read);
  }

  setInterval(async () => {
    let res = await getDataToDB();
    /* console.log("res", res.y != y && res.x != x); */
    elmnt.style.top = res.y + "px";

    elmnt.style.left = res.x + "px";

    res.y = y;
    res.x = x;
  }, 50);

  function closeDragElement() {
    // остановка перемещения при отпускании кнопки мыши:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
